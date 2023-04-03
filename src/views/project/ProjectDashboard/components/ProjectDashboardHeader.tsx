import React from "react";
import { ProjectDashboard } from "../../../../mock/data/projectData";

const ProjectDashboardHeader = ({ data }: { data: ProjectDashboard }) => {
  return (
    <div>
      <h4 className="mb-1">Hello, {data.userName}!</h4>
      <p>You have {data.taskCount} tasks on hand.</p>
    </div>
  );
};

export default ProjectDashboardHeader;
