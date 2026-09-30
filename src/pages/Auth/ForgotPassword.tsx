import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ArrowLeft } from 'lucide-react';

export function ForgotPassword() {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate network request
    setTimeout(() => {
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Visual / Brand (Consistent with Login) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-sidebar border-r border-border overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-px h-full bg-border"></div>
           <div className="absolute top-0 right-1/4 w-px h-full bg-border"></div>
           <div className="absolute top-1/3 left-0 w-full h-px bg-border"></div>
           <div className="absolute bottom-1/3 left-0 w-full h-px bg-border"></div>
        </div>
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex flex-col items-center">
            <span className="text-primary font-bold tracking-[0.2em] text-3xl">DECORMART</span>
            <span className="text-accent tracking-[0.3em] text-sm mt-1">STUDIO</span>
          </div>
          <p className="text-secondary text-lg font-light tracking-wide">Design. Execute. Deliver.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-primary">Reset your password</h1>
            <p className="text-secondary">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@decormart.studio" 
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="bg-surface border border-border p-6 rounded-lg text-center space-y-4">
              <p className="text-primary font-medium">Check your email</p>
              <p className="text-secondary text-sm">
                We sent a password reset link to <span className="text-primary">{email}</span>
              </p>
            </div>
          )}

          <div className="text-center lg:text-left">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
