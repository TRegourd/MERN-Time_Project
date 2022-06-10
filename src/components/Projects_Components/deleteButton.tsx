import * as React from "react";
import { fetchProjectList } from "../../libs/apiCalls";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

export function DeleteButton(
  params: any,
  setCurrentProjectList: React.Dispatch<any>
) {
  const { enqueueSnackbar } = useSnackbar();
  function handleDelete() {
    const isConfirm = window.confirm("Confirm Project Delete ?");
    if (isConfirm)
      services
        .deleteProject(params.id)
        .then(() => {
          enqueueSnackbar("Project Successfully Deleted", {
            variant: "success",
          });
          fetchProjectList().then((result) => {
            setCurrentProjectList(result);
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
