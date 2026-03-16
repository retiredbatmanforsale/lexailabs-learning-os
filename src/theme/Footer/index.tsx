import React from 'react';
import { Linkedin, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

const menuLinks = [
  { label: 'Individuals', href: 'https://www.lexailabs.com/individuals' },
  { label: 'Enterprises', href: 'https://www.lexailabs.com/enterprises' },
  { label: 'Institutions', href: 'https://www.lexailabs.com/institutions' },
  { label: 'Higher Education', href: 'https://www.lexailabs.com/institutions/higher-ed' },
  { label: 'Schools (K-12)', href: 'https://www.lexailabs.com/institutions/schools' },
];

const policyLinks = [
  { label: 'Refund Policy', href: 'https://www.lexailabs.com/refunds' },
  { label: 'Privacy Policy', href: 'https://www.lexailabs.com/privacy' },
  { label: 'Terms of Service', href: 'https://www.lexailabs.com/terms' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/106448852/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/labs_ai80315', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/lexailabs/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@LexAILabs', label: 'YouTube' },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/people/Lex-AI-Labs/61580454084785/',
    label: 'Facebook',
  },
];

export default function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-[#f0f0f0] bg-white overflow-hidden text-[#141414]">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-[900px] mx-auto text-center md:text-left">
          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-[#141414] mb-6 text-[13px] uppercase tracking-wide">Connect</h4>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-[#f5f5f5] rounded-full flex items-center justify-center text-[#666] hover:bg-blue-500 hover:text-white transition-colors no-underline"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <img
              src="/img/lexailogo.svg"
              alt="Lex AI Labs"
              className="w-40 h-auto mt-4 mx-auto md:mx-0 block"
            />
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-semibold text-[#141414] mb-6 text-[13px] uppercase tracking-wide">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:puru@lexailabs.com" className="text-[#666] text-[15px] no-underline hover:text-blue-500 transition-colors">
                puru@lexailabs.com
              </a>
              <a href="tel:+919996692323" className="text-[#666] text-[15px] no-underline hover:text-blue-500 transition-colors">
                +91 99966 92323
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#141414] mb-6 text-[13px] uppercase tracking-wide">Quick Links</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {menuLinks.concat(policyLinks).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#666] text-[15px] no-underline hover:text-blue-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-10 border-t border-[#f0f0f0] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#999] text-sm m-0">
            &copy; {new Date().getFullYear()} Lex AI Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-[#666] text-sm">Build Intelligence. Build India.</span>
            <span className="text-blue-500">&middot;</span>
            <span className="text-blue-500 text-sm font-semibold">#AISeekhegaIndia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
