import ButtonColor from "../components/ColorReact";
import { Grid, TextField, Button } from "@mui/material";
import services from "../services";
//import { Item } from "../components/Item";

export default function Project({ _id, name, color, onDeleteProject }) {
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={2}>
        <ButtonColor
          r={color.r}
          g={color.g}
          b={color.b}
          onUpdateColor={(color) => services.updateProjectColor(_id, color)}
        ></ButtonColor>
      </Grid>
      <Grid item xs={8} textAlign="left">
        <TextField
          variant="outlined"
          defaultValue={name}
          placeholder={name}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          className="deleteButton"
          onClick={onDeleteProject}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
