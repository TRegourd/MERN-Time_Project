import * as React from "react";
import {
  GridColumns,
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
  GridRowModel,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { DeleteButton } from "./deleteButton";
import AddTimeSheet from "./AddTimeSheet";
import services from "../../services";
import { GridContextType, GridDataContext } from "../../GridDataProvider";

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

// interface ToolBarProps {
//   cellMode: string;
//   selectedCellParams: Object[];
//   setSelectedCellParams: React.Dispatch<any>;
//   cellModesModel: Object;
//   setCellModesModel: React.Dispatch<any>;
//   setTimeList: React.Dispatch<any>;
// }

function CustomToolbar(/*props: ToolBarProps*/) {
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
  const [pageSize, setPageSize] = React.useState<number>(10);
  const { getCurrentTimesheets } = React.useContext(
    GridDataContext
  ) as GridContextType;
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
      width: 250,
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
      valueOptions: projectList.map((el: any) => {
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
        return DeleteButton(params);
      },
    },
  ];

  const processRowUpdate = React.useCallback(
    async (newRow: GridRowModel) => {
      // Make the HTTP request to save in the backend
      const project = projectList.find((el: any) => {
        return el.name === newRow.project;
      });
      await services
        .updateTimesheet({ ...newRow, project: project._id })
        .then(() => {
          getCurrentTimesheets();
        });
      return newRow;
    },
    [services.updateTimesheet]
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

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
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
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
