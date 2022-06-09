import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { BiAlarmAdd } from "react-icons/bi";
import AddTimeSheet from "../TimeSheet_Components/AddTimeSheet";
import AddProject from "../Projects_Components/AddProject";

export default function ImgMediaCard() {
  return (
    <Box>
      <Grid
        container
        sx={{ marginTop: "10px", justifyContent: "center" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid item>
          <Card sx={{ maxWidth: 500, display: "flex" }}>
            <CardActions>
              <AddTimeSheet />
            </CardActions>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                TimeSheets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your Time on project
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 500, display: "flex" }}>
            <CardActions>
              <AddProject />
            </CardActions>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Set Projects to track time on
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 1000 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Statistics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
