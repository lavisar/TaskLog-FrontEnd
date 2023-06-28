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
import { Fragment, useState } from "react";

const keyFunc = (col) => col.label.replace(/\s/g, "_").toLowerCase();

export default function CustomTable({ data, config }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const renderedHeader = config.map((col) => {
    if (col.header) {
      return <Fragment key={col.label}>{col.header()}</Fragment>;
    }
    return (
      <TableCell key={keyFunc(col)} align={col.align}>
        {col.label}
      </TableCell>
    );
  });

  const renderedRow = data.map((rowData, index) => {
    return (
      <TableRow hover tabIndex={-1} key={index}>
        {config.map((col) => {
          return (
            <TableCell key={rowData.id + keyFunc(col)} align={col.align}>
              {col.renderCell(rowData)}
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
