/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { tableData } from "../db-man/DBTable";
import DBTable from "../db-man/DBTable";

export default function EditLists() {
  const [tableFields, SETtableFields] = useState<FileList>();
  const [tableRows, SETtableRows] = useState<tableData[][]>([]);
  const [tableName, SETtableName] = useState<string>(""); // Used to determine which table's data to fetch

  const fetchTableData = (tableName: string): void => {
    const DBURL = `http://localhost:8000/${tableName}`;
    console.log("Attempting to send query to " + DBURL);

    fetch(DBURL)
      .then(response => response.json())
      .then(data => {
        SETtableFields(data.dbFields);
        SETtableRows(data.dbRows);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (tableName) {
      fetchTableData(tableName);
    }
  }, [tableName]);

  const handleListSelect = (selectedTable: string) => {
    SETtableName(selectedTable);
  };

  return (
    <div>
      <h2>Edit Lists</h2>
      <div>
        <button onClick={() => handleListSelect("category")}>Category</button>
        <button onClick={() => handleListSelect("product")}>Product</button>
        <button onClick={() => handleListSelect("venue")}>Venue</button>
      </div>
      <h2>Content:</h2>
      {tableFields.length > 0 && (
        <DBTable dataContents={tableRows} fields={tableFields} />
      )}
    </div>
  );
}
