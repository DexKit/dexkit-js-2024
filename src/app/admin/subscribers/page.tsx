'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
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
  const [error, setError] = useState('');

  const fetchSubscribers = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/newsletter/subscribers?page=${page}`);
      if (!response.ok) throw new Error('Error loading subscribers');
      
      const data = await response.json();
      setSubscribers(data.subscribers);
    } catch (err) {
      setError(intl.formatMessage({ id: 'admin.subscribers.error' }));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [intl]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchSubscribers(1);
    }
  }, [session, fetchSubscribers]);

  if (status === 'loading') {
    return (
      <div className="p-4 min-h-screen" style={{
        background: 'radial-gradient(circle at left center, #5D23DE 46%, #000000 85%)'
      }}>
        <h1 className="text-4xl font-bold mb-6 text-white text-center">
          {intl.formatMessage({ id: 'admin.subscribers.title' })}
        </h1>
        <SkeletonLoader />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-4 min-h-screen" style={{
      background: 'radial-gradient(circle at left center, #5D23DE 46%, #000000 85%)'
    }}>
      <h1 className="text-4xl font-bold mb-6 text-white text-center">
        {intl.formatMessage({ id: 'admin.subscribers.title' })}
      </h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/20">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-white/20 text-left text-white font-medium">
                    {intl.formatMessage({ id: 'admin.subscribers.table.email' })}
                  </th>
                  <th className="px-6 py-3 border-b border-white/20 text-left text-white font-medium">
                    {intl.formatMessage({ id: 'admin.subscribers.table.date' })}
                  </th>
                  <th className="px-6 py-3 border-b border-white/20 text-left text-white font-medium">
                    {intl.formatMessage({ id: 'admin.subscribers.table.status' })}
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-white">
                      {intl.formatMessage({ id: 'admin.subscribers.empty' })}
                    </td>
                  </tr>
                ) : (
                  subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 border-b border-white/20 text-white">{sub.email}</td>
                      <td className="px-6 py-4 border-b border-white/20 text-white">
                        {new Date(sub.subscriptionDate).toLocaleDateString(intl.locale)}
                      </td>
                      <td className="px-6 py-4 border-b border-white/20 text-white">{sub.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 