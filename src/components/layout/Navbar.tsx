import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Settings,
  HeartHandshake,
  Home,
  Users,
  LogOut,
  Info,
  ShieldCheck,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../db/api";
import DonationM from "../DonationM/DonationM";
import Popup from "../popup/popup";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuth, token, setAccessToken } = useAuth();
  const [popInfo, setPopInfo] = useState<{ trigger: number | null; type: any; message: any }>({
    trigger: null,
    type: null,
    message: null,
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
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
        // Give a small delay for the popup before reload if needed, 
        // but usually resetting state is enough in a well-behaved SPA.
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

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    ...(isAuth
      ? [{ name: "Community", path: "/community", icon: Users }]
      : [{ name: "Join Us", path: "/auth", icon: ShieldCheck }]),
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-primary text-white py-2 px-4 text-center text-sm font-medium flex justify-between items-center overflow-hidden">
        <p className="truncate flex-1">আপনার একটি দান আমাদের কার্যক্রমকে এগিয়ে নিতে সহায়তা করবে</p>
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
          <Link to="/" className="flex items-center gap-1 group">
             <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
               F
             </div>
             <div className="flex flex-col leading-none">
               <span className="text-slate-900 font-bold tracking-tighter text-lg">BloodWave</span>
               <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Federal</span>
             </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
              >
                <Settings size={20} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                  {isAuth ? (
                    <>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <Users size={16} /> Profile
                      </Link>
                      <Link to="/setting" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <Settings size={16} /> Settings
                      </Link>
                    </>
                  ) : null}
                  <Link to="/about" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Info size={16} /> About Us
                  </Link>
                  <Link to="/contact" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Mail size={16} /> Contact
                  </Link>
                  {isAuth && (
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-slate-50 mt-1"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 pb-6 animate-in slide-in-from-right w-full">
          <div className="px-4 pt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-all"
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-4" />
            {isAuth && (
              <>
                <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50">
                  <Users size={20} /> Profile
                </Link>
                <Link to="/setting" className="flex items-center gap-3 p-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50">
                  <Settings size={20} /> Settings
                </Link>
              </>
            )}
            <Link to="/about" className="flex items-center gap-3 p-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50">
              <Info size={20} /> About Us
            </Link>
            <Link to="/contact" className="flex items-center gap-3 p-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50">
              <Mail size={20} /> Contact
            </Link>
            {isAuth && (
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} /> Logout
              </button>
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
