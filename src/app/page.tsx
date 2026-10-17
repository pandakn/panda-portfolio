import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Project from "@/components/project/Project";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Project />
    </main>
  );
}
