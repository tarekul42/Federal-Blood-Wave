import { MapPin, Droplets, Clock, Phone, AlertTriangle, User } from "lucide-react";

interface RequestCardProps {
  request: {
    _id: string;
    patientName: string;
    bloodGroup: string;
    hospitalName: string;
    district: string;
    urgency: string;
    dateRequired: string;
    contactNumber: string;
    details: string;
    createdAt: string;
  };
}

const BloodRequestCard = ({ request }: RequestCardProps) => {
  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-50 text-red-600 ring-red-200 border-red-100";
      case "urgent":
        return "bg-amber-50 text-amber-600 ring-amber-200 border-amber-100";
      default:
        return "bg-blue-50 text-blue-600 ring-blue-200 border-blue-100";
    }
  };

  const timeAgo = (dateStr: string) => {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const daysDifference = Math.round((new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDifference === 0) return "Today";
    return rtf.format(daysDifference, "day");
  };

  return (
    <div className={`group bg-white rounded-3xl border-2 ${getUrgencyStyles(request.urgency).split(' ')[3]} shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col md:flex-row`}>
      
      {/* Date & Blood Group Badge (Left Side on Desktop) */}
      <div className={`md:w-32 flex flex-row md:flex-col items-center justify-between md:justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50`}>
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
            <span className="text-2xl font-black">{request.bloodGroup}</span>
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Needed</span>
        </div>
        
        <div className={`md:mt-6 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ring-1 ${getUrgencyStyles(request.urgency)}`}>
          {request.urgency === "critical" && <AlertTriangle size={12} />}
          {request.urgency}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">{request.patientName}</h3>
              <p className="text-slate-500 flex items-center gap-1.5 text-sm font-medium">
                <MapPin size={16} /> {request.hospitalName}, {request.district}
              </p>
            </div>
            
            <div className="text-slate-400 flex items-center gap-1.5 text-xs font-bold bg-slate-50 px-3 py-1.5 rounded-xl shrink-0">
              <Clock size={14} /> Req: {timeAgo(request.dateRequired)}
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {request.details}
          </p>
        </div>

        {/* Footer / Contact Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium w-full sm:w-auto">
             <User size={16} /> Posted {new Date(request.createdAt).toLocaleDateString()}
          </div>
          
          <a 
            href={`tel:${request.contactNumber}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-primary text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-slate-900/10 hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95"
          >
            <Phone size={18} /> Call {request.contactNumber}
          </a>
        </div>
      </div>

    </div>
  );
};

export default BloodRequestCard;
