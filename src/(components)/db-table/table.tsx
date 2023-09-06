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
	defaultValue?: tableData;
	changeFunction?: (arg0: any) => void;
	listTable?: string;
	// url?: URL;
};
type fieldList = Map<string, field>;

// <> Define component props
type propsTable = {
	dataContents: tableData[][];
	fields: Map<string, field>;
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
	 * @param {string} matchID
	 * @param {string} labeltext
	 * @param {boolean} [disabled]
	 * @param {string} [cssClasses]
	 * @param {(arg0: any) => void} [onChange]
	 * @return {*} 
	 */
	function cellInput(contentsCell: tableData, typeCell: fieldType, matchID: string, labeltext: string, disabled?: boolean, cssClasses?: string, onChange?: (arg0: any) => void) {
		const classString = cssClasses + " " + styles.fields
		const keyID = matchID + '-input';
		// if(disabled===undefined){}
		switch (typeCell) {
			case undefined: return <td key={keyID} className={styles.roomy}></td>
			case 'boolean': return cellCheck(contentsCell as boolean, matchID, labeltext)
			case 'string':
				return <td key={keyID} className={styles.roomy} >
					<input key={keyID} name={keyID} id={keyID} defaultValue={contentsCell as string} className={classString} disabled={disabled} />
					<label key={keyID + '-label'} className="collapse" htmlFor={keyID}>{labeltext}</label>
				</td>;
			case "number": return <td key={keyID} className={styles.roomy} >
				<input type="number" key={keyID + '-input'} name={keyID} id={keyID} defaultValue={contentsCell as number} className={classString + ` w-min `} disabled={disabled} />
				<label key={keyID + '-label'} className="collapse" htmlFor={keyID}>{labeltext}</label>
			</td>;
			case 'list': return <td className={styles.roomy} key={keyID}> <TableSelect label={labeltext} options={[]} selectedOption={0} onChange={undefined} /> </td>;
			case 'list-multi': return <td className={styles.roomy} key={keyID}> {contentsCell} </td>;
			default: console.log(`Field type not implemented: ${typeCell}`); return <td key={keyID}></td>
		}

	}
	function cellCheck(value: boolean, matchID: string, labeltext: string) {
		const indexCell = matchID + '-check'
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

	function dataRow(indexRow: number, rowValues: tableData[], isEditing: boolean, fields: fieldList, cssClasses?: string) {
		const iterableFields = Array.from(fields.entries())
		if (isEditing) return editRow(indexRow, fields, false, rowValues, cssClasses)
		else return (<tr key={`row#${indexRow}`} className={cssClasses}>
			{/* Display cells */}
			{iterableFields.map(([fieldId, field], index) => {
				return cellDisplay(rowValues[index], fieldId, field.labelText)
			})}
			{editable && editButton(indexRow)}
		</tr>)
	}
	/**
	* A row containing appropriate fields for each column.  If it's an existing rowm the fields are populated with data.  If it's new...
	*/

	function editRow(indexRow: number, fields: fieldList, disabled?: boolean, rowValues?: tableData[], cssClasses?: string) {
		const iterable = Array.from(fields.entries())
		let newRow: tableData[]
		// If an existing record was passed in, populate the fields with it.
		if (rowValues) { newRow = rowValues; }
		// If nothing was passed in, then populate it with the default values of each field.
		else {
			newRow = Array.from(fields).map(val => { return val[1].defaultValue })
		}
		// Now that the data is all square, display it.
		let fieldCount = 0;
		if (!disabled) cssClasses += " border border-white";
		return (<tr key={indexRow} className={cssClasses}>
			{iterable.map((thisField, index) => {
				const [fieldName, fieldProfile] = thisField

				if (fieldName === "uid") return <td key={fieldCount++}>UID</td>
				return cellInput(newRow[index], fieldProfile.type, fieldName, fieldProfile.labelText);
			})}
			{submitCell(fieldCount)}
		</tr>)
	}

	function createRow(indexRow: number, fields: fieldList, cssClasses?: string) {
		let indexCell = 0;
		return (<tr key="createRow" className={cssClasses}>
			{Array.from(fields.entries()).map((thisField, index) => <td key={`row${indexRow}-col${index}`}></td>)}
			{buttonCell("New", () => selectForEdit(0), indexCell++)}
		</tr>)
	}


	// <>  Other prep steps for display

	// Turn the map of fields into 
	const dataHeaders = Array.from(fields.values());

	// <> Come back with the table
	return (
		<table className={`w-full table-auto ${props.cssClasses}`}>
			{tableHeader(dataHeaders.map(field => field.labelText))}
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