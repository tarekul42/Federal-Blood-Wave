import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../db/api";
import { 
  Mail, Phone, MapPin, Calendar, User, Scale, Ruler, 
  Droplets, History, ShieldCheck, ShieldAlert, Send, RefreshCcw
} from "lucide-react";
import axios from "axios";

const Profile = () => {
  const { profData, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const {
    name, mail, phone, bloodGroup, dob, gender, weight, height,
    address, totalDonations, donationStatus, lastDonationDate,
    profile, verified,
  } = profData as any;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("bn-BD", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const handleSendMail = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${api}/donor/veriFyMailSend`, {}, {
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setMsg(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send verification email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBloodDonateUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`${api}/donor/update/donateStatus`, {}, {
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isDonated = donationStatus === "donated";

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verification Alert */}
        {!verified && (
          <div className="mb-8 bg-white border-l-4 border-amber-500 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">ইমেইল ভেরিফাই করা নেই</h3>
                <p className="text-sm text-slate-500">আপনার অ্যাকাউন্টটি সম্পূর্ণ সচল করতে ইমেইল ভেরিফাই করুন।</p>
              </div>
            </div>
            <button 
              onClick={handleSendMail} 
              disabled={isLoading || !!msg}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
            >
              {isLoading ? <RefreshCcw size={18} className="animate-spin" /> : <Send size={18} />}
              {msg ? "লিঙ্ক পাঠানো হয়েছে" : "ভেরিফিকেশন লিঙ্ক পাঠান"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-32 bg-primary relative">
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <img 
                      src={profile?.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
                      alt={name} 
                      className="w-24 h-24 rounded-3xl object-cover ring-8 ring-white shadow-xl bg-white" 
                    />
                 </div>
              </div>
              <div className="pt-16 pb-8 px-6 text-center">
                <h2 className="text-2xl font-black text-slate-900 mb-1">{name}</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                   <span className="flex items-center gap-1 text-primary font-black text-lg">
                     <Droplets size={18} /> {bloodGroup}
                   </span>
                   <span className="text-slate-300">|</span>
                   <span className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest ${verified ? "text-emerald-600" : "text-amber-600"}`}>
                      {verified ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                      {verified ? "Verified" : "Unverified"}
                   </span>
                </div>
                
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${isDonated ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                  <div className={`w-2 h-2 rounded-full ${isDonated ? "bg-red-500" : "bg-emerald-500 animate-pulse"}`} />
                  {isDonated ? "Donated Recently" : "Available to Donate"}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200">
               <div className="flex items-center gap-3 mb-6 opacity-60">
                 <History size={20} />
                 <span className="text-xs font-black uppercase tracking-widest">Donation History</span>
               </div>
               <div className="grid grid-cols-1 gap-6">
                 <div>
                   <h4 className="text-4xl font-black text-primary mb-1">{totalDonations}</h4>
                   <p className="text-slate-400 text-sm font-medium">Total Donations</p>
                 </div>
                 <div className="pt-6 border-t border-white/10">
                   <h4 className="text-xl font-bold text-white mb-1">{formatDate(lastDonationDate)}</h4>
                   <p className="text-slate-400 text-sm font-medium">Last Donation Date</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                   <User size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">ব্যক্তিগত তথ্য</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoItem icon={Mail} label="ইমেইল" value={mail} />
                <InfoItem icon={Phone} label="ফোন" value={phone} />
                <InfoItem icon={MapPin} label="ঠিকানা" value={address} />
                <InfoItem icon={Calendar} label="জন্ম তারিখ" value={formatDate(dob)} />
                <InfoItem icon={User} label="লিঙ্গ" value={gender === "male" ? "পুরুষ" : "নারী"} />
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem icon={Ruler} label="উচ্চতা" value={`${height} মি.`} />
                  <InfoItem icon={Scale} label="ওজন" value={`${weight} কেজি`} />
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50">
                <button
                  disabled={isDonated || isLoading}
                  onClick={handleBloodDonateUpdate}
                  className="w-full relative group"
                >
                  <div className={`flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-lg transition-all ${
                    isDonated 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : "bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95"
                  }`}>
                    {isLoading ? <RefreshCcw size={24} className="animate-spin" /> : <Droplets size={24} />}
                    {isDonated ? "রক্তদানের স্ট্যাটাস আপডেট করা হয়েছে" : "রক্তদানের স্ট্যাটাস আপডেট করুন"}
                  </div>
                  
                  {isDonated && (
                    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {gender === "female" ? "১২০ দিন পর আবার আপডেট করতে পারবেন" : "৯০ দিন পর আবার আপডেট করতে পারবেন"}
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <Icon size={18} className="text-slate-400" />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-slate-900 font-bold leading-tight">{value || "N/A"}</p>
    </div>
  </div>
);

export default Profile;
