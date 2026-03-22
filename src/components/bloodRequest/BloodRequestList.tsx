import { Link } from "react-router";
import { Activity, Search, Plus, MapPin, Droplets, Clock } from "lucide-react";
import BloodRequestCard from "./BloodRequestCard";

// Mock data for requests since we don't have a backend endpoint yet
const mockRequests = [
  {
    _id: "1",
    patientName: "Rahim Uddin",
    bloodGroup: "O+",
    hospitalName: "Dhaka Medical College Hospital",
    district: "Dhaka",
    urgency: "critical",
    dateRequired: new Date().toISOString(),
    contactNumber: "01712345678",
    details: "Need 2 bags of O+ blood immediately for bypass surgery.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    patientName: "Ayesha Begum",
    bloodGroup: "AB-",
    hospitalName: "Square Hospital",
    district: "Panthapath, Dhaka",
    urgency: "urgent",
    dateRequired: new Date(Date.now() + 86400000).toISOString(),
    contactNumber: "01812345678",
    details: "1 bag needed for dengue patient. Platelet count is dropping.",
    createdAt: new Date(Date.now() - 4000000).toISOString()
  },
  {
    _id: "3",
    patientName: "Kamal Hossain",
    bloodGroup: "B+",
    hospitalName: "Chittagong Medical College",
    district: "Chittagong",
    urgency: "normal",
    dateRequired: new Date(Date.now() + 172800000).toISOString(),
    contactNumber: "01912345678",
    details: "Needed for an upcoming scheduled surgery next week.",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const BloodRequestList = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
              <Activity className="text-primary" size={32} /> 
              Blood <span className="text-primary">Requests</span>
            </h1>
            <p className="text-slate-500 font-medium">Find people who are in urgent need of blood near you.</p>
          </div>
          
          <Link 
            to="/request/new" 
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1 active:scale-95"
          >
            <Plus size={20} /> Create Request
          </Link>
        </div>

        {/* Search & Filter - Placeholder for now */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by hospital, area or blood group..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none appearance-none min-w-[120px]">
              <option value="">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="O+">O+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
            </select>
            <select className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none appearance-none min-w-[120px]">
              <option value="">All Urgencies</option>
              <option value="critical">Critical</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>

        {/* List of Requests */}
        <div className="space-y-4">
          {mockRequests.length > 0 ? (
            mockRequests.map((req) => (
              <BloodRequestCard key={req._id} request={req} />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity size={24} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No active requests</h3>
              <p className="text-slate-500">There are currently no open blood requests.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BloodRequestList;
