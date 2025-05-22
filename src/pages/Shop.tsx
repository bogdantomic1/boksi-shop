import { useState } from "react";
import '../css/Shop.css';

import SearchTable from "../components/SearchTable";
import Cart from "../components/Cart";
import CheckoutPopup from "../components/CheckoutPopup";

export  interface Article {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const articles: Article[] = [
  { id: 1, name: "Sneakers", price: 59.99, stock: 10 },
  { id: 2, name: "Backpack", price: 39.99, stock: 5 },
  { id: 3, name: "Jacket", price: 79.99, stock: 3 },
  { id: 4, name: "T-Shirt", price: 19.99, stock: 15 },
];

export default function Shop() {
  const [cartItems, setCartItems] = useState<Map<number, number>>(new Map());
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Add item to cart or increase qty
  function addToCart(articleId: number) {
    setCartItems((prev) => {
      const newMap = new Map(prev);
      const currentQty = newMap.get(articleId) ?? 0;
      const article = articles.find((a) => a.id === articleId);
      if (!article) return prev;
      if (currentQty < article.stock) {
        newMap.set(articleId, currentQty + 1);
      }
      return newMap;
    });
  }

  // Update quantity in cart (set to zero to remove)
  function updateCartQty(articleId: number, qty: number) {
    setCartItems((prev) => {
      const newMap = new Map(prev);
      if (qty <= 0) {
        newMap.delete(articleId);
      } else {
        const article = articles.find((a) => a.id === articleId);
        if (!article) return prev;
        newMap.set(articleId, Math.min(qty, article.stock));
      }
      return newMap;
    });
  }

  // Clear cart on successful checkout
  function clearCart() {
    setCartItems(new Map());
  }

  // Calculate total price of cart
  const total = Array.from(cartItems.entries()).reduce((sum, [id, qty]) => {
    const article = articles.find((a) => a.id === id);
    if (!article) return sum;
    return sum + article.price * qty;
  }, 0);

  return (
    <div className="container">
      <div style={{ flex: 2 }}>
        <SearchTable articles={articles} addToCart={addToCart} />
      </div>

      <div style={{ flex: 1 }}>
        <Cart
          cartItems={cartItems}
          articles={articles}
          updateCartQty={updateCartQty}
          total={total}
          onCheckout={() => setCheckoutOpen(true)}
        />
      </div>

      {checkoutOpen && (
        <CheckoutPopup
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={() => {
            alert("Checkout successful!");
            clearCart();
            setCheckoutOpen(false);
          }}
        />
      )}
    </div>
  );
}
