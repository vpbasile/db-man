import { tableData, field } from "../db-table/table";

export const spoofData: tableData[][] = [
    ["---", "---", "---"], ["---", "---", "---"]
];

export const headersForPurchases: field[] = [
    { matchID: "product_name", labelText: "Item", type: "string" },
    { matchID: "total_purchase_price", labelText: "Total Price", type: "number" },
    { matchID: "unit_name", labelText: "Unit", type: "string" },
    { matchID: "unit_count", labelText: "Count", type: "number" },
    { matchID: "venue_name", labelText: "Venue", type: "string" },
    { matchID: "purchase_date", labelText: "Date", type: "string" },
    { matchID: "category_name", labelText: "Category", type: "string" },
    { matchID: "purchase_id", labelText: "UID", type: "uid" },
];