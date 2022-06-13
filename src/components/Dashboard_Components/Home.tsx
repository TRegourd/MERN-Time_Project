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
import AddTimeSheet from "./AddTimeSheet";
import AddProject from "./AddProject";
import Charts from "../Charts";
import Statistics from "./Statistics";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../AuthProvider";
import AddTeam from "./AddTeam";

export default function ImgMediaCard() {
  const { currentUser, getCurrentUser } = React.useContext(
    AuthContext
  ) as AuthContextType;

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Box>
      <Grid
        container
        sx={{ marginTop: "10px", justifyContent: "center" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid item>
          <Card sx={{ maxWidth: 300, display: "flex" }}>
            <CardActions>
              <AddTimeSheet />
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 300, display: "flex" }}>
            <CardActions>
              <AddProject />
            </CardActions>
          </Card>
        </Grid>

        {currentUser.isAdmin && (
          <Grid item>
            <Card sx={{ maxWidth: 300, display: "flex" }}>
              <CardActions>
                <AddTeam />
              </CardActions>
            </Card>
          </Grid>
        )}
        <Grid item>
          <Card sx={{ maxWidth: 1000 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Statistics
              </Typography>
              <Statistics />
            </CardContent>
            <CardActions>
              <Button size="small">
                <Link to="/report">Learn More</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
