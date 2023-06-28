import { useState } from "react";

export default function useSort(data,config){
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const setSortColumn = (label)=>{
    if(sortBy && label !== sortBy){
      setSortOrder("asc");
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  
  // sort table
  let sortedData = data;
  if (sortOrder && sortBy) {
    const { sortValue } = config.find((col) => col.label === sortBy);
    // make new array [...data] bc sort() modifies arr
    sortedData = [...data].sort((a, b) => {
      const valA = sortValue(a);
      const valB = sortValue(b);
      const order = sortOrder === "asc" ? 1 : -1;
      if (typeof valA === "string") {
        return valA.localeCompare(valB) * order;
      }
      return (valA - valB) * order;
    });
  }
  return { sortOrder, sortBy, sortedData, setSortColumn };
}