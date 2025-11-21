import { Link, useLocation } from 'react-router-dom';
import { Menu, X, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import axios from 'axios';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Customers', href: '/customers' },
  { name: 'Products', href: '/products' },
  { name: 'Sales', href: '/sales' },
  { name: 'Sales Details', href: '/salesDetails' },
  { name: 'Associates', href: '/salesAssociates' },
  { name: 'Manufacturers', href: '/manufacturers' },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const basePath = '/' + location.pathname.split('/')[1];

  const handleReset = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the database?\n\n' +
      'This will delete all current data and restore the sample dataset.'
    );

    if (!confirmed) return;

    setIsResetting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const response = await axios.post(`${API_URL}reset`);

      if (response.data.success) {
        alert('Database reset successfully.');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error resetting database:', error);
      alert(
        'Error resetting database. ' +
        (error.response?.data?.error || 'Please try again.')
      );
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-lg">
            Tech R Us Sales
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  basePath === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={handleReset}
              disabled={isResetting}
              className={cn(
                'ml-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                'flex items-center gap-2',
                isResetting && 'opacity-50 cursor-not-allowed'
              )}
              title="Reset Database"
            >
              <RefreshCw className={cn('w-4 h-4', isResetting && 'animate-spin')} />
              {isResetting ? 'Resetting...' : 'Reset DB'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'block px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  basePath === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleReset();
              }}
              disabled={isResetting}
              className={cn(
                'w-full px-4 py-2 rounded-md text-sm font-medium transition-colors',
                'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                'flex items-center justify-center gap-2',
                isResetting && 'opacity-50 cursor-not-allowed'
              )}
            >
              <RefreshCw className={cn('w-4 h-4', isResetting && 'animate-spin')} />
              {isResetting ? 'Resetting...' : 'Reset DB'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
