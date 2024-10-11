import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Brain, Database, Cloud, Shield, Zap, Smartphone } from 'lucide-react';

const solutions = [
  { icon: Brain, title: 'Artificial Intelligence', description: 'Leverage AI to automate processes and gain insights.' },
  { icon: Database, title: 'Big Data Analytics', description: 'Harness the power of your data for informed decision-making.' },
  { icon: Cloud, title: 'Cloud Computing', description: 'Scalable and flexible cloud solutions for your business needs.' },
  { icon: Shield, title: 'Cybersecurity', description: 'Protect your digital assets with advanced security measures.' },
  { icon: Zap, title: 'IoT Solutions', description: 'Connect and control devices for smarter operations.' },
  { icon: Smartphone, title: 'Mobile Development', description: 'Create powerful mobile apps for iOS and Android platforms.' },
];

const Solutions = () => {
  const [selectedSolution, setSelectedSolution] = useState(null);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Solutions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <animated.div
              key={index}
              style={fadeIn}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedSolution(solution)}
            >
              <solution.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </animated.div>
          ))}
        </div>
        {selectedSolution && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <selectedSolution.icon className="h-16 w-16 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-center">{selectedSolution.title}</h3>
              <p className="text-gray-600 mb-6">{selectedSolution.description}</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 w-full"
                onClick={() => setSelectedSolution(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Solutions;