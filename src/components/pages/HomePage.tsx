import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChefHat, Cake, Wine, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <span className="text-7xl sm:text-8xl">📔</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-heading font-bold text-amber-900 mb-6">
            My Food Diary
          </h1>
          <p className="text-xl sm:text-2xl text-amber-700 mb-8 max-w-2xl mx-auto">
            Organize your favorite recipes in one beautiful place. Cooking, baking, and drinks all in one cozy digital journal.
          </p>
          <p className="text-lg text-amber-600 mb-12">
            Store unlimited recipes permanently and access them anytime.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cooking Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="mb-6 text-6xl group-hover:scale-110 transition-transform duration-300">🍳</div>
            <h3 className="text-2xl font-heading font-bold text-amber-900 mb-4">Cooking Recipes</h3>
            <p className="text-amber-700 mb-6">
              Store all your favorite cooking recipes. From simple weeknight dinners to elaborate dishes.
            </p>
            <Link to="/cooking">
              <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-900 font-semibold rounded-full flex items-center justify-center gap-2">
                Explore <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>

          {/* Baking Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="mb-6 text-6xl group-hover:scale-110 transition-transform duration-300">🧁</div>
            <h3 className="text-2xl font-heading font-bold text-pink-900 mb-4">Baking Recipes</h3>
            <p className="text-pink-700 mb-6">
              Collect your baking creations. Cakes, cookies, bread, and pastries all in one place.
            </p>
            <Link to="/baking">
              <Button className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-pink-900 font-semibold rounded-full flex items-center justify-center gap-2">
                Explore <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>

          {/* Drinks Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="mb-6 text-6xl group-hover:scale-110 transition-transform duration-300">🥤</div>
            <h3 className="text-2xl font-heading font-bold text-blue-900 mb-4">Drinks Recipes</h3>
            <p className="text-blue-700 mb-6">
              Keep track of your favorite beverages. Cocktails, smoothies, teas, and more.
            </p>
            <Link to="/drinks">
              <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-blue-900 font-semibold rounded-full flex items-center justify-center gap-2">
                Explore <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white/50 rounded-3xl my-20">
        <h2 className="text-4xl font-heading font-bold text-amber-900 text-center mb-12">
          Why You'll Love It
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '💾', title: 'Permanent Storage', desc: 'Your recipes are saved forever' },
            { icon: '🔍', title: 'Easy Search', desc: 'Find recipes instantly by name' },
            { icon: '🌍', title: 'Country Filter', desc: 'Organize by cuisine origin' },
            { icon: '📱', title: 'Responsive Design', desc: 'Works on all devices' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-heading font-bold text-amber-900 mb-2">{feature.title}</h3>
              <p className="text-amber-700 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-heading font-bold text-amber-900 mb-6">
            Ready to Start Your Food Diary?
          </h2>
          <p className="text-lg text-amber-700 mb-8">
            Choose a category and add your first recipe today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cooking">
              <Button className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-900 font-semibold rounded-full px-8 py-3">
                Start Cooking 🍳
              </Button>
            </Link>
            <Link to="/baking">
              <Button className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-pink-900 font-semibold rounded-full px-8 py-3">
                Start Baking 🧁
              </Button>
            </Link>
            <Link to="/drinks">
              <Button className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-blue-900 font-semibold rounded-full px-8 py-3">
                Start Drinks 🥤
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
