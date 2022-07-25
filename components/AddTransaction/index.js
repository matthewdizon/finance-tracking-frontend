import { useState } from "react";
import styles from "./addTransaction.module.scss";

export default function AddTransaction({ fetchTransactions }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Expense");
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
      fetchTransactions();
    }
  };

  return (
    <div className={styles.addContainer}>
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
        {/* in the future, change this to get all the options set from the backend */}
        {/* enum: ["Expense", "Investment", "Income", "Transfer", "Savings"], */}
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
          <option value="Investment">Investment</option>
          <option value="Transfer">Transfer</option>
          <option value="Savings">Savings</option>
        </select>

        <label>Date</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />

        <button>Add Transaction</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
