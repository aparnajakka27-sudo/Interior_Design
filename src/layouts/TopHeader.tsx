import { Moon, Sun, Search as SearchIcon, Bell as BellIcon, Menu as MenuIcon, LogOut as LogOutIcon, ChevronDown, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { IconButton } from '@/components/ui/IconButton';
import { Avatar } from '@/components/ui/Avatar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { initialEmployees, initialNotifications } from '@/lib/mock-data';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { useTheme } from '@/contexts/ThemeContext';

export function TopHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout, switchUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simple title generator from path
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Command Center';
    return path.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 relative z-20">
      <div className="flex items-center gap-3">
        <IconButton variant="ghost" className="md:hidden" onClick={onMenuClick}>
          <MenuIcon className="h-5 w-5" />
        </IconButton>
        <h1 className="text-lg font-semibold text-primary min-w-[120px]">{getPageTitle()}</h1>
      </div>

      <div className="flex-1 max-w-2xl px-4 lg:px-8 hidden md:block">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm text-muted hover:text-primary transition-colors hover:border-accent/30"
        >
          <SearchIcon className="h-4 w-4" />
          <span className="truncate">Search projects, clients, leads...</span>
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            <kbd className="px-1.5 py-0.5 text-[10px] bg-surface border border-border rounded">Ctrl K</kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Demo Role Switcher */}
        <div className="hidden xl:flex items-center gap-2 text-xs">
          <span className="text-muted whitespace-nowrap">Demo as:</span>
          <select 
            className="bg-background border border-border rounded px-2 py-1 text-primary focus:outline-none focus:border-accent w-36 truncate"
            value={user?.id || ''}
            onChange={(e) => switchUser(e.target.value)}
          >
            {initialEmployees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.role} ({emp.name})</option>
            ))}
          </select>
        </div>
        
        <div className="h-5 w-px bg-border mx-1 hidden xl:block"></div>

        {/* Search - Mobile */}
        <IconButton variant="ghost" className="md:hidden" onClick={() => setIsSearchOpen(true)}>
          <SearchIcon className="h-5 w-5" />
        </IconButton>

        <div className="h-5 w-px bg-border mx-1 md:hidden"></div>

        
        {/* Theme Toggle */}
        <IconButton variant="ghost" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </IconButton>

        <div className="h-5 w-px bg-border mx-1 hidden md:block"></div>
  
        {/* Notifications */}
        <Link to="/notifications">
          <IconButton variant="ghost" className="relative">
            <BellIcon className="h-5 w-5" />
            {initialNotifications.filter(n => n.recipientId === user?.id && !n.read).length > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-accent border border-surface text-[9px] font-bold text-accent-foreground flex items-center justify-center">
                {initialNotifications.filter(n => n.recipientId === user?.id && !n.read).length}
              </span>
            )}
          </IconButton>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center gap-2 pl-2 md:pl-0 focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <Avatar fallback={user?.name?.charAt(0) || 'U'} size="sm" />
            <div className="hidden md:flex flex-col items-start text-left">
              <span className="text-sm font-medium text-primary leading-none">{user?.name}</span>
              <span className="text-xs text-muted mt-1 leading-none">{user?.role}</span>
            </div>
            <ChevronDown className="hidden md:block h-4 w-4 text-secondary ml-1" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-elevated shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-border md:hidden">
                <p className="text-sm font-medium text-primary">{user?.name}</p>
                <p className="text-xs text-muted">{user?.role}</p>
              </div>
              <div className="px-4 py-2 border-b border-border xl:hidden">
                <label className="text-xs text-muted block mb-1">Demo as:</label>
                <select 
                  className="w-full bg-background border border-border rounded px-2 py-1.5 text-xs text-primary focus:outline-none focus:border-accent"
                  value={user?.id || ''}
                  onChange={(e) => { switchUser(e.target.value); setShowProfileMenu(false); }}
                >
                  {initialEmployees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.role}</option>
                  ))}
                </select>
              </div>

              <Link to="/settings/profile" onClick={() => setShowProfileMenu(false)}>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface transition-colors">
                  <SettingsIcon className="h-4 w-4" />
                  Profile Settings
                </button>
              </Link>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-surface transition-colors"
              >
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
