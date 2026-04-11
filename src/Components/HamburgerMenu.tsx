import { useState } from 'react';
import { Menu, X, Sun, Moon, Settings, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleReset = () => {
    window.dispatchEvent(new CustomEvent('reset-portfolio'));
    setIsOpen(false);
  };

  return (
    <div className="fixed top-20 left-3 z-50">   {/* Changed from top-3 to top-20 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
        aria-label="Menu"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-48 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-700 py-2">
          <button
            onClick={() => { toggleTheme(); setIsOpen(false); }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800 flex items-center gap-2 text-white"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={() => { /* settings placeholder */ setIsOpen(false); }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800 flex items-center gap-2 text-white"
          >
            <Settings className="size-4" /> Settings
          </button>
          <hr className="my-2 border-gray-700" />
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800 flex items-center gap-2 text-white"
          >
            <Home className="size-4" /> Back to Portfolio
          </button>
        </div>
      )}
    </div>
  );
}