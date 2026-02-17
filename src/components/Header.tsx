import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Cake, Wine } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">📔</span>
            <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              My Food Diary
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/cooking"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                isActive('/cooking')
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <ChefHat size={20} />
              <span>Cooking</span>
            </Link>

            <Link
              to="/baking"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                isActive('/baking')
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-pink-900'
                  : 'text-pink-700 hover:bg-pink-50'
              }`}
            >
              <Cake size={20} />
              <span>Baking</span>
            </Link>

            <Link
              to="/drinks"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                isActive('/drinks')
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-blue-900'
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              <Wine size={20} />
              <span>Drinks</span>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              to="/cooking"
              className={`p-2 rounded-full transition-all ${
                isActive('/cooking') ? 'bg-amber-100 text-amber-900' : 'text-amber-700'
              }`}
            >
              <ChefHat size={20} />
            </Link>
            <Link
              to="/baking"
              className={`p-2 rounded-full transition-all ${
                isActive('/baking') ? 'bg-pink-100 text-pink-900' : 'text-pink-700'
              }`}
            >
              <Cake size={20} />
            </Link>
            <Link
              to="/drinks"
              className={`p-2 rounded-full transition-all ${
                isActive('/drinks') ? 'bg-blue-100 text-blue-900' : 'text-blue-700'
              }`}
            >
              <Wine size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
