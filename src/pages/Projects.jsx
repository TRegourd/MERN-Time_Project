import { Grid, Button, TextField } from "@mui/material/";
import { useEffect, useState } from "react";
import Project from "../components/Project";
import services from "../services";

export default function Projects() {
  const [projectsList, setprojectsList] = useState([]);

  function fetchAndSetProjects() {
    services
      .getProjectsList()
      .then((res) => setprojectsList(res))
      .catch(() => alert("Impossible de charger la liste des projets"));
  }

  function deleteProject(project) {
    services.getTimesheetOfProject(project._id).then((times) => {
      if (times.data.length === 0) {
        services
          .deleteProject(project._id)
          .then(() => {
            fetchAndSetProjects();
            alert("Project deleted!");
          })
          .catch(() => alert("Impossible de charger la liste des projets"));
      } else {
        alert(`You can't delete this project!
                There is time associate to this project`);
      }
    });
  }

  useEffect(fetchAndSetProjects, []);

  return (
    <Grid
      style={{ marginTop: "100px" }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={8} textAlign="center">
        <h1> Name Projects</h1>
      </Grid>
      {projectsList.map((oneProject) => (
        <Project
          key={oneProject._id}
          {...oneProject}
          onDeleteProject={() => deleteProject(oneProject)}
        />
      ))}
    </Grid>
  );
}
