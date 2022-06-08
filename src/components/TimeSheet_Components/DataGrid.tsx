import * as React from "react";
import Box from "@mui/material/Box";
import {
  GridColumns,
  GridRowsProp,
  DataGrid,
  GridRowId,
  GridEventListener,
  GridCellModesModel,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import { fetchTimeSheetList } from "../../libs/apiCalls";
import dayjs from "dayjs";
import { DeleteButton } from "./deleteButton";
import AddTimeSheet from "./AddTimeSheet";
import { AuthContext, AuthContextType } from "../../AuthProvider";
import { Select } from "@mui/material";

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <AddTimeSheet />
      <div>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
}

export default function TimeDataGrid({ timeList, projectList }: any) {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [timeSheetList, setTimeList] = React.useState<any | []>(timeList);
  const [currentProjectList, setProjectList] = React.useState<any | []>(
    projectList
  );
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
      date: true,
      projectName: true,
      duration: true,
      desc: true,
      userName: false,
    });
  const [selectedCellParams, setSelectedCellParams] =
    React.useState<SelectedCellParams | null>(null);
  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});

  const handleCellFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    []
  );

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback<GridEventListener<"cellKeyDown">>(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  const rows = timeSheetList?.map((timeSheet: any) => ({
    ...timeSheet,
    date: dayjs(timeSheet.date).format("DD/MM/YYYY"),
    project: timeSheet.project.name,
    userName: `${timeSheet.user.first_name} ${timeSheet.user.last_name}`,
    id: timeSheet._id,
  }));

  const columns: GridColumns = [
    { field: "id", headerName: "ID", width: 220, editable: true },
    {
      field: "desc",
      headerName: "Description",
      type: "string",
      width: 200,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration (min)",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 100,
      editable: true,
    },
    {
      field: "project",
      headerName: "Project",
      type: "singleSelect",
      valueOptions: currentProjectList.map((el: any) => {
        return el.name;
      }),
      width: 200,
      editable: true,
    },
    {
      field: "userName",
      headerName: "User",
      type: "string",
      width: 200,
      editable: false,
    },
    {
      field: "delete",
      headerName: "",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return DeleteButton(params, setTimeList);
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", marginRight: 20 }}>
      <div
        style={{
          display: "flex",
          height: "100%",
          margin: "20px 20px 0px 20px",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            sx={{ margin: "auto" }}
            rows={rows}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            onCellKeyDown={handleCellKeyDown}
            cellModesModel={cellModesModel}
            components={{
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: {
                cellMode,
                selectedCellParams,
                setSelectedCellParams,
                cellModesModel,
                setCellModesModel,
              },
              cell: {
                onFocus: handleCellFocus,
              },
            }}
            experimentalFeatures={{ newEditingApi: true }}
            editMode="row"
            rowsPerPageOptions={[5, 10, 20, 100]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
          />
        </div>
      </div>
    </div>
  );
}
