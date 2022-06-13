import * as React from "react";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { GridContextType, GridDataContext } from "../../GridDataProvider";
import { useConfirm } from "material-ui-confirm";

export function DeleteButton(params: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentTimesheets } = React.useContext(
    GridDataContext
  ) as GridContextType;
  const confirm = useConfirm();

  function handleDelete() {
    confirm({
      title: "Confirm Delete TimeSheet ?",
      description: "This action is permanent",
    }).then(() => {
      services
        .deleteTimesheetById(params.id)
        .then(() => {
          enqueueSnackbar("TimeSheet Successfully Deleted", {
            variant: "success",
          });
          getCurrentTimesheets();
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
        <BsFillTrashFill />
      </Button>
    </>
  );
}
