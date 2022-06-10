import * as React from "react";
import { fetchTimeSheetList } from "../../libs/apiCalls";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";
import { GridContextType, GridDataContext } from "../../GridDataProvider";

export function DeleteButton(params: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentTimesheets } = React.useContext(
    GridDataContext
  ) as GridContextType;
  function handleDelete() {
    const isConfirm = window.confirm("Confirm TimeSheet Delete ?");
    if (isConfirm)
      services
        .deleteTimesheetById(params.id)
        .then(() => {
          enqueueSnackbar("TimeSheet Successfully Deleted", {
            variant: "success",
          });
          getCurrentTimesheets();
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
