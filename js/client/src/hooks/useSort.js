import {useState} from "react";

export function useSort() {
  const [sortField, setSortField] = useState();
  const [sortDirection, setSortDirection] = useState();

  const updateSort = (field) => () => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {sortField, sortDirection, updateSort};
}