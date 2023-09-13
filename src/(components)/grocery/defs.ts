/* eslint-disable @typescript-eslint/no-unused-vars */
import { tableData, fieldTuple } from "../db-table/table";

export const headersForPurchases: fieldTuple[] = ([
    ["something-name", { labelText: "Database", type: "list", order: 1, matchID: "something" }],
    ["total-nothing-price", { labelText: "Query", type: "number", order: 2, matchID: "nothing" }],
    ["third-name", { labelText: "Failed", type: "list", order: 3, matchID: "third" }],
]);

export const spoofData: tableData[][] = [1, 2].map(row => {
    return Array.from(headersForPurchases, ([, field]) => {
        return (`Row ${row} ${field.labelText}`);
    });
});
