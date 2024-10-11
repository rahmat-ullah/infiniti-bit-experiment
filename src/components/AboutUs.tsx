import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Brain, Cpu, Cog } from 'lucide-react';

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { duration: 1000 },
  });

  const iconAnimation = useSpring({
    from: { transform: 'scale(0.5) rotate(0deg)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.1) rotate(5deg)' });
        await next({ transform: 'scale(1) rotate(0deg)' });
      }
    },
    config: { duration: 2000 },
    loop: true,
  });

  return (
    <animated.section ref={ref} style={fadeIn} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Who We Are</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <animated.div style={iconAnimation} className="inline-block mb-4">
              <Brain className="h-16 w-16 text-blue-600" />
            </animated.div>
            <h3 className="text-xl font-semibold mb-2">Innovative Solutions</h3>
            <p className="text-gray-600">We leverage cutting-edge technologies to deliver innovative solutions that drive your business forward.</p>
          </div>
          <div className="text-center">
            <animated.div style={iconAnimation} className="inline-block mb-4">
              <Cpu className="h-16 w-16 text-blue-600" />
            </animated.div>
            <h3 className="text-xl font-semibold mb-2">AI Integration</h3>
            <p className="text-gray-600">Our expertise in AI allows us to create intelligent systems that optimize your operations and decision-making processes.</p>
          </div>
          <div className="text-center">
            <animated.div style={iconAnimation} className="inline-block mb-4">
              <Cog className="h-16 w-16 text-blue-600" />
            </animated.div>
            <h3 className="text-xl font-semibold mb-2">Custom Development</h3>
            <p className="text-gray-600">We build tailor-made software solutions that perfectly align with your unique business needs and goals.</p>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            {[
              { year: 2010, event: 'Company Founded' },
              { year: 2015, event: 'Expanded to AI Solutions' },
              { year: 2018, event: 'Global Expansion' },
              { year: 2023, event: 'Industry Leader in Digital Transformation' },
            ].map((milestone, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h4 className="text-xl font-semibold">{milestone.year}</h4>
                  <p className="text-gray-600">{milestone.event}</p>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </animated.section>
  );
};

export default AboutUs;