import { useState } from "react";
import styles from "./addWallet.module.scss";

export default function AddWallet({ fetchWallets }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wallet = { name, amount, description };

    const res = await fetch("/api/wallets", {
      method: "POST",
      body: JSON.stringify(wallet),
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
      setName("");
      setAmount("");
      setDescription("");
      fetchWallets();
    }
  };

  return (
    <div className={styles.addContainer}>
      <h2>Add Wallet</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>Amount</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />

        <label>Description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <button>Add Wallet</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
