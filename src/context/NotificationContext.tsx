import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "info" | "request" | "system";
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isAuth) {
      // Mock fetching notifications
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "Critical Request Near You",
          message: "A patient at Dhaka Medical College needs O+ blood urgently. Can you help?",
          read: false,
          createdAt: new Date().toISOString(),
          type: "request"
        },
        {
          id: "2",
          title: "Verify Your Profile",
          message: "Please complete your profile to get a verified badge and help more patients.",
          read: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          type: "system"
        }
      ];
      setNotifications(mockNotifications);
    } else {
      setNotifications([]);
    }
  }, [isAuth]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
