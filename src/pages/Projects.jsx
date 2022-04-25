import { Grid, Box, TextField, Button } from "@mui/material/";
import { useEffect, useState } from "react";
import Project from "../components/Project";
import ButtonColor from "../components/ColorReact";
import stringifyRGB from "../libs/colors";

import services from "../services";

export default function Projects() {
  const [projectsList, setprojectsList] = useState([]);

  // CREATION PROJECT
  const [form, setForm] = useState({
    name: "",
    color: {
      r: "120",
      g: "200",
      b: "200",
    },
  });

  const body = {
    name: form.projectName,
    color: form.color,
  };

  function handleChangeName(e) {
    setForm({ ...form, name: e.target.value });
  }

  function handleChangeColor(color) {
    setForm({ ...form, color: stringifyRGB(color) });
  }
  // CREATION PROJECT

  function fetchAndSetProjects() {
    services
      .getProjectsList()
      .then((res) => setprojectsList(res))
      .catch(() => alert("Impossible de charger la liste des projets"));
  }

  function createProjectSubmit() {
    const paramsReq = {
      name: form.name,
      r: form.color.r,
      g: form.color.g,
      b: form.color.b,
    };

    services
      .createProject(paramsReq)
      .then(() => {
        fetchAndSetProjects();
      })
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

  useEffect(() => {
    fetchAndSetProjects();
  }, []);

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12} textAlign="center">
        <h1> New Projects</h1>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Box
          component="form"
          onSubmit={createProjectSubmit}
          onChange={handleChangeName}
          sx={{
            "& > :not(style)": { m: 2, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Grid item xs={2}>
              <ButtonColor
                r="120"
                g="200"
                b="200"
                name="color"
                onUpdateColor={(color) => handleChangeColor}
              ></ButtonColor>
            </Grid>
            <Grid item xs={8} textAlign="left">
              <TextField
                required
                id="outlined-required"
                label="Project name"
                name="projectName"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="sumbit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <h1> Projects</h1>
      </Grid>
      <Grid item xs={12} textAlign="center">
        {projectsList.map((oneProject) => (
          <Project
            key={oneProject._id}
            {...oneProject}
            onDeleteProject={() => deleteProject(oneProject)}
          />
        ))}
      </Grid>
    </Grid>
  );
}
