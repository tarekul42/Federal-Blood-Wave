import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  HeartHandshake,
  Home,
  Users,
  LogOut,
  Info,
  ShieldCheck,
  Mail,
  Menu,
  X,
  User,
  Settings,
  Globe,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../db/api";
import DonationM from "../DonationM/DonationM";
import Popup from "../popup/popup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import NotificationBell from "../ui/NotificationBell";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth, token, logout } = useAuth();
  const [popInfo, setPopInfo] = useState<{ trigger: number | null; type: any; message: any }>({
    trigger: null,
    type: null,
    message: null,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogOut = async () => {
    try {
      // Still try to call signOut to clear backend session/cookies
      await axios.post(`${api}/donor/signOut`, {}, {
        headers: { authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch (error) {
      console.error("SignOut API call failed", error);
    } finally {
      logout();
      navigate("/", { replace: true });
      window.location.reload();
    }
  };

  const [isDModal, setIsDModal] = useState(false);

  // Build full nav items list — all items visible directly
  const navItems = [
    { name: t("navbar.home"), path: "/", icon: Home },
    ...(isAuth
      ? [
          { name: t("navbar.community"), path: "/community", icon: Users },
          { name: t("navbar.profile"), path: "/profile", icon: User },
          { name: t("navbar.settings"), path: "/setting", icon: Settings },
        ]
      : [{ name: t("navbar.join_us"), path: "/auth", icon: ShieldCheck }]),
    { name: t("navbar.about"), path: "/about", icon: Info },
    { name: t("navbar.contact"), path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-primary text-white py-2 px-4 text-center text-sm font-medium flex justify-between items-center overflow-hidden">
        <p className="truncate flex-1">{t("navbar.banner_text")}</p>
        <button
          onClick={() => setIsDModal(true)}
          className="ml-4 bg-white text-primary px-3 py-1 rounded-full text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1 shrink-0"
        >
          <HeartHandshake size={14} />
          {t("navbar.donate_us")}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 group shrink-0">
            <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
              F
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-slate-900 font-bold tracking-tighter text-lg">BloodWave</span>
              <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Federal</span>
            </div>
          </Link>

          {/* Desktop Navigation — all items inline */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? "text-primary bg-primary/5"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}

            <div className="h-4 w-px bg-slate-200 mx-2" />
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 transition-all"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              {i18n.language === "en" ? "বাং" : "EN"}
            </button>

            {isAuth && (
              <button
                onClick={handleLogOut}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-all ml-1"
              >
                <LogOut size={16} />
                {t("navbar.logout")}
              </button>
            )}

            <div className="ml-1 flex items-center">
              {isAuth && <NotificationBell />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {isAuth && <NotificationBell />}
            <button
              onClick={toggleLanguage}
              className="p-2 text-slate-600 hover:text-primary transition-colors font-bold"
              aria-label="Toggle language"
            >
              {i18n.language === "en" ? "বাং" : "EN"}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-primary transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 pb-6 w-full">
          <div className="px-4 pt-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl text-base font-medium transition-all ${
                  isActive(item.path)
                    ? "text-primary bg-primary/5"
                    : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}

            {isAuth && (
              <>
                <div className="h-px bg-slate-100 my-3" />
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={20} /> {t("navbar.logout")}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <DonationM open={isDModal} setOpen={setIsDModal} />
      <Popup popInfo={popInfo} />
    </nav>
  );
};

export default Navbar;
