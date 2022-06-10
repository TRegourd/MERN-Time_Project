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
import { DeleteButton } from "./deleteButton";
import AddProject from "./AddTeam";
import services from "../../services";
import { GridContextType, GridDataContext } from "../../GridDataProvider";

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <AddProject />
      <div>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
}

export default function TeamDataGrid({ teamList }: any) {
  const [pageSize, setPageSize] = React.useState<number>(10);
  const { getCurrentTeams } = React.useContext(
    GridDataContext
  ) as GridContextType;
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      project: true,
      id: false,
      customer: true,
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

  const rows = teamList?.map((team: any) => ({
    ...team,
    id: team._id,
  }));

  const columns: GridColumns = [
    { field: "id", headerName: "ID", width: 220, editable: false },
    { field: "name", headerName: "Team", width: 300, editable: true },
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

  const processRowUpdate = React.useCallback(async (newRow: GridRowModel) => {
    await services.modifyTeam(newRow.id, newRow).then(() => {
      getCurrentTeams();
    });
    return newRow;
  }, []);

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
