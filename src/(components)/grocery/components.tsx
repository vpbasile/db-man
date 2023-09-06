import { useState, useEffect } from "react";
import { styles } from "../../helpersUniversal/tsStyles";

type categoryDef = { category_id: string, category_name:string }

function CategoryUI() {
    const [categories, setCategories] = useState<categoryDef[]>();
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/categories")
            .then(response => response.json())
            .then(data => setCategories(data.dbRows))
            .catch(error => console.error(error));
    }, []);

    const handleAddCategory = () => {
        fetch("http://localhost:8000/categories/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category_name: newCategory }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Refresh the list of categories
                fetchCategories();
            })
            .catch(error => console.error(error));
    };

    const handleDeleteCategory = (category_id: string) => {
        fetch(`http://localhost:8000/categories/${category_id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Refresh the list of categories
                fetchCategories();
            })
            .catch(error => console.error(error));
    };

    const fetchCategories = () => {
        fetch("http://localhost:8000/categories")
            .then(response => response.json())
            .then(data => setCategories(data.dbRows))
            .catch(error => console.error(error));
    };

    return (
        <div className={styles.bubble + styles.spacious}>
            <h2>Categories</h2>
            <ul>
                {categories && categories.map(category => (
                    <li key={category.category_id}>
                        {category.category_name}
                        <button onClick={() => handleDeleteCategory(category.category_id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="New category name"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
        </div>
    );
}

export default CategoryUI;
