import { TableCell } from "@mui/material";
import useSort from "../../hooks/use-sort";
import CustomTable from "./CustomTable";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

export default function CustomTableSortable(props) {
  const { config, data } = props;
  const { sortBy, sortOrder, sortedData, setSortColumn } = useSort(
    data,
    config
  );
  const keyFunc = (col) => col.label.replace(/\s/g, "_").toLowerCase();
  const updatetedConfig = config.map((col) => {
    if (!col.sortValue) return col;
    return {
      ...col,
      header: () => (
        <TableCell
          key={keyFunc(col)}
          align={col.align}
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(col.label)}
        >
          <div className="flex items-center">
            {getIcons(col.label, sortBy, sortOrder)}
            {col.label}
          </div>
        </TableCell>
      ),
    };
  });
  return <CustomTable {...props} data={sortedData} config={updatetedConfig} />;
}

// icon
function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <AiFillCaretUp />
        <AiFillCaretDown />
      </div>
    );
  }
  if (sortOrder === null) {
    return (
      <div>
        <AiFillCaretUp />
        <AiFillCaretDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <AiFillCaretUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <AiFillCaretDown />
      </div>
    );
  }
}
