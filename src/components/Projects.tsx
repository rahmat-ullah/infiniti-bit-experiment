import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'AI-Powered Customer Service Platform',
    description: 'Developed an intelligent chatbot system that reduced customer service costs by 40%.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Blockchain Supply Chain Solution',
    description: 'Implemented a transparent and secure supply chain management system using blockchain technology.',
    image: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'IoT-Based Smart Factory',
    description: 'Created an interconnected system of sensors and machines to optimize manufacturing processes.',
    image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: { duration: 500 },
  });

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Projects</h2>
        <div className="relative">
          <animated.div style={fadeIn} className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:w-48" src={projects[currentIndex].image} alt={projects[currentIndex].title} />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{projects[currentIndex].title}</div>
                <p className="mt-2 text-gray-500">{projects[currentIndex].description}</p>
              </div>
            </div>
          </animated.div>
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;