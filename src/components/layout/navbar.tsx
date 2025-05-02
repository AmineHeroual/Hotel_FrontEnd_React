
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogIn, Hotel } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-6 py-4",
        {
          "bg-transparent": transparent && !isScrolled,
          "glass shadow-md": !transparent || isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-xl tracking-tight text-foreground flex items-center gap-2"
        >
          <Hotel className="h-6 w-6 text-luxury-gold" />
          <span className="text-luxury-gold">LUXURY</span>
          <span>HOTEL</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors hover:text-luxury-gold relative group",
                location.pathname === item.href
                  ? "text-luxury-gold"
                  : "text-foreground/80"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute -bottom-1 left-1/2 w-0 h-0.5 bg-luxury-gold transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2",
                location.pathname === item.href ? "w-1/2" : "w-0"
              )}></span>
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/auth/login">
            <ButtonCustom variant="outline" size="sm" className="border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 text-foreground space-x-1">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </ButtonCustom>
          </Link>
          <Link to="/auth/register">
            <ButtonCustom variant="gold" size="sm" className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90 space-x-1">
              <User className="h-4 w-4" />
              <span>Register</span>
            </ButtonCustom>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <ButtonCustom
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-foreground hover:bg-luxury-gold/10"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </ButtonCustom>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass animate-fade-in px-4 py-3">
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-luxury-gold"
                    : "text-foreground hover:text-luxury-gold"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex space-x-2 mt-2 pt-2 border-t border-luxury-gold/20">
              <Link to="/auth/login" className="flex-1">
                <ButtonCustom
                  variant="outline"
                  className="w-full justify-center border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 text-foreground"
                  size="sm"
                >
                  Sign In
                </ButtonCustom>
              </Link>
              <Link to="/auth/register" className="flex-1">
                <ButtonCustom
                  className="w-full justify-center bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  size="sm"
                >
                  Register
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
