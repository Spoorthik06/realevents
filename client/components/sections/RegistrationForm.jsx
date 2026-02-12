import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { FadeIn } from '../animations/FadeIn';

// Validation Schema
const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  interests: z.array(z.string()).optional(),
});

export const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form Submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
      setIsSuccess(false);
      reset();
  };

  useEffect(() => {
    if (isSuccess) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#BC3905', '#f6e9cf', '#000000']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#BC3905', '#f6e9cf', '#000000']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <section id="registration-form" className="py-24 bg-brand-cream relative overflow-hidden min-h-[600px] flex items-center justify-center">
        <FadeIn className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-xl mx-4 border-2 border-brand-orange/10 z-10">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-3xl font-heading font-bold text-brand-black mb-4">You're In!</h3>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for registering. Check your inbox for your confirmation and early access details.
          </p>
          <Button onClick={handleReset} variant="outline">
            Register Another Person
          </Button>
        </FadeIn>
      </section>
    );
  }

  return (
    <section id="registration-form" className="py-24 bg-brand-cream relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
            {/* Form Side */}
            <div className="md:col-span-3 p-8 md:p-12">
              <h2 className="text-3xl font-heading font-bold text-brand-black mb-2">Claim Your Offer</h2>
              <p className="text-gray-600 mb-8">Limited spots available. Don't miss out.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    {...register('fullName')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      {...register('phone')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all`}
                      placeholder="(555) 000-0000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      {...register('city')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all`}
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time Slot</label>
                  <select
                    {...register('timeSlot')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.timeSlot ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-orange'} focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all bg-white`}
                  >
                    <option value="">Select a time...</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (4PM - 8PM)</option>
                  </select>
                  {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot.message}</p>}
                </div>

                <div className="pt-2">
                  <Button type="submit" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} /> Processing...
                      </span>
                    ) : (
                      "Claim My Offer"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Visual Side */}
            <div className="md:col-span-2 bg-brand-orange p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
               <div className="absolute inset-0 bg-black/10 z-0" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-heading font-bold mb-4">What's included?</h3>
                 <ul className="space-y-4">
                   <li className="flex items-start gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-cream mt-2.5" />
                     <p className="text-brand-cream/90 text-sm">Early access to RealEventz beta platform.</p>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-cream mt-2.5" />
                     <p className="text-brand-cream/90 text-sm">Exclusive Launch Discount Code.</p>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-cream mt-2.5" />
                     <p className="text-brand-cream/90 text-sm">Direct line to our planning experts.</p>
                   </li>
                 </ul>
               </div>
               
               <div className="relative z-10 mt-8">
                 <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                   <p className="text-xs text-brand-cream/80 uppercase tracking-widest mb-1">Time Remaining</p>
                   <p className="text-2xl font-bold font-mono">23:59:01</p>
                   <p className="text-xs mt-1">Before offer expires</p>
                 </div>
               </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
