import React from "react";
import { Button, Card } from "components/ui";
import { useNavigate } from "react-router-dom";
import ListItem from "../../ProjectList/components/ListItem";
import { ProjectDashboard } from "../../../../mock/data/projectData";

const Projects = ({ data }: { data: ProjectDashboard["projectsData"] }) => {
  const navigate = useNavigate();

  const onViewAllProjects = () => {
    navigate("/app/project/project-list");
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h4>Projects</h4>
        <Button onClick={onViewAllProjects} size="sm">
          View All
        </Button>
      </div>
      {data?.map((project) => (
        <ListItem cardBorder key={project.id} data={project} />
      ))}
    </Card>
  );
};

export default Projects;
