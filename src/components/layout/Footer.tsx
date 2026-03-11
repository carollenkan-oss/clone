import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Shop Plans', href: '/shop' },
      { label: 'Custom Plan', href: '/custom-plan' },
      { label: 'Best Sellers', href: '/shop?sort=best-selling' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Residential', href: '/shop?category=Residential' },
      { label: 'Commercial', href: '/shop?category=Commercial' },
      { label: 'Apartments', href: '/shop?category=Apartments' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <div className="bg-accent rounded-md p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 21V9l9-7 9 7v12H3z" fill="white" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Maramani</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Premium architectural house plans for your dream home. Over 5,000 plans delivered worldwide.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 opacity-80">
                <Mail className="h-4 w-4" /> info@maramani.com
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <Phone className="h-4 w-4" /> +1 406 540 0400
              </div>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Maramani House Plans. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
