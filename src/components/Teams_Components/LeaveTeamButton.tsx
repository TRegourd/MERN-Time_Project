import * as React from "react";
import services from "../../services";
import { FaPeopleArrows } from "react-icons/fa";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { GridContextType, GridDataContext } from "../../GridDataProvider";
import { AuthContext, AuthContextType } from "../../AuthProvider";

export function LeaveTeamButton(params: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentUser } = React.useContext(AuthContext) as AuthContextType;
  function handleLeave() {
    const isConfirm = window.confirm("Confirm Leaving Team ?");
    if (isConfirm)
      services
        .leaveTeam(params.id)
        .then(() => {
          enqueueSnackbar("Team Successfully Left", {
            variant: "success",
          });
          getCurrentUser();
        })
        .catch(() => enqueueSnackbar("Incorrect Entry", { variant: "error" }));
  }
  return (
    <>
      <Button
        color="primary"
        style={{ margin: "auto" }}
        onClick={() => {
          handleLeave();
        }}
      >
        <FaPeopleArrows />
      </Button>
    </>
  );
}
