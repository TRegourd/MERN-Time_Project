import { Grid, Button, TextField } from "@mui/material/";
import { useEffect, useState } from "react";
import ButtonColor from "../components/ColorReact";
import services from "../services";

export default function Projects() {
  const [project, setProject] = useState([]);

  function fetchAndSetProjects() {
    services
      .getProjectsList()
      .then((res) => setProject(res))
      .catch(() => alert("Impossible de charger la liste des projets"));
  }

  useEffect(fetchAndSetProjects, []);
  return (
    <div>
      <h2>Projects</h2>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="space-evenly"
      >
        <Grid item xs={8} textAlign="left">
          <h2> Name </h2>
        </Grid>
        {project.map((oneProject) => (
          <Grid item xs={8} key={oneProject._id}>
            <Grid container>
              <Grid item xs={2}>
                <ButtonColor
                  r={oneProject.color.r}
                  g={oneProject.color.g}
                  b={oneProject.color.b}
                  onUpdateColor={(color) =>
                    services.updateProjectColor(oneProject._id, color)
                  }
                ></ButtonColor>
              </Grid>
              <Grid item xs={8} textAlign="left">
                <TextField
                  variant="outlined"
                  value={oneProject.name}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
