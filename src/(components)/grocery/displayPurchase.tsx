import { useState } from "react";
import { styles } from "../../helpersUniversal/tsStyles";
import Table from "../db-table/table";
import { spoofData, headersForPurchases } from "./defs";

export default function DisplayPurchase() {
	// <> Step 1 - Define types

	// ---------------------------------------------
	// <> Step 2 - Initialize some values
	// ---------------------------------------------


	// States for storage and display

	const [tableFields, SETtableFields] = useState(headersForPurchases)
	const [tableRows, SETtableRows] = useState(spoofData);
	const DBURL = "http://localhost:8000/purchase"
	const queryDB = (DBURL: string): void => {
		console.log(("Attempting to send query to " + DBURL));
		fetch(DBURL).then(response => response.json()).then(
			data => {
				SETtableFields(data.dbFields)
				SETtableRows(data.dbRows)
			}
		)

			.catch(error => {
				console.log(error);
			}
			);
	}

	// ---------------------------------------------
	// <> Main Loop
	// ---------------------------------------------
	// ---------------------------------------------
	// <> From ChatGPT:
	//   Conditional Fetching: In the "Main Loop" section, you are conditionally fetching data if tableRows is equal to spoofData. While this works, it might be clearer to directly fetch the data unconditionally using an useEffect hook with an empty dependency array.
	// ---------------------------------------------
	if (tableRows === spoofData) { queryDB(DBURL); }

	// ---------------------------------------------
	// <> Main return
	// ---------------------------------------------
	return (<div className={styles.bubble + styles.spacious}>
		<h2>Groceries</h2>
		<Table dataContents={tableRows} fields={tableFields} />
	</div>)
}