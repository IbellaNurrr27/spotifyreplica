import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-64 h-screen bg-black p-6 flex flex-col z-50">
      <Link to="/" className="mb-8">
        <h1 className="text-foreground text-2xl font-heading font-bold">spotify.com</h1>
      </Link>

      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            isActive('/') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Home size={24} />
          <span className="font-paragraph font-bold">Home</span>
        </Link>

        <Link
          to="/search"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            isActive('/search') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Search size={24} />
          <span className="font-paragraph font-bold">Search</span>
        </Link>

        <Link
          to="/library"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            isActive('/library') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Library size={24} />
          <span className="font-paragraph font-bold">Your Library</span>
        </Link>
      </nav>
    </header>
  );
}
