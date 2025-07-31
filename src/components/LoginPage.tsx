import React, { useState } from 'react';
import { Shield, AlertTriangle, Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid credentials. Try admin / firesafe123');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FireForce Safety</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Dashboard Access</h2>
          <p className="text-gray-600">Advanced Fire Safety Monitoring System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-700 font-medium">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Access Dashboard</span>
              </div>
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Access</h3>
          <p className="text-xs text-blue-800">
            <strong>Username:</strong> admin<br />
            <strong>Password:</strong> firesafe123
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 FireForce Safety Solutions<br />
            Emergency: 911 | Support: +1-800-FIRE-911
          </p>
        </div>
      </div>
    </div>
  );
};