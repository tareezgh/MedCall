import Navbar from "../components/common/Navbar";
import Hero from "../containers/Hero";
import HowItWork from "../containers/HowItWork";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4">
        <Hero />
        <HowItWork />
      </div>
    </div>
  );
};

export default Home;
