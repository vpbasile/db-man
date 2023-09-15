import { useState } from "react";
import { styles } from "../../helpersUniversal/tsStyles";
import Table, { fieldTuple, handlerTuple, mysteryObject } from "../db-man/table";
import { spoofData, headersForPurchases, purchasesToTable, purchaseType } from "./defs";
import { optionForDropdown } from "../db-man/db-tableselect";

export default function DisplayPurchase() {


	// <> Step 1 - Define types
	type dbResponse = {
		serverUpSince: string;
		baseURL: string;
		tableName: string;
		rowsReturned: number;
		dbFields: fieldTuple[];
		dbRows: purchaseType[];
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
				console.log("Response from server", data)
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

	function setTempData(rowid: number): void {
		// console.log(`Setting temp data from row ${rowid}`)
		const rowToCopy = tableRows[rowid];
		// console.log(`RowToCopy`, rowToCopy)
		//Take the selected record and put it's values into the temp items
		SETselectedProduct(+rowToCopy.product_id);
		SETenteredPrice(rowToCopy.total_purchase_price)
		SETcount(rowToCopy.unit_count)
		// SETselectedVenue(rowToCopy.venue_name)
		SETpurchaseDate(rowToCopy.Purchase_date as string)
	}

	const handlerBundle: handlerTuple[] = [
		["product_id", { state: selectedProduct, setter: SETselectedProduct, translator: translateChoices }],
		["total_purchase_price", { state: enteredPrice, setter: SETenteredPrice }],
		["unit_count", { state: count, setter: SETcount }],
		["venue_name", { state: selectedVenue, setter: SETselectedVenue, translator: translateChoices }],
		["purchase_date", { state: purchaseDate, setter: SETpurchaseDate }],
	]

	// ---------------------------------------------
	// <> Translation functions
	// ---------------------------------------------
	function translateChoices(fieldName: string, choices: mysteryObject[]): optionForDropdown[] {
		switch (fieldName) {
			case "product_id": return choices.map((eachChoice) => { return ({ value: eachChoice.product_id as number, label: eachChoice.product_name as string }) })
			case "venue_name": return choices.map((eachChoice) => { return ({ value: eachChoice.venue_id as number, label: eachChoice.venue_name as string }) })
			case "category_name": return choices.map((eachChoice) => { return ({ value: eachChoice.category_id as number, label: eachChoice.category_name as string }) })
			default: return [{ value: 0, label: "label" }]
		}

	}

	// ---------------------------------------------
	// <> Main Loop
	// ---------------------------------------------
	// ---------------------------------------------
	// <> FIXME - Need to start working with JSON-only on the fromt end.  The table translation should only happen inside the table component.
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
		<Table dataContents={purchasesToTable(tableRows)} fields={tableFields} handlers={handlerBundle} editable={true} setTempData={setTempData} />
	</div>)

}