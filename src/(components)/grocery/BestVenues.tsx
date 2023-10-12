import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import DBTable, { fieldTuple } from "../db-man/DBTable";
import { headersForPurchases, purchaseType, purchasesToTable, spoofData } from "./defs";
import DisplayAnything from "../db-man/displayAnything";

export default function BestVenues() {

    // <> Step 1 - Define types
    type dbResponse = {
        serverUpSince: string;
        baseURL: string;
        tableName: string;
        rowsReturned: number;
        dbFields: fieldTuple[];
        dbRows: purchaseType[];
    };

    const [tableFields, SETtableFields] = useState<fieldTuple[]>(headersForPurchases)
    const [tableRows, SETtableRows] = useState(spoofData);
    const [holder, SETholder] = useState("")
    const DBURL = "http://localhost:8000/whereToGo"
    const queryDB = (DBURL: string): void => {
        console.log(("Attempting to send query to " + DBURL));
        fetch(DBURL).then(response => response.json()).then(
            (data: dbResponse) => {
                SETholder(JSON.stringify(data.dbRows))
                console.log("Response from server", data)
                console.log("holder", holder)
                SETtableFields(data.dbFields)
                SETtableRows(data.dbRows)
            }
        ).catch(error => {
            console.log(error);
        }
        );

    }
    if (tableRows === spoofData) { queryDB(DBURL); }



    return (<Box>
        <Heading as={'h2'}>Groceries</Heading>
        {/* <DBTable dataContents={(tableRows)} fields={tableFields} editable={false} /> */}
        <DisplayAnything data={tableRows} />
    </Box>)
}