import Particles from "../bits/particles";
import Home from "../components/BG";
import Header from "../components/Header";
import Hero from "../components/Hero";

function HomePage() {
  return (
    <>
      <div className="-z-5 h-screen bg-transparent w-full fixed top-0 left-0 min-h-screen">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={900}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>
      <Header />
      <Hero />
      <div className="flex-1 fixed -z-10 top-5 left-0 w-full min-h-screen">
        <Home />
      </div>
    </>
  );
}

export default HomePage;
