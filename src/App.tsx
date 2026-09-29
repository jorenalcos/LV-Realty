import Navigation from "./components/Navigation/Navigation";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Hero from "./sections/Hero/Hero";
import Collection from "./sections/Collection/Collection";
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
      </main>
    </SmoothScroll>
  );
}

export default App;