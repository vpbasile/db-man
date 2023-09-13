import { styles } from "../../helpersUniversal/tsStyles";
import { fieldTuple, mysteryObject, optionTranslator, setter } from "./table";

/* eslint-disable @typescript-eslint/no-unused-vars */
export type optionForDropdown = { value: number, label: string }

type propsType = {
    field: fieldTuple;
    selectedOption: number;
    onChange: setter;
    translator: optionTranslator;
    cssClasses?: string;
};

export default function ListSelect(props: propsType) {
    const tuple = props.field
    const matchID = tuple[0]
    // console.log('Rendering select list for ' + matchID)
    const fieldDef = tuple[1]
    const options: mysteryObject[] = fieldDef.choices as mysteryObject[]
    const translator = props.translator

    const selectedOption = props.selectedOption;
    const translatedOptions = translator(matchID, options)
    let i = 0;
    return (
        <>
            <label className="hidden" htmlFor={matchID}>
                {fieldDef.labelText}:
            </label>
            <select name={matchID} className={styles.select} onChange={(e) => {
                console.log(`Selected ${matchID}: ${e.target.value}`)
                console.log(`onchange`,onchange)
                // onchange(e.target.value)
            }}>
                {translatedOptions.map(option => {
                    // console.log("option", option)
                    // console.log(`Field ${matchID}`, "Option", option)

                    return (<option key={++i} value={option.value as number} defaultValue={selectedOption}>{option.label}</option>)
                })}
            </select>
        </>
    )
}