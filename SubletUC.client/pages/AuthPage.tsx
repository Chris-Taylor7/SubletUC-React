import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { User } from '../types';
import { CURRENT_USER } from '../constants';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin(CURRENT_USER);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border-t-4 border-uc-red">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-uc-dark">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to access your sublet dashboard" : "Join the UC community today"}
          </p>
        </div>

        <div className="space-y-4">
           {/* Google Auth Mock */}
           <button 
             type="button"
             className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uc-red"
           >
             <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
           </button>
           
           <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
           </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div className="flex gap-2 mb-4">
                 <Input label="First Name" placeholder="Jane" required className="mb-2" />
                 <Input label="Last Name" placeholder="Doe" required className="mb-2" />
              </div>
            )}
            <Input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                placeholder="Email address"
                className="mb-4"
            />
            <Input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete={isLogin ? "current-password" : "new-password"} 
                required 
                placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-uc-red focus:ring-uc-red border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-uc-red hover:text-red-700">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
            >
              {loading ? "Processing..." : (isLogin ? "Sign in" : "Create Account")}
            </Button>
          </div>
        </form>
        
        <div className="text-center">
            <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-uc-purple hover:underline font-medium"
            >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;