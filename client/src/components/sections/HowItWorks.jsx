import React from 'react';
import { ClipboardList, Clock, Gift, Rocket } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';

const steps = [
  {
    icon: <ClipboardList className="w-8 h-8 text-brand-orange" />,
    title: "Register",
    desc: "Fill in your details to secure your spot on the waiting list."
  },
  {
    icon: <Clock className="w-8 h-8 text-brand-orange" />,
    title: "Choose Slot",
    desc: "Select your preferred time for early access onboarding."
  },
  {
    icon: <Gift className="w-8 h-8 text-brand-orange" />,
    title: "Claim Giveaway",
    desc: "Claim the free birthday giveaways at your preferred time"
  },
  {
    icon: <Rocket className="w-8 h-8 text-brand-orange" />,
    title: "Launch",
    desc: "Be the first to plan events instantly when we go live."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the revolution in event planning in 4 simple steps.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" className="relative group">
              <div className="bg-brand-cream/30 p-8 rounded-2xl border border-transparent hover:border-brand-orange/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="absolute top-4 right-4 text-6xl font-heading font-black text-brand-orange/5 pointer-events-none select-none">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
