import { MapPin, Droplets, Info, ShieldCheck, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DonorCardProps {
  donor: {
    _id: string;
    name: string;
    address: string;
    bloodGroup: string;
    donationStatus: string;
    profile?: { img?: string };
    isSeak?: boolean;
  };
  setDonorId: (id: string) => void;
  setModalOpen: (open: boolean) => void;
}

const DonorCard = ({ donor, setDonorId, setModalOpen }: DonorCardProps) => {
  const { t } = useTranslation();
  const { name, address, bloodGroup, donationStatus, profile, _id, isSeak } = donor;

  const handleOpen = () => {
    setDonorId(_id);
    setModalOpen(true);
  };

  const isAvailable = donationStatus === "active" && !isSeak;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Top Section / Status */}
      <div className="relative p-6 pb-4 flex justify-between items-start">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          isAvailable 
            ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" 
            : "bg-amber-50 text-amber-600 ring-1 ring-amber-100"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
          {isAvailable ? t("donor_card.ready") : t("donor_card.on_break")}
        </div>
        
        <div className="bg-primary/5 text-primary p-2 rounded-xl">
           <Droplets size={20} />
        </div>
      </div>

      {/* Profile Image & Name */}
      <div className="px-6 flex items-center gap-4 mb-6">
        <div className="relative">
          <img 
            src={profile?.img || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name} 
            alt={name} 
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 transition-transform group-hover:scale-105" 
          />
          {isSeak && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full border-2 border-white">
              <ShieldAlert size={12} />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
          <p className="text-primary font-bold text-sm tracking-tighter flex items-center gap-1">
            <Droplets size={12} /> {bloodGroup} {t("donor_card.group")}
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 space-y-3 flex-1">
        <div className="flex items-start gap-2 text-slate-500">
           <MapPin size={16} className="shrink-0 mt-0.5" />
           <p className="text-xs font-medium leading-relaxed line-clamp-2">{address}</p>
        </div>
        
        <div className="flex items-center gap-2 text-slate-400">
           <ShieldCheck size={16} className="shrink-0" />
           <p className="text-[10px] font-bold uppercase tracking-widest leading-none">{t("donor_card.verified")}</p>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-6 pt-4 border-t border-slate-50 mt-4 bg-slate-50/50">
        <button 
          onClick={handleOpen}
          className="w-full bg-white hover:bg-primary hover:text-white text-slate-900 border border-slate-200 hover:border-primary py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <Info size={16} /> {t("donor_card.view_details")}
        </button>
      </div>
    </div>
  );
};

export default DonorCard;
