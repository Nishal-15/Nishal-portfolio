import { About } from "./components/About";
import { Awards } from "./components/Awards";
import { Contact, Footer } from "./components/Contact";
import { Education } from "./components/Education";
import { Faq } from "./components/Faq";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";

const App = () => (
  <>
    <Intro />
    <Navbar />
    <main className="overflow-x-clip">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Education />
      <Awards />
      <Faq />
      <Contact />
    </main>
    <Footer />
  </>
);

export default App;
