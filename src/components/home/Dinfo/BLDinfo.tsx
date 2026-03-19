import CountUp from "react-countup";
import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { Droplet, Users, Activity, CheckCircle2 } from "lucide-react";

const BLDinfo = () => {
  const { isAuth } = useAuth();

  const stats = [
    { label: "Blood Types", value: 8, icon: Droplet, color: "text-red-600" },
    { label: "Donated Blood", value: 245, icon: Activity, color: "text-blue-600" },
    { label: "Patients Served", value: 180, icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Total Donors", value: 520, icon: Users, color: "text-purple-600" },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className={stat.color} size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                <CountUp end={stat.value} duration={2.5} />+
              </h2>
              <p className="text-slate-400 font-medium uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {!isAuth && (
          <div className="mt-20 text-center">
            <Link to="/auth">
              <button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                Join As A Donor Today
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BLDinfo;
