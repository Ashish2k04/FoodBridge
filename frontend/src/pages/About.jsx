import { Heart, Globe, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamMember = ({ name, role, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-dark-card rounded-2xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
  >
    <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full mb-4 overflow-hidden border-4 border-white dark:border-gray-700 shadow-sm flex items-center justify-center">
      <Users size={40} className="text-primary" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
    <p className="text-primary font-medium text-sm">{role}</p>
  </motion.div>
);

const About = () => {
  const team = [
    { name: "Omsing Thakur", role: "Frontend Developer" },
    { name: "Sanket Zore", role: "Backend Developer" },
    { name: "Aditya Ghavane", role: "Database Admin" },
    { name: "Pranav Gadkar", role: "UI/UX Designer" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark pb-20">
      {/* Header */}
      <div className="bg-primary py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About FoodBridge</h1>
        <p className="text-white text-lg max-w-2xl mx-auto opacity-90">Bridging the gap between excess food and empty stomachs.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Target className="text-primary" /> Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Food waste is a global crisis. Every year, millions of tons of perfectly edible food are thrown away while millions of people go hungry. FoodBridge was created to solve this dual problem through a simple, effective technological solution.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our platform connects restaurants, event organizers, and households who have surplus food directly with verified NGOs, orphanages, and shelters. We ensure that quality food reaches those who need it, rather than ending up in landfills.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                <Globe className="mx-auto text-blue-500 mb-3" size={32} />
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Environment</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reducing methane emissions from landfills.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center mt-8">
                <Heart className="mx-auto text-primary mb-3" size={32} />
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Social Impact</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Feeding the hungry and building community.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet The Team</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            FoodBridge was developed as a final year college project by a group of passionate students dedicated to creating tech for social good.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMember key={index} name={member.name} role={member.role} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
