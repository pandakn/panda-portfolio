import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Project from "@/components/project/Project";
import Certifications from "@/components/certifications/Certifications";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Project />
      <About />
      <Certifications />
    </main>
  );
}
