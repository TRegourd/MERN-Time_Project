import * as React from "react";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { GridContextType, GridDataContext } from "../../GridDataProvider";

export function DeleteButton(params: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentTeams } = React.useContext(
    GridDataContext
  ) as GridContextType;
  function handleDelete() {
    const isConfirm = window.confirm("Confirm Team Delete ?");
    if (isConfirm)
      services
        .deleteTeam(params.id)
        .then(() => {
          enqueueSnackbar("Team Successfully Deleted", {
            variant: "success",
          });
          getCurrentTeams();
        })
        .catch(() => enqueueSnackbar("Incorrect Entry", { variant: "error" }));
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
        <BsFillTrashFill />
      </Button>
    </>
  );
}
