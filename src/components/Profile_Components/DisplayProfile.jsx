import { Grid, Button } from "@mui/material";
import React from "react";
import ProfileAvatar from "./Avatar";
import EditProfile from "./EditProfile";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BiBuildings, BiMap, BiUser } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import styled from "styled-components";

export default function DisplayProfile({
  currentUser,
  fetchAndSetCurrentUser,
}) {
  return (
    <div>
      <Card
        sx={{
          minWidth: 400,
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent>
          <CardContainer>
            <ProfileAvatar />
            <DataContainer>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
                className="profileDetails"
              >
                <BiUser />
                <span>
                  {currentUser.first_name} {currentUser.last_name}
                </span>
              </Typography>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
                className="profileDetails"
              >
                <BiBuildings />
                <span>{currentUser.position}</span>
              </Typography>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
                className="profileDetails"
              >
                <BiMap />
                <span>{currentUser.adress}</span>
              </Typography>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
                className="profileDetails"
              >
                <MdAlternateEmail />
                <span>{currentUser.email}</span>
              </Typography>
            </DataContainer>
          </CardContainer>
        </CardContent>

        <CardActions>
          <EditProfile
            currentUser={currentUser}
            fetchAndSetCurrentUser={fetchAndSetCurrentUser}
          />
        </CardActions>
      </Card>
    </div>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  .profileDetails {
    padding: 0.2rem;
    display: flex;
    gap: 1rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
