import * as React from "react";

import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";
import { GridContextType, GridDataContext } from "../../GridDataProvider";
import { useConfirm } from "material-ui-confirm";

export function DeleteButton(params: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentProjects } = React.useContext(
    GridDataContext
  ) as GridContextType;
  const confirm = useConfirm();

  function handleDelete() {
    confirm({
      title: "Confirm Delete Project ?",
      description: "This action will remove all associated timesheets",
    })
      .then(() => {
        services
          .deleteProject(params.id)
          .then(() => {
            enqueueSnackbar("Project Successfully Deleted", {
              variant: "success",
            });
            getCurrentProjects();
          })
          .catch(() =>
            enqueueSnackbar("Incorrect Entry", { variant: "error" })
          );
      })
      .catch((err) => {
        console.log(err);
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
        <BsFillTrashFill />
      </Button>
    </>
  );
}
