import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Server, Cpu, Cloud, LineChart } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) rotateY(0deg)' : 'translateY(50px) rotateY(-10deg)',
    config: { mass: 1, tension: 80, friction: 26 },
  });

  return (
    <animated.div ref={ref} style={cardAnimation} className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
      <Icon className="h-12 w-12 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </animated.div>
  );
};

const Services = () => {
  const services = [
    { icon: Code, title: 'Custom Software Development', description: 'Tailored solutions to meet your unique business needs.' },
    { icon: Database, title: 'AI Integration', description: 'Harness the power of artificial intelligence for your operations.' },
    { icon: Server, title: 'IT Consulting', description: 'Expert advice to optimize your technology infrastructure.' },
    { icon: Cpu, title: 'Product Lifecycle Management', description: 'Comprehensive solutions for managing your product lifecycle.' },
    { icon: Cloud, title: 'Cloud Solutions', description: 'Scalable and secure cloud services for your business.' },
    { icon: LineChart, title: 'Data Analytics', description: 'Turn your data into actionable insights for informed decision-making.' },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;