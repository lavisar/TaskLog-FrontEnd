import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";

const keyFunc = (col) => col.label.replace(/\s/g, "_").toLowerCase();

export default function CustomTable({ data, config }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const renderedHeader = config.map((col) => {
    return (
      <TableCell key={keyFunc(col)} align={col.align}>
        {col.label}
      </TableCell>
    );
  });

  const renderedRow = data.map((rowData) => {
    return (
      <TableRow hover tabIndex={-1} key={rowData.id}>
        {config.map((col) => {
          return (
            <TableCell key={rowData.id + keyFunc(col)} align={col.align}>
              {col.render(rowData)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ minWidth: 450 }} aria-label="table">
          <TableHead>
            <TableRow>{renderedHeader}</TableRow>
          </TableHead>
          <TableBody>
            {renderedRow?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
