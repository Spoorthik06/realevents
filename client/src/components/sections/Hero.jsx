import { ChevronDown, Sparkles } from 'lucide-react';
import { UIButton } from '../ui/UIButton';
import { FadeIn } from '../animations/FadeIn';
import HeroImage from '../../../assets/Hero_Image.jpg';

export const Hero = () => {
  const scrollToForm = () => {
    const element = document.getElementById('registration-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-cream">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center lg:text-left space-y-8">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 rounded-full text-brand-orange font-semibold text-sm mb-4">
              <Sparkles size={16} />
              <span>Limited Early Access Offer</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-brand-black leading-tight">
              The Future of <span className="text-brand-orange">Event Planning</span> Starts Here.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 font-sans">
              Be among the first to experience <span className="font-bold">RealEventz</span>. The world's first instant event planning app. Secure your spot and get exclusive launch benefits.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <UIButton onClick={scrollToForm} className="text-lg px-10 py-4 shadow-brand-orange/30">
              Claim Your Offer
            </UIButton>
            <UIButton variant="outline" className="text-lg px-10 py-4">
              Learn More
            </UIButton>
          </FadeIn>
          
          <FadeIn delay={0.5}>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-600 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-cream overflow-hidden">
                    <img src={`https://picsum.photos/32/32?random=${i}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Join <strong>500+</strong> early adopters</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.4} className="relative hidden lg:block">
           <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
              {/* Abstract App Representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-darkOrange rounded-3xl shadow-2xl transform rotate-3 flex items-center justify-center p-8">
                 <div className="w-full h-full bg-white rounded-2xl shadow-inner flex flex-col items-center justify-center overflow-hidden relative">
                    <img src={HeroImage} alt="App Preview" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg transform translate-y-2">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">
                             RE
                           </div>
                           <div>
                             <p className="font-bold text-gray-900">Giveaway Claimed!</p>
                             <p className="text-xs text-gray-600">Instantly confirmed.</p>
                           </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-brand-orange w-8 h-8 opacity-70" />
      </div>
    </section>
  );
};
