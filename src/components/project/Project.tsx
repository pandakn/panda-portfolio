import ProjectList from "./ProjectList";
import SketchMark from "@/components/ui/SketchMark";

export default function Project() {
  return (
    <section
      id="project"
      className="work-section"
      aria-labelledby="work-heading"
    >
      <div className="work-heading">
        <h2 id="work-heading" className="section-title">
          A few things I’ve <SketchMark color="olive">made.</SketchMark>
        </h2>
      </div>
      <ProjectList />
    </section>
  );
}
