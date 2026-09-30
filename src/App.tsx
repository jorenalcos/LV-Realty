import Navigation from "./components/Navigation/Navigation";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Hero from "./sections/Hero/Hero";
import Collection from "./sections/Collection/Collection";
import About from "./sections/About/About";
import Vision from "./sections/Vision/Vision";
import Mission from "./sections/Mission/Mission";
import Experience from "./sections/Experience/Experience";
import Contact from "./sections/Contact/Contact";
import { useState } from "react";

function App() {
  const [propertyOpen, setPropertyOpen] =
    useState(false);

  return (
    <SmoothScroll>
      <main className="bg-lv-black">
        <Navigation hidden={propertyOpen} />

        <section id="home">
          <Hero />
        </section>

        <Collection
          onPropertyOpen={() => setPropertyOpen(true)}
          onPropertyClose={() => setPropertyOpen(false)}
        />

        <About />
        <Vision />
        <Mission />
        <Experience />

        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;