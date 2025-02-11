'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
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

export default function SubscribersPage() {
  const intl = useIntl();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/newsletter/subscribers?page=${page}`);
      if (!response.ok) throw new Error('Error loading subscribers');
      
      const data = await response.json();
      setSubscribers(data.subscribers);
    } catch (err) {
      console.error(err);
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

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({ 
        redirect: false,
        callbackUrl: '/auth/signin'
      });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      window.location.href = '/auth/signin';
    } catch (error) {
      console.error('Error during sign out:', error);
      window.location.href = '/auth/signin';
    }
  };

  const handleExportCSV = () => {
    const csvContent = subscribers.map(sub => 
      `${sub.email},${sub.subscriptionDate},${sub.status}`
    ).join('\n');
    const blob = new Blob([`Email,Subscription Date,Status\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchSubscribers(1);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(intl.formatMessage({ id: 'admin.subscribers.actions.confirm' }))) return;
    try {
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchSubscribers(1);
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  };

  if (status === 'loading' || loading) {
    return <SkeletonLoader />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {intl.formatMessage({ id: 'admin.subscribers.title' })}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {intl.formatMessage({ id: 'admin.subscribers.actions.export' })}
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
            >
              {intl.formatMessage({ id: 'admin.signout' })}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
            <div className="text-center">
              <p className="text-sm text-gray-600">{intl.formatMessage({ id: 'admin.subscribers.stats.total' })}</p>
              <p className="text-2xl font-bold text-purple-900">{subscribers.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{intl.formatMessage({ id: 'admin.subscribers.stats.active' })}</p>
              <p className="text-2xl font-bold text-purple-900">
                {subscribers.filter(s => s.status === 'ACTIVE').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{intl.formatMessage({ id: 'admin.subscribers.stats.lastRegistration' })}</p>
              <p className="text-2xl font-bold text-purple-900">
                {subscribers[0]?.subscriptionDate ? new Date(subscribers[0].subscriptionDate).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'admin.subscribers.table.email' })}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'admin.subscribers.table.date' })}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'admin.subscribers.table.status' })}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {intl.formatMessage({ id: 'admin.subscribers.table.actions' })}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.subscriptionDate).toLocaleDateString()}
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
                        {subscriber.status === 'ACTIVE' ? 
                          intl.formatMessage({ id: 'admin.subscribers.actions.deactivate' }) :
                          intl.formatMessage({ id: 'admin.subscribers.actions.activate' })}
                      </button>
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        {intl.formatMessage({ id: 'admin.subscribers.actions.delete' })}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 