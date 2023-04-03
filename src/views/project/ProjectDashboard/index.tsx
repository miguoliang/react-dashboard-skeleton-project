import React, { useEffect } from "react";
import reducer from "./store";
import { injectReducer } from "store/index";
import { getProjectDashboardData } from "./store/dataSlice";
import { Loading } from "components/shared";
import ProjectDashboardHeader from "./components/ProjectDashboardHeader";
import TaskOverview from "./components/TaskOverview";
import MyTasks from "./components/MyTasks";
import Projects from "./components/Projects";
import Schedule from "./components/Schedule";
import Activities from "./components/Activities";
import { useAppDispatch, useAppSelector } from "store/hooks";

injectReducer("projectDashboard", reducer);

const ProjectDashboard = () => {
  const dispatch = useAppDispatch();

  const {
    userName,
    taskCount,
    projectOverviewData,
    myTasksData,
    scheduleData,
    projectsData,
    activitiesData,
  } = useAppSelector((state) => state.projectDashboard.data.dashboardData);
  const loading = useAppSelector(
    (state) => state.projectDashboard.data.loading
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(getProjectDashboardData(null));
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Loading loading={loading}>
        <ProjectDashboardHeader data={{ userName, taskCount }} />
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-auto">
            <TaskOverview data={projectOverviewData} />
            <MyTasks data={myTasksData} />
            <Projects data={projectsData} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="xl:w-[380px]">
              <Schedule data={scheduleData} />
              <Activities data={activitiesData} />
            </div>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default ProjectDashboard;
