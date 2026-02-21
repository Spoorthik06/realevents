import React from 'react';
import { Star, Zap, ShieldCheck, Tag } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';

export const Benefits = () => {
  return (
    <section className="py-24 bg-brand-black text-brand-cream relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Why Join the <span className="text-brand-orange">Early Access</span> List?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              RealEventz isn't just another directory. It's an instant booking engine. Early adopters get premium treatment.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Zap />, text: "Priority access to the booking engine" },
                { icon: <Tag />, text: "Lifetime 20% discount on service fees" },
                { icon: <ShieldCheck />, text: "Dedicated concierge support" },
                { icon: <Star />, text: "Exclusive 'Founding Member' badge" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-brand-orange rounded-lg text-white">
                    {item.icon}
                  </div>
                  <span className="text-lg font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="relative h-full min-h-[400px]">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                <img 
                    src="https://picsum.photos/800/800?random=20" 
                    alt="Event Party" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                    <p className="text-white font-bold text-lg">"RealEventz changed how I plan corporate parties entirely."</p>
                    <p className="text-brand-orange mt-2">- Sarah J., Beta Tester</p>
                </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
