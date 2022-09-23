import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import AddTimeSheet from "./AddTimeSheet";
import AddProject from "./AddProject";
import Statistics from "./Statistics";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../AuthProvider";
import AddTeam from "./AddTeam";
import "./DashboardMenu.css";

export default function ImgMediaCard() {
  const { currentUser, getCurrentUser } = React.useContext(
    AuthContext
  ) as AuthContextType;

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Box>
      <div className="dashboard-home-container">
        <div className="dashboard-btns-container">
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
        </div>
        <Grid item>
          <Card>
            <CardContent className="chart-container">
              <Typography gutterBottom variant="h5" component="div">
                Statistics
              </Typography>
              <Statistics />
            </CardContent>
          </Card>
        </Grid>
      </div>
    </Box>
  );
}
