import { Link } from "react-router";
import { 
  Facebook, Instagram, Linkedin, Twitter, 
  MapPin, Phone, Mail, Droplets, Heart
} from "lucide-react";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg group-hover:scale-105 transition-transform">
                F
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold tracking-tighter text-xl">BloodWave</span>
                <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Federal</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://www.facebook.com/federalbloodwave" icon={Facebook} />
              <SocialLink href="https://x.com/FederalBloodW" icon={Twitter} />
              <SocialLink href="https://www.instagram.com/federalbloodwave.orga/" icon={Instagram} />
              <SocialLink href="https://www.linkedin.com/in/heyabdullahbro/" icon={Linkedin} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">{t("footer.quick_links")}</h4>
            <ul className="space-y-4">
              <FooterLink to="/">{t("navbar.home")}</FooterLink>
              <FooterLink to="/about">{t("navbar.about")}</FooterLink>
              <FooterLink to="/community">{t("navbar.community")}</FooterLink>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
              <FooterLink to="/contact">{t("navbar.contact")}</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">{t("footer.get_in_touch")}</h4>
            <div className="space-y-6">
              <ContactItem icon={MapPin} label={t("footer.address")} text="Dhaka, Bangladesh" />
              <ContactItem icon={Phone} label={t("footer.phone")} text="+880 1603 070892" />
              <ContactItem icon={Mail} label={t("footer.email")} text="federalbloodwave@gmail.com" isEmail />
            </div>
          </div>

          {/* Impact Info */}
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Heart size={24} fill="currentColor" />
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">{t("footer.our_impact")}</h4>
            </div>
            <p className="text-sm italic leading-relaxed mb-6">
              {t("footer.impact_quote")}
            </p>
            <Link to="/auth" className="block text-center bg-primary hover:bg-primary-dark text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
              {t("footer.join_donor")}
            </Link>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center gap-1">
             {t("footer.made_with")} <Heart size={12} className="text-primary mx-1" fill="currentColor" /> {t("footer.by")} <span className="text-slate-400 font-bold">Federal Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group">
       <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
       {children}
    </Link>
  </li>
);

const ContactItem = ({ icon: Icon, label, text, isEmail }: { icon: any; label: string; text: string; isEmail?: boolean }) => (
  <div className="flex gap-4">
    <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      {isEmail ? (
        <a href={`mailto:${text}`} className="text-sm font-bold text-white hover:text-primary transition-colors">{text}</a>
      ) : (
        <p className="text-sm font-bold text-white leading-tight">{text}</p>
      )}
    </div>
  </div>
);

export default Footer;
