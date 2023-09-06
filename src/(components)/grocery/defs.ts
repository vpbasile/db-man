import { tableData, field } from "../db-table/table";

export const headersForPurchases = new Map<string, field>([
    ["product-name", { labelText: "Item", type: "list", order: 1 }],
    ["total-purchase-price", { labelText: "Total Price", type: "number", order: 2 }],
    ["unit-name", { labelText: "Unit", type: "string", order: 3 }],
    ["unit-count", { labelText: "Count", type: "number", order: 4 }],
    ["venue-name", { labelText: "Venue", type: "string", order: 5 }],
    ["purchase-date", { labelText: "Date", type: "string", order: 6 }],
    ["category-name", { labelText: "Category", type: "string", order: 7 }],
    ["purchase-id", { labelText: "UID", type: "uid", order: 8 }],
]);

export const spoofData: tableData[][] = [1, 2].map(row => {
    return Array.from(headersForPurchases, ([matchID, field]) => {
        return (`Row ${row} ${field.labelText}`);
    });
});
