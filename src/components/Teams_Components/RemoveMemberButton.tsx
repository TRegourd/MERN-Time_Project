import * as React from "react";
import services from "../../services";
import { FaPeopleArrows } from "react-icons/fa";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { GridContextType, GridDataContext } from "../../GridDataProvider";
import { useConfirm } from "material-ui-confirm";

export function RemoveMemberButton(params: any, teamId: string) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentTeamMembers } = React.useContext(
    GridDataContext
  ) as GridContextType;
  const confirm = useConfirm();

  function handleLeave() {
    confirm({
      title: "Confirm Leave Team ?",
      description:
        "This action will remove all associated projects and timesheets",
    }).then(() => {
      services
        .removeUser(teamId, params?.row)
        .then(() => {
          enqueueSnackbar("Team Successfully Left", {
            variant: "success",
          });
          getCurrentTeamMembers(teamId);
        })
        .catch(() => enqueueSnackbar("Incorrect Entry", { variant: "error" }));
    });
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
