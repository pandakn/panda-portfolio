import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { projectsData } from "./data";

const ProjectList = () => {
  return (
    <BentoGrid>
      {projectsData.map((project, i) => (
        <BentoGridItem
          key={project.githubLink}
          index={i + 1}
          title={project.title}
          description={project.description}
          header={project.header}
          className={project.className}
          githubLink={project.githubLink}
          techStack={project.techStack}
          webUrl={project.webUrl}
        />
      ))}
    </BentoGrid>
  );
};

export default ProjectList;
