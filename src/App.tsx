import Navigation from "./components/Navigation/Navigation";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Hero from "./sections/Hero/Hero";
import Collection from "./sections/Collection/Collection";

function App() {
  return (
    <SmoothScroll>
      <main className="bg-lv-black">
        <Navigation />

        <section id="home">
          <Hero />
        </section>

        <Collection />

        <section
          id="about"
          className="min-h-screen bg-lv-black"
        />

        <section
          id="contact"
          className="min-h-screen bg-lv-black"
        />
      </main>
    </SmoothScroll>
  );
}

export default App;