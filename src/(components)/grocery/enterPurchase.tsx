import { useState } from "react";
import { styles } from "../../helpersUniversal/tsStyles";
import { eType } from "../../helpersUniversal/usefulTypes";
import TableSelect, { optionForDropdown } from "../db-table/db-tableselect";
import Table from "../db-table/table";
import { headersForPurchases, spoofData } from "./defs";
// https://tailwind-elements.com/docs/standard/forms/select/



export default function EnterPurchase() {
    function translateProducts(data: {
        product_id: number, product_name: string
    }[]) {
        const newArray = data.map(row => { return { value: row.product_id, label: row.product_name } })
        return newArray
    }


    const spoofProducts = translateProducts(
        [{ product_id: 1, product_name: "string" }, { product_id: 2, product_name: "More string" }]
    )

    // States to hold retrieved data
    const [venueOptions, SETvenueOptions] = useState<optionForDropdown[]>([]);
    const [productOptions, SETproductOptions] = useState<optionForDropdown[]>(spoofProducts);
    const BASEURL = "http://localhost:8000"
    function queryDB(DBURL: string): void {
        let tableName = 'product'; let URL = DBURL + "/" + tableName;
        console.log(("Attempting to send query to " + URL));
        fetch(URL).then(response => response.json()).then(data => {
            // SETvenueOptions(data.dbRows);
        }).catch(error => { console.log(error); });
        tableName = 'product', URL = DBURL + "/" + tableName;
        console.log(("Attempting to send query to " + URL));
        fetch(URL).then(response => response.json()).then(data => {
            console.log(data.dbRows);
            SETproductOptions(data.dbRows);
        }).catch(error => {
            console.log(error);
        });

    }


    // Define state variables for form inputs.
    const [selectedProduct, setSelectedProduct] = useState<number>(0);
    const [selectedVenue, setSelectedVenue] = useState<number>(0);
    const [totalPurchasePrice, setTotalPurchasePrice] = useState<number>();
    // Add state variables for other form fields.


    const handleProductChange = (selectedOption: optionForDropdown) => {
        setSelectedProduct(selectedOption.value);
    };

    const handleVenueChange = (selectedOption: optionForDropdown) => {
        setSelectedVenue(selectedOption.value);
    };


    // Handle form submission.
    const handleSubmit = (e: eType) => {
        e.preventDefault();

        // Create a new purchase object with form data.
        const newPurchase = {
            product: selectedProduct,
            total_purchase_price: totalPurchasePrice,
            venue: selectedVenue,
            // Include other form fields here.
        };

        // Send a POST request to your backend API to add the purchase.
        // You can use the fetch or axios library for this.

        // Optionally, you can reset the form fields after submission.

        // setTotalPurchasePrice("");
        // Reset other form fields.
    };

    let headersWithLists = [...headersForPurchases]


    return (
        <div className={styles.bubble + styles.spacious}>
            <h2>Add New Purchase</h2>
            <form
            // onSubmit={handleSubmit}
            >
                {/* Create form fields for input */}
                {/* <label>
                    Total Price:
                    <input
                        type="number"
                        value={totalPurchasePrice}
                        onChange={(e: eType) => setTotalPurchasePrice(e.target.value)}
                    />
                </label> */}

                <Table dataContents={spoofData} fields={headersWithLists} editable={true} />


                <TableSelect label={"Product"} options={productOptions} selectedOption={selectedProduct} onChange={handleProductChange} />
                {/* Add form fields for other input fields. */}
                <button type="submit">Add Purchase</button>
            </form>
        </div>
    );
}  