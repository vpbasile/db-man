/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { styles } from "../../helpersUniversal/tsStyles";
import TableSelect from "./db-tableselect";

// <> Types used wihen working with tables
export type list = number;
export type listMulti = number;
export type tableData = undefined | string | number | boolean | list | listMulti;
export type fieldType = "string" | "number" | "boolean" | "list" | "list-multi" | "uid";
export type field = {
	labelText: string;
	type: fieldType;
	order: number;
	matchID:string;
	defaultValue?: tableData;
	changeFunction?: (arg0: any) => void;
	listTable?: string;
	// url?: URL;
};
export type fieldTuples = [string,field][];

// <> Define component props
type propsTable = {
	dataContents: tableData[][];
	fields: fieldTuples;
	editable?: boolean;
	newRowF?: (arg0: any) => void;
	// Pass down class
	cssClasses?: string;
}


export default function Table(props: propsTable) {
	//  <> Cache and initialize
	const data = props.dataContents;
	const editable = props.editable;
	const fields: fieldTuples = props.fields;

	let indexRow = 1;


	// <> States
	const [isEditing, selectForEdit] = useState<number | null>(null)


	// ---------------------------------------------
	// <> Table helper functions
	// ---------------------------------------------

	// <> Various cells: Display, Checkbox, and buttons
	function cellDisplay(contentsCell: tableData, matchID: string, labeltext: string) {
		if (typeof (contentsCell) === "boolean") return cellCheck(contentsCell as boolean, matchID, labeltext)
		return <td className={styles.roomy} key={matchID}> {contentsCell} </td>;
	}
	/**
	* A cell for inputting data appropriately
	 *
	 *
	 * @param {tableData} contentsCell
	 * @param {fieldType} typeCell
	 * @param {string} matchID - String that's the uid of the field
	 * @param {string} labeltext
	 * @param {boolean} [disabled]
	 * @param {string} [cssClasses]
	 * @param {(arg0: any) => void} [_onChange]
	 * @return {*} 
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function cellInput(contentsCell: tableData, typeCell: fieldType, matchID: string, labeltext: string, disabled?: boolean, cssClasses?: string, _onChange?: (arg0: any) => void) {
		const classString = cssClasses + " " + styles.blueInput
		const keyID = matchID + '-input';
		console.log("matchID", matchID, "type", typeCell, "contentsCell", contentsCell)
		// if(disabled===undefined){}
		switch (typeCell) {
			case undefined: return <td key={keyID} className={styles.roomy}></td>
			case 'boolean': return cellCheck(contentsCell as boolean, matchID, labeltext)
			case "number": return <td key={keyID} className={styles.roomy} >
				<input type="number" key={keyID + '-input'} name={keyID} id={keyID} defaultValue={contentsCell as number} className={classString} disabled={disabled} />
				<label key={keyID + '-label'} className="hidden" htmlFor={keyID}>{labeltext}</label>
			</td>;
			case 'list': {
				console.log("Select list")
				return <td className={styles.roomy} key={keyID}><TableSelect label={labeltext} options={[]} selectedOption={0} onChange={undefined} /> </td>;
			}
			case 'list-multi': return <td className={styles.roomy} key={keyID}>{contentsCell} </td>;
			case 'uid': return <td key={keyID} className="">{contentsCell}</td>
			case 'string': return <td key={keyID} className={styles.roomy} >
					<input key={keyID} name={keyID} id={keyID} defaultValue={contentsCell as string} className={classString} disabled={disabled} />
					<label key={keyID + '-label'} className="hidden" htmlFor={keyID}>{labeltext}</label>
				</td>;
			default: console.log(`Field type not implemented: ${typeCell}`); return <td key={keyID}></td>
		}

	}
	function cellCheck(value: boolean, matchID: string, labeltext: string) {
		const indexCell = matchID + '-check'
		return <td key={indexCell}>
			<input type="checkbox" id={matchID} name={matchID} defaultChecked={value} />
			<label htmlFor={matchID} className="hidden">{labeltext}</label>
		</td>;
	}

	// <> Matching buttons
	function cellButton(text: string, callbackF: () => void, key: number | string) {
		return <td key={key}><button className={styles.button} value={text} onClick={callbackF}>{text}</button></td>
	}
	function cellSubmit(key: string | number) {
		return <td key={key}><button className={styles.button} type="submit" onClick={() => {
			// props.newRowF(null)
			selectForEdit(null)
		}}>Submit</button></td>
	}
	function cellEditButton(rowID: number) { return (cellButton("Edit", () => selectForEdit(rowID), "edit")) }

	// <> Table rows
	function tableHeader(headers: tableData[]) {
		// console.log("headers", headers)
		return (
			<thead>
				<tr>
					{headers.map(eachOne => { return (<th key={`header-${eachOne}`} className="text-left">{eachOne}</th>) })}
				</tr>
			</thead>
		)
	}

	function dataRow(indexRow: number, rowValues: tableData[], isEditing: boolean, fields: fieldTuples, cssClasses?: string) {
		const iterableFields = Array.from(fields.entries())
		if (isEditing) return editRow(indexRow, fields, false, rowValues, cssClasses)
		else return (<tr key={`row#${indexRow}`} className={cssClasses}>
			{/* Display cells */}
			{iterableFields.map(([index, tuple]) => {
				return cellDisplay(rowValues[index], tuple[0], tuple[1].labelText)
			})}
			{editable && cellEditButton(indexRow)}
		</tr>)
	}
	/**
	* A row containing appropriate fields for each column.  If it's an existing rowm the fields are populated with data.  If it's new...
	*/

	function editRow(indexRow: number, fields: fieldTuples, disabled?: boolean, rowValues?: tableData[], cssClasses?: string) {
		console.log("fields", fields)
		const iterable = Array.from(fields.entries())
		console.log("iterable", iterable)
		let newRow: tableData[]
		// If an existing record was passed in, populate the fields with it.
		if (rowValues) { newRow = rowValues; }
		// If nothing was passed in, then populate it with the default values of each field.
		else {
			newRow = iterable.map(val => { return val[1][1].defaultValue })
		}
		// Now that the data is all square, display it.
		let fieldCount = 0;
		if (!disabled) cssClasses += " border border-white";
		return (<tr key={indexRow} className={cssClasses}>
			{iterable.map((thisField) => {
				const [fieldIndex, [fieldName, fieldProfile]] = thisField

				if (fieldName === "uid") return <td key={fieldCount++}>UID</td>
				return cellInput(newRow[fieldIndex], fieldProfile.type, fieldName, fieldProfile.labelText);
			})}
			{cellSubmit(fieldCount)}
		</tr>)
	}

	function createRow(indexRow: number, fields: fieldTuples, cssClasses?: string) {
		let indexCell = 0;
		return (<tr key="createRow" className={cssClasses}>
			{Array.from(fields.entries()).map((_thisField, index) => <td key={`row${indexRow}-col${index}`}></td>)}
			{cellButton("New", () => selectForEdit(0), indexCell++)}
		</tr>)
	}
	const fieldNames:string[] = [...fields.entries()].map((thisField) => { return (thisField[1][1].labelText) })
	// console.log("fields", fields, "fieldNames", fieldNames)
	// <> Come back with the table
	return (
		<table className={`w-full table-auto ${props.cssClasses}`}>
			{tableHeader(fieldNames)}

			<tbody>
				{data.map((contentsRow) => {
					const numIndex = indexRow++;
					let cssClasses = ""
					if (numIndex % 2 === 0) { cssClasses += "bg-slate-900" }  // Make this tranlucent
					return dataRow(numIndex, contentsRow, (numIndex === isEditing), fields, cssClasses);
				})}
				{(isEditing === null && editable) && createRow(0, fields)}
				{(isEditing === 0 && editable) && editRow(indexRow, fields)}
			</tbody>
		</table>
	);
}