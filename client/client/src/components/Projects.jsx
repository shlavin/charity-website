import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const projectData = [
  {
    title: 'School Feeding Program',
    description: 'We provide weekly meals to over 200 underprivileged children in rural areas.',
    imageUrl: '/unsplasha.jpg', 
  },
  {
    title: 'Clean Water Initiative',
    description: 'Installing solar-powered boreholes in water-scarce villages.',
    imageUrl: '/unsplashb.jpg',
  },
  {
    title: 'Women Empowerment Workshops',
    description: 'Training women in rural communities on digital skills and entrepreneurship.',
    imageUrl: '/unsplashc.jpg',
  },
];

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="Projects" className="py-16 bg-gray-50">
      <div className="w-full px-0">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800" data-aos="fade-up">
          Our Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
              data-aos="fade-up"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
