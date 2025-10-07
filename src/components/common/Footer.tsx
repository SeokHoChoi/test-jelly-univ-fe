import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold mb-2">
              © 2025 Jelly University
            </p>
            <p className="text-sm text-gray-400 mb-1">
              올롱 | 대표자: 박해주
            </p>
            <p className="text-sm text-gray-400">
              사업자 등록번호: 626-37-01184
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
