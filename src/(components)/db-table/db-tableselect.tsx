import { styles } from "../../helpersUniversal/tsStyles";

/* eslint-disable @typescript-eslint/no-unused-vars */
export type optionForDropdown = { value: number, label: string }

export default function TableSelect(props: { label: string, options: optionForDropdown[], selectedOption: number, onChange: unknown, cssClasses?: string }) {
    const options = props.options;
    const selectedOption = props.selectedOption;
    let optionKey = 0;
    return (
        <label>
            {props.label}:
            {/* <select
                options={options}
                value={options.find((option) => option.value === selectedOption)?.value}
                onChange={props.onChange}
            /> */}
            <select className={styles.select}>
                {options.map(option => { return (<option key={++optionKey}>{option.label}</option>) })}
            </select>
        </label>
    )
}