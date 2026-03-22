import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Search, Filter, X, MapPin, Droplets, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../db/api";
import DonorCard from "./donorCard/donorCard";
import DonorModal from "./donorModal/DonorModal";
import { DonorCardSkeleton } from "../ui/Skeleton";
import axios from "axios";
import { useTranslation } from "react-i18next";

const debounce = (func: Function, delay: number) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Donors = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const bloodGroup = searchParams.get("bloodGroup");
  const thana = searchParams.get("thana");

  const [donorData, setDonorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    activeOnly: false,
    onlyHealthy: false,
    gender: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [donorId, setDonorId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDonorData = async () => {
      setIsLoading(true);
      try {
        let url = `${api}/donors?page=${currentPage}`;
        if (bloodGroup) url += `&bloodGroup=${bloodGroup}`;
        if (thana) url += `&thana=${thana}`;

        const res = await axios.get(url);
        setDonorData(res.data?.data || []);
        setTotalPages(res.data?.totalPages || 1);
      } catch (err) {
        console.error("Error fetching donor data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonorData();
  }, [bloodGroup, thana, currentPage]);

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value.toLowerCase());
  }, 300);

  const filteredDonors = useMemo(() => {
    return donorData
      .filter(
        (d: any) =>
          d.name.toLowerCase().includes(searchQuery) ||
          d.address.toLowerCase().includes(searchQuery)
      )
      .filter((d: any) =>
        filters.activeOnly ? d.donationStatus === "active" : true
      )
      .filter((d: any) => (filters.onlyHealthy ? !d.isSeak : true))
      .filter((d: any) => (filters.gender ? d.gender === filters.gender : true));
  }, [donorData, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({ activeOnly: false, onlyHealthy: false, gender: "" });
    setSearchQuery("");
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">{t("donors.heading_find")} <span className="text-primary">{t("donors.heading_donor")}</span></h1>
            <div className="flex flex-wrap gap-2">
              {bloodGroup && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold ring-1 ring-primary/20">
                  <Droplets size={12} /> {bloodGroup}
                </span>
              )}
              {thana && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold ring-1 ring-blue-200">
                  <MapPin size={12} /> {thana}
                </span>
              )}
            </div>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder={t("donors.search_placeholder")}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-transparent focus:border-primary focus:ring-4 focus:ring-primary/5 shadow-sm transition-all outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-400" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("donors.filters")}</span>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer group">
               <input 
                type="checkbox" 
                className="sr-only peer"
                checked={filters.activeOnly}
                onChange={() => setFilters(p => ({ ...p, activeOnly: !p.activeOnly }))}
               />
               <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
               <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-slate-900">{t("donors.active_only")}</span>
            </label>

            <label className="relative inline-flex items-center cursor-pointer group">
               <input 
                type="checkbox" 
                className="sr-only peer"
                checked={filters.onlyHealthy}
                onChange={() => setFilters(p => ({ ...p, onlyHealthy: !p.onlyHealthy }))}
               />
               <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
               <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-slate-900">{t("donors.healthy_only")}</span>
            </label>

            <select
              value={filters.gender}
              onChange={(e) => setFilters(p => ({ ...p, gender: e.target.value }))}
              className="bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">{t("donors.all_genders")}</option>
              <option value="male">{t("donors.male")}</option>
              <option value="female">{t("donors.female")}</option>
            </select>
          </div>

          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors hover:bg-red-50 rounded-xl"
          >
            <X size={16} /> {t("donors.reset")}
          </button>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <DonorCardSkeleton key={i} />)
          ) : filteredDonors.length > 0 ? (
            filteredDonors.map((donor: any) => (
              <DonorCard
                key={donor._id}
                donor={donor}
                setDonorId={setDonorId}
                setModalOpen={setModalOpen}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t("donors.no_donors")}</h3>
              <p className="text-slate-500">{t("donors.try_adjusting")}</p>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                    pageNum === currentPage
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                      : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <DonorModal
        open={modalOpen}
        setOpen={setModalOpen}
        donorId={donorId}
        setDonorId={setDonorId}
      />
    </div>
  );
};

export default Donors;
