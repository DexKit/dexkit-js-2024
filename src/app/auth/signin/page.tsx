'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
        setIsLoading(false);
      } else {
        window.location.href = '/admin/subscribers';
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while signing in');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" 
         style={{
           background: 'radial-gradient(circle at left center, #5D23DE 46%, #000000 85%)'
         }}>
      <div className="w-full max-w-sm space-y-8 bg-black/30 p-6 sm:p-8 rounded-2xl backdrop-blur-lg border border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
            Sign In
          </h1>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         text-sm sm:text-base"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         text-sm sm:text-base"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg
                     text-sm sm:text-base font-medium text-white bg-purple-600 hover:bg-purple-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
                     shadow-lg shadow-purple-500/30"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
} 