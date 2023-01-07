import { useEffect } from "react";
import { useState } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.scss";

const Products = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://redux-cart-95126-default-rtdb.firebaseio.com/books-list.json"
      );

      if (!response.ok) {
        throw new Error("Failed to Fetch Meal!");
      }
      const responseData = await response.json();
      const loadedBooks = [];
      for (const key in responseData) {
        loadedBooks.push({
          id: key,
          title: responseData[key].title,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setBooks(loadedBooks);
    };
    fetchBooks().catch(() => {
      throw new Error("Failed to Fetch Meal!");
    });
  }, []);

  return (
    <section className={styles.products}>
      <h2>Buy your favorite books</h2>
      <ul>
        {books.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
