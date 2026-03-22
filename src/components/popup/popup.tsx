import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupProps {
  popInfo: {
    trigger: number | null;
    type: any;
    message: any;
  };
}

const Popup = ({ popInfo }: PopupProps) => {
  const { trigger, message, type } = popInfo;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 left-1/2 z-[9999] max-w-md w-[90%] p-4 rounded-2xl shadow-2xl border backdrop-blur-sm flex items-center gap-4 ${
            type
              ? "bg-emerald-50/95 border-emerald-200 text-emerald-800"
              : "bg-red-50/95 border-red-200 text-red-800"
          }`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${type ? "bg-emerald-100" : "bg-red-100"}`}>
            {type ? <CheckCircle size={22} /> : <XCircle size={22} />}
          </div>
          <p className="text-sm font-bold flex-1">{message}</p>
          <button
            onClick={() => setShow(false)}
            className="p-1 rounded-lg hover:bg-black/5 transition-colors shrink-0"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
