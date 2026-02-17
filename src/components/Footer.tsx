import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-amber-50 to-orange-50 border-t border-amber-100 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-amber-900 font-heading font-bold mb-4">Recipes</h3>
            <ul className="space-y-2">
              <li><Link to="/cooking" className="text-amber-700 hover:text-amber-900 transition-colors">Cooking</Link></li>
              <li><Link to="/baking" className="text-amber-700 hover:text-amber-900 transition-colors">Baking</Link></li>
              <li><Link to="/drinks" className="text-amber-700 hover:text-amber-900 transition-colors">Drinks</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-amber-900 font-heading font-bold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Search & Filter</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Permanent Storage</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Country Sorting</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-amber-900 font-heading font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-amber-900 font-heading font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">About Us</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-amber-700 text-sm">© 2026 My Food Diary. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Twitter</a>
              <a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Instagram</a>
              <a href="#" className="text-amber-700 hover:text-amber-900 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
