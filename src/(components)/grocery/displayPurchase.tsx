import { useState } from "react";
import { styles } from "../../helpersUniversal/tsStyles";
import Table, { fieldTuple, handlerTuple, mysteryObject, tableData } from "../db-table/table";
import { spoofData, headersForPurchases } from "./defs";
import { optionForDropdown } from "../db-table/db-tableselect";

export default function DisplayPurchase() {
	// <> Step 1 - Define types
	type dbResponse = {
		serverUpSince: string;
		baseURL: string;
		tableName: string;
		rowsReturned: number;
		dbFields: fieldTuple[];
		dbRows: tableData[][];
	};

	// ---------------------------------------------
	// <> Step 2 - Initialize some values
	// ---------------------------------------------

	// States for storage and display

	const [tableFields, SETtableFields] = useState<fieldTuple[]>(headersForPurchases)
	const [tableRows, SETtableRows] = useState(spoofData);
	const DBURL = "http://localhost:8000/purchase"
	const queryDB = (DBURL: string): void => {
		console.log(("Attempting to send query to " + DBURL));
		fetch(DBURL).then(response => response.json()).then(
			(data: dbResponse) => {
				// console.log("Response from server", data)
				SETtableFields(data.dbFields)
				SETtableRows(data.dbRows)
			}
		).catch(error => {
			console.log(error);
		}
		);

	}

	// Temp values for handling value selection
	const [selectedProduct, SETselectedProduct] = useState<number>(0);
	const [enteredPrice, SETenteredPrice] = useState<number>(0);
	const [count, SETcount] = useState<number>(0);
	const [selectedVenue, SETselectedVenue] = useState<number>(0);
	const [purchaseDate, SETpurchaseDate] = useState<string>("");
	const [selectedCategory, SETselectedCategory] = useState<number>(0);



	const handlerBundle: handlerTuple[] = [
		["product_name", { state: selectedProduct, setter: SETselectedProduct, translator: translateChoices }],
		["total_purchase_price", { state: enteredPrice, setter: SETenteredPrice }],
		["unit_count", { state: count, setter: SETcount }],
		["venue_name", { state: selectedVenue, setter: SETselectedVenue, translator: translateChoices }],
		["purchase_date", { state: purchaseDate, setter: SETpurchaseDate }],
		["category_name", { state: selectedCategory, setter: SETselectedCategory, translator: translateChoices }],
	]

	// ---------------------------------------------
	// <> Translation functions
	// ---------------------------------------------
	function translateChoices(fieldName: string, choices: mysteryObject[]): optionForDropdown[] {
		console.log(`Translating ${fieldName}`)
		switch (fieldName) {
			case "product_name": return choices.map((eachChoice) => { return ({ value: eachChoice.product_id as number, label: eachChoice.product_name as string }) })
			case "venue_name": return choices.map((eachChoice) => { return ({ value: eachChoice.venue_id as number, label: eachChoice.venue_name as string }) })
			case "category_name": return choices.map((eachChoice) => { return ({ value: eachChoice.category_id as number, label: eachChoice.category_name as string }) })
			default: return [{ value: 0, label: "label" }]
		}

	}

	// ---------------------------------------------
	// <> Main Loop
	// ---------------------------------------------
	// ---------------------------------------------
	// <> From ChatGPT:
	//   Conditional Fetching: You are conditionally fetching data if tableRows is equal to spoofData. 
	// While this works, it might be clearer to directly fetch the data unconditionally using an useEffect hook with an empty dependency array.
	// ---------------------------------------------
	if (tableRows === spoofData) { queryDB(DBURL); }

	// ---------------------------------------------
	// <> Main return
	// ---------------------------------------------
	return (<div className={styles.bubble + styles.spacious}>
		<h2>Groceries</h2>
		<Table dataContents={tableRows} fields={tableFields} handlers={handlerBundle} editable={false} />
	</div>)
}