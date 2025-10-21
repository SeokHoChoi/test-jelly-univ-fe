import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/jelly_university?igsh=MW5ldXRjaTlqZzY2dA==', label: 'Instagram' },
    { icon: Mail, href: 'mailto:allong.contact@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-white py-[32px] px-[24px] md:py-[33px] md:px-[64px] border-t border-black/15">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        {/* Company Info */}
        <div className="text-left">
          <p className="text-[#1E1E1E] font-normal text-[20px] mb-6 md:mb-8">
            © 2025 Jelly University
          </p>
          <div className="md:space-y-0 md:flex md:flex-col">
            <p className="text-[#848484] font-normal text-[20px]">
              올롱 ⏐ 대표자: 박해주
            </p>
            <p className="text-[#848484] font-normal text-[20px]">
              사업자 등록번호: 626-37-01184
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
