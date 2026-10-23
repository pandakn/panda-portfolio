import Image from "next/image";
import { featuredProjects } from "../project/data";

export default function Monitor({ selectedId }: { selectedId: string }) {
  return (
    <div className="hardware-stage">
      <span className="hardware-star" aria-hidden="true">
        ✳
      </span>
      <div className="monitor-rig">
        <div className="case-side" aria-hidden="true" />
        <div className="case-front">
          <div className="screen-surround">
            <div className="screen-glass" id="monitor-screen">
              {featuredProjects.map((project, index) =>
                project.preview.kind === "image" ? (
                  <Image
                    key={project.id}
                    src={project.preview.src}
                    alt={project.preview.alt}
                    fill
                    sizes="(max-width: 600px) 240px, 370px"
                    preload={index === 0}
                    loading={index === 0 ? undefined : "eager"}
                    className={
                      selectedId === project.id
                        ? "screen-image is-active"
                        : "screen-image"
                    }
                    aria-hidden={selectedId !== project.id}
                  />
                ) : null,
              )}
            </div>
          </div>
          <span className="case-label" aria-hidden="true">
            KEEM / DISPLAY 01
          </span>
          <span className="speaker" aria-hidden="true" />
          <span className="power-notch" aria-hidden="true" />
          <span className="power-led" aria-hidden="true" />
        </div>
        <div className="stand-neck" aria-hidden="true" />
        <div className="stand-foot" aria-hidden="true" />
        <div className="pedestal" aria-hidden="true" />
        <div className="cable" aria-hidden="true" />
      </div>
      <span className="hardware-sticker">Built with curiosity.</span>
    </div>
  );
}
