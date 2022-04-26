import ButtonColor from "../components/ColorReact";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import services from "../services";

export default function Project({
  _id,
  name,
  color,
  onChangeProjectName,
  onDeleteProject,
}) {
  const [nameProject, setNameProject] = useState(name);
  const isNameChange = nameProject !== name;
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs={2}>
          <ButtonColor
            r={color.r}
            g={color.g}
            b={color.b}
            onUpdateColor={(color) => services.updateProjectColor(_id, color)}
          ></ButtonColor>
        </Grid>
        <Grid item xs={6} textAlign="left">
          <TextField
            id="outlined-required"
            defaultValue={nameProject}
            placeholder={nameProject}
            name="projectName"
            onChange={(e) => setNameProject(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          {isNameChange && (
            <Button
              variant="outlined"
              className="modifyButton"
              onClick={() => onChangeProjectName(_id, nameProject)}
            >
              Modify Name
            </Button>
          )}
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            className="deleteButton"
            onClick={onDeleteProject}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
