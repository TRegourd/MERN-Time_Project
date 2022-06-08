import * as React from "react";
import { fetchTimeSheetList } from "../../libs/apiCalls";
import services from "../../services";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";

export function DeleteButton(params: any, setTimeList: React.Dispatch<any>) {
  function handleDelete() {
    const isConfirm = window.confirm("Confirm TimeSheet Delete ?");
    if (isConfirm)
      services
        .deleteTimesheetById(params.id)
        .then(() => {
          alert("TimeSheet Deleted");
          fetchTimeSheetList().then((result) => {
            setTimeList(result);
          });
        })
        .catch(() => alert("erreur"));
  }
  return (
    <Button
      color="primary"
      style={{ margin: "auto" }}
      onClick={() => {
        handleDelete();
      }}
    >
      <BsFillTrashFill />
    </Button>
  );
}
