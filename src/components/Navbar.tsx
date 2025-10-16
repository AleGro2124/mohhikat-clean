import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import logo from '@/assets/logo.png';

export const Navbar = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Mohhikat Logo" className="h-12" />
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className="text-base"
              >
                Inicio
              </Button>
            </Link>
            <Link to="/suscripciones">
              <Button 
                variant={isActive('/suscripciones') ? 'default' : 'ghost'}
                className="text-base"
              >
                Suscripciones
              </Button>
            </Link>
            <Link to="/calculadora"> {/* 👈 nueva pestaña */}
              <Button 
                variant={isActive('/calculadora') ? 'default' : 'ghost'}
                className="text-base"
              >
                Calculadora
              </Button>
            </Link>
            <Link to="/contacto">
              <Button 
                variant={isActive('/contacto') ? 'default' : 'ghost'}
                className="text-base"
              >
                Contacto
              </Button>
            </Link>
            <Link to="/carrito">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
