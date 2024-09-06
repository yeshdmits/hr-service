import { ITooltipParams } from "ag-grid-community";

const CustomTooltip = (props: ITooltipParams & { color: string }) => {
  const colId = props.column?.isColumn && props.column?.getColId();
  if (!colId) {
    return;
  }
  const data = props.data[colId];
  return (
    <div className="tooltip" data-testid="custom-tooltip">
      <div
        className="tooltip-content"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "5px 10px",
          width: "14em",
          borderRadius: "5px",
          fontSize: "12px",
          zIndex: 9999,
        }}
      >
        {typeof data === "string" ? (
          <span>{data}</span>
        ) : (
          data.map((item: any) => (
            <div key={item}>
              <span style={{ color: props.color }}>{item.name}</span>
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomTooltip;
