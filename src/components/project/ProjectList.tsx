import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { projectsData } from "./data";

const ProjectList = () => {
  return (
    <BentoGrid className="my-10 border md:auto-rows-[20rem]">
      {projectsData.map((project, i) => (
        <BentoGridItem
          key={i}
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
