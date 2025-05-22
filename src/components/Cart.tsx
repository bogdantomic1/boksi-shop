import "../css/Cart.css";

interface CartProps {
  cartItems: Map<number, number>;
  articles: Article[];
  updateCartQty: (id: number, qty: number) => void;
  total: number;
  onCheckout: () => void;
}
interface Article {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function Cart({ cartItems, articles, updateCartQty, total, onCheckout }: CartProps) {
  return (
    <div className="cart-container">
      <h2>Cart</h2>

      {cartItems.size === 0 && <p>Your cart is empty.</p>}

      {Array.from(cartItems.entries()).map(([id, qty]) => {
        const article = articles.find((a) => a.id === id);
        if (!article) return null;
        return (
          <div key={id} className="cart-item">
            <div className="cart-item-name">
              {article.name} (${article.price.toFixed(2)})
            </div>
            <div>
              <input
                className="cart-input"
                type="number"
                min={0}
                max={article.stock}
                value={qty}
                onChange={(e) => updateCartQty(id, Number(e.target.value))}
              />
            </div>
          </div>
        );
      })}

      {cartItems.size > 0 && (
        <>
          <hr />
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
          <button className="cart-checkout-button" onClick={onCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
