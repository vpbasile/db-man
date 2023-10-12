/* eslint-disable @typescript-eslint/no-unused-vars */
import { tableData, fieldTuple } from "../db-man/DBTable";

export type dbRowsType = { [key: string]: tableData }[];
export type purchaseType = {
    product_id: number;
    total_purchase_price: number;
    unit_name: string;
    unit_count: number;
    venue_name: string;
    Purchase_date: string;
    purchase_id: string;
}

export const headersForPurchases: fieldTuple[] = ([
    ["product_name", { labelText: "Item", type: "list", order: 1, matchID: "product-list", listTable: "product", displayKey: "product_name" }],
    ["total_purchase_price", { labelText: "Total Price", type: "number", order: 2, matchID: "total-price" }],
    ["unit_name", { labelText: "Unit", type: "lookedUp", order: 3, matchID: "unit-name" }],
    ["unit_count", { labelText: "Count", type: "number", order: 4, matchID: "unit-count" }],
    ["venue_name", { labelText: "Venue", type: "list", order: 5, matchID: "venue-list", listTable: "venue", displayKey: "venue_name" }],
    ["purchase_date", { labelText: "Date", type: "string", order: 6, matchID: "purchase-date" }],
    ["category_name", { labelText: "Category", type: "list", order: 7, matchID: "category", listTable: "category", displayKey: "category_name" }],
    ["purchase_id", { labelText: "UID", type: "uid", order: 8, matchID: "purchase-id" }],
]);

export const spoofData: purchaseType[] = [1, 2].map(rowNum => {
    return {
        product_id: 1,
        total_purchase_price: 0.20,
        unit_name: "Database query",
        unit_count: rowNum,
        venue_name: "failed",
        Purchase_date: '2023-08-23',
        purchase_id: "fieldName"
    }
});

export function purchasesToTable(datastate: dbRowsType): tableData[][] {
    return datastate.map((row) => {
        return ([
            row.p,
            row.total_purchase_price,
            row.unit_name,
            row.unit_count,
            row.venue_name,
            row.purchase_date,
            row.category_name,
            row.purchase_id,
        ])
    })
}