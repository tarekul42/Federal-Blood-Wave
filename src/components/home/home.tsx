import Banner from "./banner/Banner";
import Features from "./features/feat";
import BLDinfo from "./Dinfo/BLDinfo";

const Home = () => {
  return (
    <div className="bg-white">
      <Banner />
      <BLDinfo />
      <Features />
    </div>
  );
};

export default Home;
