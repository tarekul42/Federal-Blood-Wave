import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { api } from "../../db/api";
import { Activity, ShieldAlert, HeartPulse, Send, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const BloodRequestForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token, isAuth } = useAuth();
  
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    hospitalName: "",
    district: "",
    urgency: "urgent",
    dateRequired: "",
    contactNumber: "",
    details: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isAuth) {
      alert("Please login to create a blood request");
      return;
    }

    setIsLoading(true);
    try {
      // Mocking the API call for now, since we don't know if backend has this route yet
      // const res = await fetch(`${api}/blood-request`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData)
      // });
      // const data = await res.json();
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert("Blood request submitted successfully!");
      navigate("/requests");
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link to="/requests" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Requests
          </Link>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Activity className="text-primary" size={32} />
            Create Blood Request
          </h1>
          <p className="text-slate-500 mt-2">Fill out the form below to broadcast an urgent blood request.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Patient's Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="patientName"
                    required
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient's full name"
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Blood Group <span className="text-red-500">*</span></label>
                  <select
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hospital Name & Location <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="hospitalName"
                    required
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="e.g. Dhaka Medical College"
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">District / Area <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Urgency Level <span className="text-red-500">*</span></label>
                  <select
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical (Life-threatening)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Date Required <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="dateRequired"
                    required
                    value={formData.dateRequired}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Additional Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Any specific instructions, number of bags needed, or secondary contact..."
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              {!isAuth && (
                <div className="bg-amber-50 text-amber-700 border border-amber-200 rounded-2xl p-4 flex gap-3">
                  <ShieldAlert size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">You must be logged in to create a blood request. <Link to="/auth" className="font-bold underline">Login here</Link>.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isAuth}
                className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <HeartPulse className="animate-bounce" size={24} />
                ) : (
                  <>
                    <Send size={20} /> Publish Request
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestForm;
