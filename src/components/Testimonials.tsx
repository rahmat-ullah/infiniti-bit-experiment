import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'John Doe',
    company: 'Tech Innovators Inc.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'The AI solution provided by this team has revolutionized our customer service. We have seen a 30% increase in customer satisfaction!',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    company: 'Global Solutions Ltd.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Their custom software development has streamlined our operations, resulting in a 25% boost in productivity. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Mike Johnson',
    company: 'Innovative Startups Co.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'The IT consulting services we received were top-notch. They helped us navigate complex technological challenges with ease.',
    rating: 4,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
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
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="relative max-w-3xl mx-auto">
          <animated.div style={fadeIn} className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full mr-4"
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
              />
              <div>
                <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-600">{testimonials[currentIndex].company}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">"{testimonials[currentIndex].quote}"</p>
            <div className="flex">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </animated.div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;