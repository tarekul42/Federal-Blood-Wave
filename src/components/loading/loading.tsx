import { Droplets } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Droplets size={20} className="text-primary animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading...</p>
    </div>
  );
};

export default Loading;