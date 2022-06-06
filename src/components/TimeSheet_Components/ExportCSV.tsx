import { Button } from "@mui/material";
import React from "react";
import { CSVLink } from "react-csv";
import { Data } from "react-csv/components/CommonPropTypes";
import { ITimeList } from "../../Interfaces";

const ExportCSV = ({ timeList }: any) => {
  const headers = [
    { label: "Created At", key: "createdAt" },
    { label: "Date", key: "date" },
    { label: "Description", key: "desc" },
    { label: "Duration", key: "duration" },
    { label: "Project ID", key: "projectId" },
    { label: "Project Name", key: "projectName" },
    { label: "User ID", key: "userId" },
    { label: "User Name", key: "userName" },
    { label: "ID", key: "_id" },
  ];

  function treatData(list: ITimeList): Data {
    let treatedTimeList = timeList.map((el: any) => ({
      _id: el._id,
      createdAt: el.createdAt,
      date: el.date,
      desc: el.desc,
      duration: el.duration,
      projectId: el.project._id,
      projectName: el.project.name,
      userId: el.user._id,
      userName: el.user.first_name + " " + el.user.last_name,
    }));

    return treatedTimeList;
  }

  return (
    <>
      <CSVLink data={treatData(timeList)} headers={headers}>
        <Button variant="outlined">Download CSV</Button>
      </CSVLink>
    </>
  );
};

export default ExportCSV;
