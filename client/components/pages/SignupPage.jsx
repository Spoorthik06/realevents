import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { FadeIn } from '../animations/FadeIn';

const schema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Signup Data:", data);
    setIsLoading(false);
    navigate('/');
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    // Simulate NextAuth signIn('google')
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGoogleLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-brand-cream">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex w-1/2 bg-brand-orange text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-black/10 pointer-events-none" />
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-heading font-bold text-white mb-12 block">RealEventz</Link>
          <div className="max-w-md">
            <h1 className="text-5xl font-heading font-bold mb-6">Join the revolution.</h1>
            <p className="text-xl text-white/90 mb-8">Create an account to start planning your events instantly. Experience the future of event management.</p>
            
            <ul className="space-y-4">
               {['Free account for life', 'Access to top-rated vendors', 'Instant booking confirmation', '24/7 Concierge Support'].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                     <Check size={14} />
                   </div>
                   <span className="font-medium">{item}</span>
                 </li>
               ))}
            </ul>
          </div>
        </div>
        <div className="relative z-10">
           <p className="text-sm text-white/70">© 2024 RealEventz Inc.</p>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-10" />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <FadeIn className="w-full max-w-md bg-transparent p-8 md:p-10">
           <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-orange mb-8 transition-colors">
             <ArrowLeft size={16} className="mr-1" /> Back to Home
           </Link>
           
           <h2 className="text-3xl font-heading font-bold text-brand-black mb-2">Create Account</h2>
           <p className="text-gray-500 mb-8">Get started with your free account today.</p>

           <div className="space-y-4">
             <button 
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-all focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {isGoogleLoading ? (
                 <Loader2 size={20} className="animate-spin text-gray-500" />
               ) : (
                 <>
                   <svg className="w-5 h-5" viewBox="0 0 24 24">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                   </svg>
                   <span>Sign up with Google</span>
                 </>
               )}
             </button>

             <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">Or continue with email</span>
                <div className="flex-grow border-t border-gray-200"></div>
             </div>

             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                 <input
                   {...register('fullName')}
                   className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all`}
                   placeholder="John Doe"
                 />
                 {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                 <input
                   {...register('email')}
                   type="email"
                   className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all`}
                   placeholder="name@example.com"
                 />
                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                 <input
                   {...register('password')}
                   type="password"
                   className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all`}
                   placeholder="Create a password"
                 />
                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
               </div>

               <Button type="submit" fullWidth disabled={isLoading || isGoogleLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
               </Button>
             </form>

             <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-brand-orange hover:text-brand-darkOrange transition-colors">
                  Log in
                </Link>
             </p>
           </div>
        </FadeIn>
      </div>
    </div>
  );
};
