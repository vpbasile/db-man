/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { styles } from "../../helpersUniversal/tsStyles";
import Table, { field, tableData } from "../db-table/table";

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
    <div className={styles.bubble + styles.spacious}>
      <h2>Edit Lists</h2>
      <div>
        <button className={styles.button} onClick={() => handleListSelect("category")}>Category</button>
        <button className={styles.button} onClick={() => handleListSelect("product")}>Product</button>
        <button className={styles.button} onClick={() => handleListSelect("venue")}>Venue</button>
      </div>
      <h2>Content:</h2>
      {tableFields.length > 0 && (
        <Table dataContents={tableRows} fields={tableFields} />
      )}
    </div>
  );
}
