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
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../db/api";
import DonationM from "../DonationM/DonationM";
import Popup from "../popup/popup";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth, token, setAccessToken } = useAuth();
  const [popInfo, setPopInfo] = useState<{ trigger: number | null; type: any; message: any }>({
    trigger: null,
    type: null,
    message: null,
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(`${api}/donor/signOut`, {}, {
        headers: { authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const data = response.data;
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });

      if (data?.success) {
        setAccessToken(null);
        navigate("/", { replace: true });
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Logout failed", error);
      setPopInfo({
        trigger: Date.now(),
        type: false,
        message: error.message || "Logout failed",
      });
    }
  };

  const [isDModal, setIsDModal] = useState(false);

  // Build full nav items list — all items visible directly
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    ...(isAuth
      ? [
          { name: "Community", path: "/community", icon: Users },
          { name: "Profile", path: "/profile", icon: User },
          { name: "Settings", path: "/setting", icon: Settings },
        ]
      : [{ name: "Join Us", path: "/auth", icon: ShieldCheck }]),
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-primary text-white py-2 px-4 text-center text-sm font-medium flex justify-between items-center overflow-hidden">
        <p className="truncate flex-1">আপনার একটি দান আমাদের কার্যক্রমকে এগিয়ে নিতে সহায়তা করবে</p>
        <button
          onClick={() => setIsDModal(true)}
          className="ml-4 bg-white text-primary px-3 py-1 rounded-full text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1 shrink-0"
        >
          <HeartHandshake size={14} />
          Donate Us
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

            {isAuth && (
              <button
                onClick={handleLogOut}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-all ml-1"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
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
                  <LogOut size={20} /> Logout
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
