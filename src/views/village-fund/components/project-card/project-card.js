import React from "react";

import "./project-card.scss";

const ProjectCard = ({ projectName }) => {
  return (
    <p className="project-card">
      <span>โครงการ</span>
      {projectName}
    </p>
  );
};

export default ProjectCard;
