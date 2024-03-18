import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Project from "@/components/project/Project";

export default function Home() {
  return (
    <main className="mt-[calc(16px+28px)]">
      <Hero />
      <About />
      <Project />
    </main>
  );
}
