import * as React from "react";
import { CgUserList } from "react-icons/cg";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

import { GridContextType, GridDataContext } from "../../GridDataProvider";

import TeamInfoDatagrid from "./TeamInfoDatagrid";

export function TeamInfo(params: any) {
  const [open, setOpen] = React.useState(false);
  const { getCurrentTeamMembers } = React.useContext(
    GridDataContext
  ) as GridContextType;

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    getCurrentTeamMembers(params.id);
  }, []);
  return (
    <>
      <Button
        color="primary"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <CgUserList size={30} />
      </Button>
      <Dialog
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "1920px", // Set your width here
            },
          },
        }}
        onClose={handleClose}
      >
        <DialogContent>
          <TeamInfoDatagrid teamId={params.id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
