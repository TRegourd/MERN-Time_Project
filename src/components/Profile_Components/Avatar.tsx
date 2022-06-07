import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { BiUser } from "react-icons/bi";

export default function ProfileAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ width: 150, height: 150, fontSize: 100 }}>
        <BiUser />
      </Avatar>
    </Stack>
  );
}
