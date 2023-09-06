/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { styles } from "../../helpersUniversal/tsStyles";

// <> Types used wihen working with tables
export type list = number;
export type listMulti = number;
export type tableData = undefined | string | number | boolean | list | listMulti;
export type fieldType = "string" | "number" | "boolean" | "list" | "list-multi" | "uid";
export type field = {
	matchID: string;
	labelText: string;
	type: fieldType;
	defaultValue?: tableData;
	changeFunction?: (arg0: any) => void;
	listTable?: string;
	// url?: URL;
};

// <> Define component props
type propsTable = {
	dataContents: tableData[][];
	fields: field[];
	editable?: boolean;
	newRowF?: (arg0: any) => void;
	// Pass down class
	cssClasses?: string;
}


export default function Table(props: propsTable) {
	//  <> Cache and initialize
	const data = props.dataContents;
	const editable = props.editable;
	const fields = props.fields;

	let indexRow = 1;


	// <> States
	const [isEditing, selectForEdit] = useState<number | null>(null)


	// ---------------------------------------------
	// <> Table helper functions
	// ---------------------------------------------
	// <> Functions for building the tables
	// function should(input: tableData): boolean {
	// 	if (typeof (input) !== "boolean") return false
	// 	else return input;
	// }

	// <> Various cells: Display, Checkbox, and buttons
	function cellDisplay(indexCell: string, contentsCell: tableData, matchID: string, labeltext: string) {
		if (typeof (contentsCell) === "boolean") return cellCheck(indexCell, contentsCell as boolean, matchID, labeltext)
		return <td className={styles.roomy} key={indexCell}> {contentsCell} </td>;
	}

	function cellInput(indexCell: string, contentsCell: tableData, typeCell: fieldType, matchID: string, labeltext: string, disabled?: boolean, cssClasses?: string, typingF?: (arg0: any) => void) {
		const classString = cssClasses + " " + styles.fields
		// if(disabled===undefined){}
		switch (typeCell) {
			case undefined: return <td key={indexCell} className={styles.roomy}></td>
			case 'boolean': return cellCheck(indexCell, contentsCell as boolean, matchID, labeltext)
			case 'string': return <td key={indexCell} className={styles.roomy} >
				<input key={indexCell + '-input'} name={matchID} id={matchID} defaultValue={contentsCell as string} className={classString} disabled={disabled} />
				<label key={indexCell + '-label'} className="collapse" htmlFor={matchID}>{labeltext}</label>
			</td>;
			case "number": return <td key={indexCell} className={styles.roomy} >
				<input type="number" key={indexCell + '-input'} name={matchID} id={matchID} defaultValue={contentsCell as number} className={classString + ` w-min `} disabled={disabled} />
				<label key={indexCell + '-label'} className="collapse" htmlFor={matchID}>{labeltext}</label>
			</td>;
			case 'list': return <td className={styles.roomy} key={indexCell}> {contentsCell} </td>;
			case 'list-multi': return <td className={styles.roomy} key={indexCell}> {contentsCell} </td>;
			default: console.log(`Field type not implemented: ${typeCell}`); return <td key={indexCell}></td>
		}

	}
	function cellCheck(indexCell: string, value: boolean, matchID: string, labeltext: string) {
		return <td key={indexCell}>
			<input type="checkbox" id={matchID} name={matchID} defaultChecked={value} />
			<label htmlFor={matchID} className="collapse">{labeltext}</label>
		</td>;
	}

	// <> Matching buttons
	function buttonCell(text: string, callbackF: () => void, key: number | string) {
		return <td key={key}><button className={styles.button} value={text} onClick={callbackF}>{text}</button></td>
	}
	function submitCell(key: string | number) {
		return <td key={key}><button className={styles.button} type="submit" onClick={() => {
			// props.newRowF(null)
			selectForEdit(null)
		}}>Submit</button></td>
	}
	function editButton(rowID: number) { return (buttonCell("Edit", () => selectForEdit(rowID), "edit")) }

	// <> Table rows
	function tableHeader(headers: tableData[]) {
		let numberColumn = 0;
		return (
			<thead>
				<tr>
					{headers.map(eachOne => { return (<th key={`header-col#${numberColumn++}`}>{eachOne}</th>) })}
				</tr>
			</thead>
		)
	}


	function displayRow(indexRow: number, rowValues: tableData[], isEditing: boolean, fields: field[], cssClasses?: string) {
		let indexCell = 0
		if (isEditing) return editRow(indexRow, fields, false, rowValues, cssClasses)
		else return (<tr key={`row#${indexRow}`} className={cssClasses}>
			{/* Display cells */}
			{rowValues.map((element, index) => {
				const thisField = fields[index];
				return cellDisplay(`cell#${indexRow}-${indexCell++}`, element, thisField.matchID, thisField.labelText);
			})}
			{editable && editButton(indexRow)}
		</tr>)
	}

	function editRow(indexRow: number, fields: field[], disabled?: boolean, rowValues?: tableData[], cssClasses?: string) {
		let newRow: tableData[]
		// If an existing record was passed in, populate the fields with it.
		if (rowValues) { newRow = rowValues; }
		// If nothing was passed in, then populate it with the default values of each field.
		else { newRow = fields.map(eachField => eachField.defaultValue) }
		// Now that the data is all square, display it.
		let fieldCount = 0;
		if (!disabled) cssClasses += " border border-white";
		return (<tr key={indexRow} className={cssClasses}>
			{fields.map((thisField, index) => {
				if (thisField.type === "uid") return <td key={fieldCount++}>UID</td>
				return cellInput(`cell-${fieldCount++}`, newRow[index], thisField.type, thisField.matchID, thisField.labelText);
			})}
			{submitCell(fieldCount)}
		</tr>)
	}

	function createRow(indexRow: number, fields: field[], cssClasses?: string) {
		let indexCell = 0;
		return (<tr key="createRow" className={cssClasses}>
			{fields.map((thisField, index) => <td key={`row${indexRow}-col${indexCell++}`}></td>)}
			{buttonCell("New", () => selectForEdit(0), indexCell++)}
		</tr>)
	}


	// <>  Other prep steps for display

	const dataHeaders = fields.map((eachField) => { return (eachField.labelText) })

	// <> Come back with the table
	return (
		<table className={`w-full table-auto ${props.cssClasses}`}>
			{tableHeader(dataHeaders)}
			<tbody>
				{data.map((contentsRow) => {
					const numIndex = indexRow++;
					let cssClasses = ""
					if (numIndex % 2 === 0) { cssClasses += "bg-slate-900" }  // Make this tranlucent
					return displayRow(numIndex, contentsRow, (numIndex === isEditing), fields, cssClasses);
				})}
				{(isEditing === null && editable) && createRow(0, fields)}
				{(isEditing === 0 && editable) && editRow(indexRow, fields)}
			</tbody>
		</table>
	);
}