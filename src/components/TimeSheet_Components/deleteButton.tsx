import * as React from "react";
import { fetchTimeSheetList } from "../../libs/apiCalls";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

export function DeleteButton(params: any, setTimeList: React.Dispatch<any>) {
  const { enqueueSnackbar } = useSnackbar();
  function handleDelete() {
    const isConfirm = window.confirm("Confirm TimeSheet Delete ?");
    if (isConfirm)
      services
        .deleteTimesheetById(params.id)
        .then(() => {
          enqueueSnackbar("TimeSheet Successfully Deleted", {
            variant: "success",
          });
          fetchTimeSheetList().then((result) => {
            setTimeList(result);
          });
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
