import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isAuthPage && (
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
              Todo App
            </h1>
            <nav className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                )}
              </Button>
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground hidden md:inline">Welcome, {user?.username}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => navigate('/register')}>
                    Register
                  </Button>
                </>
              )}
            </nav>
          </div>
        </header>
      )}
      <main className={cn("flex-1 container mx-auto px-4 py-8", isAuthPage && "flex items-center justify-center")}>
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
