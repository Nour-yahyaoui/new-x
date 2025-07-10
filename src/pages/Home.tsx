import Home from "../components/BG"
import Header from "../components/Header"
import Hero from "../components/Hero"

function HomePage() {

  return (
    <>
    <Header />
    <Hero />
    <div className="flex-1 fixed -z-10 top-5 left-0 w-full min-h-screen">
     <Home />
    </div>
    </>
  )
}

export default HomePage
