import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <section id="about" className="bg-gray-100 py-16 px-6 md:px-20">
            <motion.div
            initial={{ opacity: 0, x: -100}}
            whileInView={{ opacity: 1, x: 0}}
            transition={{duration: 1}}
            viewport={{once: false, amount:0.5}}
            className="max-w-6xl mx-auto text-center">

            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">Wonder Family strives to create a compassionate and empowering environment for orphaned children by providing safe shelter and nurturing, family-like spaces that promote both emotional and physical well-being. We work to ensure that every child has access to education through scholarships, essential learning materials, and academic support. Our programs offer emotional and mental guidance via counseling, mentorship, and enriching recreational activities to help children build resilience. We are committed to laying lifelong foundations through life skills training, talent development, and preparation for independent, thriving futures. By actively engaging volunteers and community partners, we foster inclusion and uphold the dignity of every child we serve.</p>
            </div>
            </motion.div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 text-left">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
            >
                <h5 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h5>
                <p className="text-gray-600">
                To provide safe, nurturing, and family-like environments that promote emotional well-being,
                education, and life skills for orphaned children.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
            >
                <h5 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h5>
                <p className="text-gray-600">
                A world where every child, regardless of background, grows up in a loving environment and
                is empowered to reach their full potential.
                </p>
            </motion.div>
            </div>

        </section>
    );
}
export default AboutUs;