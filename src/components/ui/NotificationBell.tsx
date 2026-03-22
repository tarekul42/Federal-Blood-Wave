import { useState, useRef, useEffect } from "react";
import { Bell, Check, X } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

const NotificationBell = () => {
  const { isAuth } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuth) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-bold text-white items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden z-50">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-black text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Check size={14} /> Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-slate-50 relative group ${!notification.read ? "bg-red-50/30" : "hover:bg-slate-50"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-1">
                      {notification.type === 'request' && <div className="w-2 h-2 rounded-full bg-primary" />}
                      {notification.type === 'system' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <div>
                      <h4 className={`text-sm ${!notification.read ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {notification.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{notification.message}</p>
                      <span className="text-[10px] font-bold text-slate-400 mt-2 block">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Bell size={32} className="mx-auto mb-3 opacity-20" />
                <p className="font-medium text-sm">No new notifications</p>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-slate-100 text-center bg-slate-50">
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-xs font-bold text-slate-500 hover:text-slate-900">
              View Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
