import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { Activity, Droplets, History, Bell, Search, Settings, Calendar, Award } from "lucide-react";
import BloodRequestCard from "../bloodRequest/BloodRequestCard";

const Dashboard = () => {
  const { t } = useTranslation();
  const { profData, isAuth } = useAuth();
  
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl font-bold text-slate-500">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const { name, bloodGroup, totalDonations, donationStatus } = profData as any;
  const isAvailable = donationStatus === "active";

  const nextDonationDate = new Date();
  nextDonationDate.setMonth(nextDonationDate.getMonth() + 4); // roughly 120 days for mock

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">My <span className="text-primary">Dashboard</span></h1>
            <p className="text-slate-500 font-medium tracking-wide">Welcome back, {name || "User"}!</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/request/new" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2">
              <Activity size={18} /> Need Blood?
            </Link>
            <Link to="/profile" className="bg-white border border-slate-200 text-slate-700 hover:text-primary font-bold py-3 px-6 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center gap-2">
              <Settings size={18} /> Settings
            </Link>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={Droplets} 
            label="Blood Group" 
            value={bloodGroup || "Unknown"} 
            color="text-red-500" 
            bg="bg-red-50" 
          />
          <StatCard 
            icon={Award} 
            label="Total Donations" 
            value={totalDonations || "0"} 
            color="text-emerald-500" 
            bg="bg-emerald-50" 
          />
          <StatCard 
            icon={Activity} 
            label="Status" 
            value={isAvailable ? "Available" : "On Break"} 
            color={isAvailable ? "text-emerald-500" : "text-amber-500"} 
            bg={isAvailable ? "bg-emerald-50" : "bg-amber-50"} 
          />
          <StatCard 
            icon={Calendar} 
            label="Next Eligible Date" 
            value={isAvailable ? "Now" : nextDonationDate.toLocaleDateString()} 
            color="text-blue-500" 
            bg="bg-blue-50" 
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Activities & Requests) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                   <Activity className="text-primary" size={24} /> 
                   Active Requests Near You
                 </h2>
                 <Link to="/requests" className="text-sm font-bold text-primary hover:underline">View All</Link>
              </div>
              
              <div className="space-y-4">
                {/* Embedded mock requests directly here since it's a dashboard preview */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center sm:hidden">
                  <p className="text-slate-500 text-sm">Please view full requests page.</p>
                </div>
                <div className="hidden sm:block">
                  <BloodRequestCard request={{
                    _id: "preview-1",
                    patientName: "Rahim Uddin",
                    bloodGroup: "O+",
                    hospitalName: "Dhaka Medical College Hospital",
                    district: "Dhaka",
                    urgency: "critical",
                    dateRequired: new Date().toISOString(),
                    contactNumber: "01712345678",
                    details: "Need 2 bags of O+ blood immediately...",
                    createdAt: new Date().toISOString()
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Notifications & History) */}
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                   <Bell className="text-slate-500" size={20} /> 
                   Notifications
                 </h2>
                 <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">2 New</span>
               </div>
               
               <div className="space-y-4">
                 <div className="flex gap-4 items-start pb-4 border-b border-slate-50">
                   <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                   <div>
                     <p className="text-sm font-bold text-slate-800 mb-1">Critical O+ Request</p>
                     <p className="text-xs text-slate-500">Someone near you needs O+ blood urgently.</p>
                   </div>
                 </div>
                 <div className="flex gap-4 items-start">
                   <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                   <div>
                     <p className="text-sm font-bold text-slate-800 mb-1">Verify Your Profile</p>
                     <p className="text-xs text-slate-500">Get a verified badge by completing your profile details.</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-black text-white flex items-center gap-2">
                   <History className="text-primary" size={20} /> 
                   Recent Activity
                 </h2>
               </div>
               
               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-900 bg-emerald-500 text-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Droplets size={12} className="text-white" />
                     </div>
                     <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-white/10 bg-white/5 shadow">
                        <div className="flex items-center justify-between mb-1">
                           <h4 className="font-bold text-white text-sm">Donated Blood</h4>
                           <time className="text-[10px] font-medium text-slate-400">Mar 12, 2026</time>
                        </div>
                        <p className="text-xs text-slate-400">Square Hospital, Dhaka</p>
                     </div>
                  </div>
               </div>
               <Link to="/profile" className="block w-full text-center text-xs font-bold text-slate-400 mt-6 hover:text-white transition-colors">
                  View full history
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, bg }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
    <div className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center shrink-0`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
    </div>
  </div>
);

export default Dashboard;
