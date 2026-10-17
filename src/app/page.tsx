import About from "@/components/about/About";
import Certifications from "@/components/certifications/Certifications";
import Hero from "@/components/hero/Hero";
import Project from "@/components/project/Project";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Project />
      <Certifications />
    </main>
  );
}
