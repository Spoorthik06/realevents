import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { UIButton } from '../ui/UIButton';
import { FadeIn } from '../animations/FadeIn';
import { submitRequest } from '../../api/requestsApi';
import { useNavigate } from 'react-router-dom';

// Validation Schema
const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  interests: z.array(z.string()).optional(),
});

const OFFER_END_DATE = new Date('2026-02-25T00:00:00');

export const RegistrationForm = () => {
  const calculateTimeLeft = () => {
    const difference = +OFFER_END_DATE - +new Date();
    return Math.max(0, Math.floor(difference / 1000));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitRequest(data);
      console.log("Form Submitted Successfully");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const parts = [];
    if (d > 0) parts.push(`${d}Days`);
    parts.push(h.toString().padStart(2, '0'));
    parts.push(m.toString().padStart(2, '0'));
    parts.push(s.toString().padStart(2, '0'));

    if (d > 0) {
      return `${parts[0]} ${parts[1]}:${parts[2]}:${parts[3]}`;
    }
    return `${parts[0]}:${parts[1]}:${parts[2]}`;
  };


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
          <UIButton onClick={handleReset} variant="outline">
            Register Another Person
          </UIButton>
        </FadeIn>
      </section>
    );
  }

  return (
    <section id="registration-form" className="py-24 bg-brand-cream relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Countdown Header */}
        <FadeIn className="mb-8">
          <div className="bg-brand-orange text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-brand-orange/20">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold uppercase tracking-tighter opacity-90">Flash Offer Ending Soon!</h3>
              <p className="text-brand-cream/80 text-sm">Register now to lock in exclusive perks and pricing.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl border border-white/20 min-w-[240px] text-center shadow-inner">
              <span className="text-xs uppercase tracking-widest text-brand-cream/60 block mb-1">Offer Expires In</span>
              <span className="text-4xl md:text-5xl font-bold font-mono tabular-nums leading-none">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="bg-white rounded-3xl shadow-2xl overflow-hidden" delay={0.2}>
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
                  <UIButton 
                    type={user ? "submit" : "button"} 
                    fullWidth 
                    disabled={isSubmitting}
                    onClick={() => !user && navigate('/login')}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} /> Processing...
                      </span>
                    ) : (
                      "Claim My Offer"
                    )}
                  </UIButton>
                </div>
              </form>
            </div>

            {/* Visual Side */}
            <div className="md:col-span-2 bg-brand-orange p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
               <div className="absolute inset-0 bg-black/10 z-0" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-bold mb-4">What's included?</h3>
                  <ul className="space-y-4">
                    {[
                      "Free basic balloon decoration",
                      "Basic backdrop",
                      "Name customization",
                      "Limited area coverage",
                      "Selected cities only",
                      "Terms & Conditions",
                      "Upsell opportunity (add-ons)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cream mt-2.5 shrink-0" />
                        <p className="text-brand-cream/90 text-sm leading-tight">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
