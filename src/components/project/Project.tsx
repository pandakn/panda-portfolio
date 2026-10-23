import ProjectList from "./ProjectList";

export default function Project() {
  return (
    <section
      id="project"
      className="collection"
      aria-labelledby="work-heading"
      tabIndex={-1}
    >
      <ProjectList />
    </section>
  );
}
