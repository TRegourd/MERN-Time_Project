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

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function TimeDataGrid({ list }: any) {
  const [timeList, setTimeList] = React.useState<any | []>(list);
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

  const rows = timeList?.map((timeSheet: any) => ({
    ...timeSheet,
    date: dayjs(timeSheet.date).format("DD/MM/YYYY"),
    projectName: timeSheet.project.name,
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
      field: "projectName",
      headerName: "Project",
      type: "string",
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
            autoPageSize={true}
          />
        </div>
      </div>
    </div>
  );
}
