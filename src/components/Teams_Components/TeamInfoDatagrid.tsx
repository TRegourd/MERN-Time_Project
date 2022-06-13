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
import services from "../../services";
import { GridContextType, GridDataContext } from "../../GridDataProvider";
import JoinTeam from "./JoinTeam";
import { RemoveMemberButton } from "./RemoveMemberButton";
import InviteButton from "./InviteButton";

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

function CustomToolbar(props: any) {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <InviteButton teamId={props.teamId} />
      <div>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
}

export default function TeamInfoDatagrid({ teamId }: any) {
  const [pageSize, setPageSize] = React.useState<number>(10);
  const { getCurrentTeams, getCurrentTeamMembers, currentTeamMembers } =
    React.useContext(GridDataContext) as GridContextType;
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
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

  React.useEffect(() => {
    getCurrentTeamMembers(teamId);
  }, []);

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

  const rows = currentTeamMembers?.map((member: any) => ({
    ...member,
    id: member._id,
  }));

  const columns: GridColumns = [
    { field: "id", headerName: "ID", width: 220, editable: false },
    {
      field: "first_name",
      headerName: "First Name",
      width: 200,
      editable: false,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 200,
      editable: false,
    },
    {
      field: "position",
      headerName: "Position",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: false,
    },
    {
      field: "",
      headerName: "Remove",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return RemoveMemberButton(params, teamId);
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
    <div style={{ height: 500, width: "90vw", marginRight: 20 }}>
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
                teamId: teamId,
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
