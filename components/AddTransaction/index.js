import { useState } from "react";
import styles from "./addTransaction.module.scss";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = { amount, description, tag, date };

    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }

    if (res.ok) {
      setError(null);
      setAmount("");
      setDescription("");
      setTag("");
      setDate("");
    }
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label>Amount</label>
        <input
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />

        <label>Description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <label>Tag</label>
        <input
          type="text"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />

        <label>Date</label>
        <input
          type="text"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />

        <button>Add Transaction</button>
      </form>
    </div>
  );
}
