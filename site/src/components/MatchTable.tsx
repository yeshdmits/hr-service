import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Cv } from "../generated";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import useWindowSize from "../hooks/useWindowSize";
import CustomTooltip from "./CustomTooltip";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getCvById } from "../actions/cvActions";
import CloseIcon from "../assets/icons/CloseIcon";
import { setMatchingResults } from "../reducers/matchingReducer";

interface MatchTableProps {
  data: Cv[];
  best: Cv | null;
  setMatchClicked: (value: boolean) => void;
}

const MatchTable: React.FC<MatchTableProps> = ({
  data,
  setMatchClicked,
  best
}: MatchTableProps) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const rowData = best ? [...data, best] : data
  const dispatch = useDispatch<AppDispatch>();
  const windowSize = useWindowSize();
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();

    return () => {
      setGridApi(null);
    };
  }, []);

  const columnDefs: any = [
    {
      headerName: "Match %",
      field: "match",
      sortable: true,
      filter: true,
      width: 90,
      resizable: true,
      cellRenderer: (params: any) => {
        return (
          <span
            style={{
              color:
                params.value > 90
                  ? "green"
                  : params.value > 80
                  ? "lightblue"
                  : params.value > 65
                  ? "skyblue"
                  : params.value > 50
                  ? "orange"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {params.value}%
          </span>
        );
      },
      tooltipField: "matchPercentage",
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      width: 150,
      tooltipField: "name",
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      width: 150,
      tooltipField: "email",
    },
    {
      headerName: "Phone",
      field: "phone",
      sortable: true,
      filter: true,
      width: 150,
      tooltipField: "phone",
    },
    {
      headerName: "Skills",
      field: "skills",
      sortable: true,
      filter: true,
      valueGetter: (params: any) => params.data.skills.join(", "),
      resizable: true,
      tooltipValueGetter: (params: any) => params.data.skills.join(", "),
    },

    {
      headerName: "Education",
      field: "education",
      sortable: true,
      filter: true,
      valueGetter: (params: any) => params.data.education.join(", "),
      resizable: true,
      tooltipValueGetter: (params: any) => params.data.education.join(", "),
    },
    {
      headerName: "Experience",
      field: "experience",
      sortable: true,
      filter: true,
      valueGetter: (params: any) => params.data.experience.join(", "),
      resizable: true,
      tooltipValueGetter: (params: any) => params.data.experience.join(", "),
    },
    {
      headerName: "",
      field: "action",
      cellRenderer: (params: any) => {
        return (
          <button
            style={{
              marginTop: "6px",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(getCvById(params.data.id));
            }}
            className="bg-blue-300 hover:bg-blue-500 text-white font-bold rounded"
          >
            View CV
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    if (gridApi) gridApi.sizeColumnsToFit();
  }, [windowSize, gridApi]);

  const defaultColDef = {
    flex: 1,
    minWidth: 80,
    resizable: true,
    sortable: true,
    tooltipComponent: CustomTooltip,
    cellRenderer: (params: any) => {
      if (!params?.value) return null;

      const cellValue = params.value.toString();
      const cellWidth = params.column?.actualWidth || 0;

      const tempSpan = document.createElement("span");
      tempSpan.innerText = cellValue;
      tempSpan.style.visibility = "hidden";
      document.body.appendChild(tempSpan);

      const cellContentWidth = tempSpan.offsetWidth > cellWidth - 30;

      document.body.removeChild(tempSpan);

      if (cellContentWidth) {
        return (
          <span>
            <span style={{ cursor: "pointer" }}>{cellValue}</span>
          </span>
        );
      } else {
        return <span>{cellValue}</span>;
      }
    },
  };

  return (
    <div
      className="ag-theme-alpine-dark rounded-lg shadow-md"
      style={{ height: 610, width: "100%" }}
    >
      <div className="mb-1 p-4 flex justify-between border-2 border-dashed border-gray-300 rounded-md">
        <div
          className="w-2/3"
          style={{
            height: "4.2em",
          }}
        >
          <label className="block mb-2 text-sm font-medium text-gray-200">
            Search table:
          </label>
          <input
            onChange={(value) => {
              if (gridApi) {
                gridApi.setGridOption("quickFilterText", value.target.value);
              }
            }}
            className="block h-7 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus:outline-none"
          />
        </div>
        <CloseIcon
          onClick={() => {
            setMatchClicked(false);
            dispatch(
              setMatchingResults({
                topMatches: [],
                bestMatch: undefined,
              })
            );
          }}
        />
      </div>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5, 10, 20, 50, 100]}
      />
    </div>
  );
};

export default MatchTable;
