import * as React from "react";
import { fetchTeamList } from "../../libs/apiCalls";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

export function DeleteButton(params: any, setTeamList: React.Dispatch<any>) {
  const { enqueueSnackbar } = useSnackbar();
  function handleDelete() {
    const isConfirm = window.confirm("Confirm Team Delete ?");
    if (isConfirm)
      services
        .deleteTeam(params.id)
        .then(() => {
          enqueueSnackbar("Team Successfully Deleted", {
            variant: "success",
          });
          fetchTeamList().then((result) => {
            setTeamList(result);
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
