import { Search, Droplets, MapPin } from "lucide-react";
import { dhakaThana } from "../../db/data";
import { useTranslation } from "react-i18next";

const SearchDonor = () => {
  const { t } = useTranslation();

  return (
    <section id="SearchDonor">
      <form action="/donor/" className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="relative flex-1">
          <Droplets size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
          <select
            name="bloodGroup"
            id="bloodGroup"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
            aria-label={t("search_donor.blood_group")}
          >
            <option value="">{t("search_donor.blood_group")}</option>
            <option value="A+ev">A+ (এ পজিটিভ)</option>
            <option value="A-ev">A- (এ নেগেটিভ)</option>
            <option value="B+ev">B+ (বি পজিটিভ)</option>
            <option value="B-ev">B- (বি নেগেটিভ)</option>
            <option value="O+ev">O+ (ও পজিটিভ)</option>
            <option value="O-ev">O- (ও নেগেটিভ)</option>
            <option value="AB+ev">AB+ (এবি পজিটিভ)</option>
            <option value="AB-ev">AB- (এবি নেগেটিভ)</option>
          </select>
        </div>

        <div className="relative flex-1">
          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            name="thana"
            id="thana"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
            aria-label={t("search_donor.area")}
          >
            <option value="">{t("search_donor.area")}</option>
            {dhakaThana?.map((data: any) => (
               <option value={data.name} key={data.id}>
                 {data.name}
               </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 shrink-0"
          aria-label={t("search_donor.search")}
        >
          <Search size={20} />
          <span className="hidden md:inline">{t("search_donor.search")}</span>
        </button>
      </form>
    </section>
  );
};

export default SearchDonor;
