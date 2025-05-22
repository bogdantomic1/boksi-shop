import { useState } from "react";
import "../css/CheckoutPopup.css";
interface CheckoutPopupProps {
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CheckoutPopup({ total, onClose, onConfirm }: CheckoutPopupProps) {
  const [paid, setPaid] = useState("");

  const paidNum = parseFloat(paid);
  const change = paidNum >= total ? paidNum - total : 0;
  const canConfirm = paidNum >= total;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Checkout</h2>
        <p>Total to pay: <b>${total.toFixed(2)}</b></p>

        <label>
          Amount paid:
          <input
            type="number"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            className="input-paid"
            min={0}
          />
        </label>

        {paid && paidNum < total && (
          <p className="error-text">Amount paid must be at least total</p>
        )}

        {paid && canConfirm && (
          <p>Change to return: <b>${change.toFixed(2)}</b></p>
        )}

        <div className="popup-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className={`btn-confirm ${canConfirm ? "" : "disabled"}`}
            onClick={onConfirm}
            disabled={!canConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
