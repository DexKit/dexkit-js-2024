'use client';

import { useCallback, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import SkeletonLoader from '@/app/components/SkeletonLoader';

interface Subscriber {
  id: string;
  email: string;
  locale: string;
  subscriptionDate: string;
  status: string;
  createdAt: string;
}

interface GroupedSubscribers {
  [key: string]: Subscriber[];
}

export default function SubscribersPage() {
  const intl = useIntl();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('table');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const fetchSubscribers = useCallback(async (page: number) => {
    try {
      setError('');
      setLoading(true);
      const response = await fetch(`/api/newsletter/subscribers?page=${page}`);
      if (!response.ok) throw new Error('Error loading subscribers');
      
      const data = await response.json();
      setSubscribers(data.subscribers);
    } catch (err) {
      setError('An error occurred while fetching subscribers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchSubscribers(1);
    }
  }, [status, router, fetchSubscribers]);

  const handleExportCSV = async () => {
    try {
      setError('');
      const response = await fetch('/api/newsletter/subscribers/export');
      if (!response.ok) {
        throw new Error('Failed to export subscribers');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'subscribers.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('An error occurred while exporting subscribers');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setError('');
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchSubscribers(1);
      }
    } catch (err) {
      setError('An error occurred while updating subscriber status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(intl.formatMessage({ id: 'admin.subscribers.actions.confirm' }))) return;
    try {
      setError('');
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchSubscribers(1);
      }
    } catch (err) {
      setError('An error occurred while deleting subscriber');
    }
  };

  const groupSubscribersByDate = (subscribers: Subscriber[]): GroupedSubscribers => {
    return subscribers.reduce((groups: GroupedSubscribers, subscriber) => {
      const date = formatDate(subscriber.subscriptionDate);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(subscriber);
      return groups;
    }, {});
  };

  const renderTimelineView = () => {
    const groupedSubscribers = groupSubscribersByDate(subscribers);
    return (
      <div className="mt-8 space-y-8">
        {Object.entries(groupedSubscribers).map(([date, dateSubscribers]) => (
          <div key={date} className="relative">
            <div className="flex items-center">
              <div className="flex-grow h-0.5 bg-gray-200"></div>
              <span className="flex-shrink-0 px-6 py-2 bg-orange-400 text-white rounded-full text-sm font-medium">
                {formatDate(dateSubscribers[0].subscriptionDate)}
              </span>
              <div className="flex-grow h-0.5 bg-gray-200"></div>
            </div>
            
            <div className="mt-4 bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dateSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subscriber.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleStatusChange(subscriber.id, 
                            subscriber.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          {subscriber.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (status === 'loading' || loading) {
    return <SkeletonLoader />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-0 text-black">
            Newsletter Subscribers
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => handleExportCSV()}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors duration-200
                       text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <i className="fas fa-file-export" />
              Export CSV
            </button>
            
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors duration-200
                       text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-out-alt" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Total Subscribers
            </h3>
            <p className="text-2xl font-bold text-purple-600">{subscribers.length}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Active Subscribers
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {subscribers.filter(s => s.status === 'ACTIVE').length}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Last Registration
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {subscribers.length > 0
                ? formatDate(subscribers[0].subscriptionDate)
                : '-'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200
                          ${viewMode === 'table' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <i className="fas fa-table mr-2" />
                Table View
              </button>
              
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200
                          ${viewMode === 'timeline' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <i className="fas fa-stream mr-2" />
                Timeline View
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            </div>
          ) : viewMode === 'timeline' ? (
            renderTimelineView()
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{subscriber.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(subscriber.subscriptionDate)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                     ${subscriber.status === 'ACTIVE' 
                                       ? 'bg-green-100 text-green-800' 
                                       : 'bg-red-100 text-red-800'}`}>
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {subscriber.status === 'ACTIVE' ? (
                            <button
                              onClick={() => handleStatusChange(subscriber.id, 'INACTIVE')}
                              className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
                              title={intl.formatMessage({ id: 'admin.subscribers.actions.deactivate' })}
                            >
                              <i className="fas fa-pause" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(subscriber.id, 'ACTIVE')}
                              className="text-green-500 hover:text-green-400 transition-colors duration-200"
                              title={intl.formatMessage({ id: 'admin.subscribers.actions.activate' })}
                            >
                              <i className="fas fa-play" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(subscriber.id)}
                            className="text-red-500 hover:text-red-400 transition-colors duration-200"
                            title={intl.formatMessage({ id: 'admin.subscribers.actions.delete' })}
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 