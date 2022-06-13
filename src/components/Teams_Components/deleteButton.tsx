import * as React from "react";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { GridContextType, GridDataContext } from "../../GridDataProvider";
import { useConfirm } from "material-ui-confirm";

export function DeleteButton(params: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentTeams } = React.useContext(
    GridDataContext
  ) as GridContextType;
  const confirm = useConfirm();

  function handleDelete() {
    confirm({
      title: "Confirm Delete Team ?",
      description:
        "This action will remove all associated projects and timesheets",
    }).then(() => {
      services
        .deleteTeam(params.id)
        .then(() => {
          enqueueSnackbar("Team Successfully Deleted", {
            variant: "success",
          });
          getCurrentTeams();
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
          handleDelete();
        }}
      >
        <BsFillTrashFill size={30} />
      </Button>
    </>
  );
}
