import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Certifications", path: "/certifications" },
    { name: "Export Markets", path: "/export-markets" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+912228214777" 
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              data-testid="top-phone-link"
            >
              <Phone size={14} strokeWidth={1.5} />
              <span className="hidden sm:inline">+91 22 2821 4777</span>
            </a>
            <a 
              href="mailto:info@rasinodrugs.com" 
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              data-testid="top-email-link"
            >
              <Mail size={14} strokeWidth={1.5} />
              <span className="hidden sm:inline">info@rasinodrugs.com</span>
            </a>
          </div>
          <div className="text-slate-400 hidden md:block">
            ISO 9001:2015 & GMP Certified Manufacturer
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="glass-header sticky top-0 z-50 border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
              <div className="w-10 h-10 bg-slate-900 rounded-sm flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">R</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-xl text-slate-900 tracking-tight">
                  RASINO DRUGS
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">
                  Pharmaceutical Excellence
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                  data-testid={`nav-${link.name.toLowerCase().replace(" ", "-")}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link to="/contact">
                <Button 
                  className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide px-6 py-2 rounded-sm"
                  data-testid="header-inquiry-btn"
                >
                  Get Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 text-sm font-medium rounded-sm transition-colors ${
                      isActive(link.path)
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${link.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide rounded-sm"
                    data-testid="mobile-inquiry-btn"
                  >
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-slate-900 font-heading font-bold text-lg">R</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-lg">RASINO DRUGS</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest">
                    Pvt. Ltd.
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Leading manufacturer and exporter of Active Pharmaceutical Ingredients, 
                Intermediates, and Fine Chemicals since 1980.
              </p>
              <div className="text-sm text-slate-500">
                CIN: U24233MH2015PTC270493
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.slice(0, 5).map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                      data-testid={`footer-${link.name.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Products</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/products?category=API"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                    data-testid="footer-api-link"
                  >
                    Active Pharmaceutical Ingredients
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?category=Intermediate"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                    data-testid="footer-intermediate-link"
                  >
                    Pharmaceutical Intermediates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?category=Fine Chemical"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                    data-testid="footer-fine-chemical-link"
                  >
                    Fine Chemicals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="text-slate-400">
                  <strong className="text-white block mb-1">Registered Office</strong>
                  Mumbai, Maharashtra, India
                </li>
                <li>
                  <a 
                    href="tel:+912228214777" 
                    className="text-slate-400 hover:text-white transition-colors"
                    data-testid="footer-phone"
                  >
                    +91 22 2821 4777
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@rasinodrugs.com" 
                    className="text-slate-400 hover:text-white transition-colors"
                    data-testid="footer-email"
                  >
                    info@rasinodrugs.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Rasino Drugs Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>ISO 9001:2015</span>
              <span>GMP Certified</span>
              <span>WHO-GMP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
