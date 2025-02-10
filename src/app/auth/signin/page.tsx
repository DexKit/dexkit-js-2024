'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

export default function SignIn() {
  const intl = useIntl();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(intl.formatMessage({ id: 'auth.signin.error.invalid' }));
        setIsLoading(false);
      } else if (result?.ok) {
        router.refresh();
        await new Promise(resolve => setTimeout(resolve, 500));
        router.replace('/admin/subscribers');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(intl.formatMessage({ id: 'auth.signin.error.generic' }));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'radial-gradient(circle at left center, #5D23DE 46%, #000000 85%)'
    }}>
      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          {intl.formatMessage({ id: 'auth.signin.title' })}
        </h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {intl.formatMessage({ id: 'auth.signin.email' })}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {intl.formatMessage({ id: 'auth.signin.password' })}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#5D23DE] hover:bg-[#4c1cb3] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading 
              ? intl.formatMessage({ id: 'auth.signin.button.loading' })
              : intl.formatMessage({ id: 'auth.signin.button' })
            }
          </button>
        </form>
      </div>
    </div>
  );
} 