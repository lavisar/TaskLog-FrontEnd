import { DataGrid } from "@mui/x-data-grid";

export default function CustomGrid({ data, config, pageSize }) {
  const columns = config.map((col) => {
    const flex = isNaN(col.flex) ? 1 : col.flex;
    return {
      field: col.id,
      headerName: col.label,
      type: col.type,
      description: col.description || col.label,
      sortable: true,
      flex: flex,
      valueGetter: col.valueGetter,
      renderCell: col.renderCell,
    };
  });
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSize || 20 },
          },
        }}
        pageSizeOptions={[
          pageSize || 20,
          pageSize * 2 || 40,
          pageSize * 3 || 50,
        ]}
        autoHeight
      />
    </div>
  );
}
