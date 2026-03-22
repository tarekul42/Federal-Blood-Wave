import { X, Smartphone } from "lucide-react";
import bkashLogo from "../../assets/bkash.png";
import nagadLogo from "../../assets/nagad.png";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface DonationMProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DonationM = ({ open, setOpen }: DonationMProps) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400"
              aria-label="Close donation modal"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">{t("donation_m.heading")}</h2>
              <p className="text-sm text-slate-500">{t("donation_m.description")}</p>
            </div>

            <div className="space-y-4">
              <PaymentCard
                logo={bkashLogo}
                name="bKash"
                number="+8801996404083"
                type="Personal"
                bgColor="bg-pink-50"
                borderColor="border-pink-100"
              />
              <PaymentCard
                logo={nagadLogo}
                name="Nagad"
                number="+8801603070892"
                type="Personal"
                bgColor="bg-orange-50"
                borderColor="border-orange-100"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PaymentCard = ({
  logo, name, number, type, bgColor, borderColor,
}: {
  logo: string; name: string; number: string; type: string;
  bgColor: string; borderColor: string;
}) => (
  <div className={`flex items-center gap-4 p-5 rounded-2xl ${bgColor} border ${borderColor}`}>
    <img src={logo} alt={name} className="w-12 h-12 object-contain rounded-xl" />
    <div className="flex-1">
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{name} ({type})</p>
      <p className="text-lg font-black text-slate-900 tracking-tight">{number}</p>
    </div>
  </div>
);

export default DonationM;
