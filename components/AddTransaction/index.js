import { useEffect, useState } from "react";
import styles from "./addTransaction.module.scss";
import { useRouter } from "next/router";

export default function AddTransaction({ wallets }) {
  const router = useRouter();

  const curr = new Date();
  curr.setDate(curr.getDate() + 3);
  const today = curr.toISOString().substring(0, 10);

  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Expense");
  const [date, setDate] = useState(today);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSelectedWallet(wallets[0]._id);
  }, [wallets]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = { amount, description, tag, date, selectedWallet };

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
      setTag("Expense");
      setSelectedWallet(wallets[0]._id);
      setDate(today);
      router.push(router.asPath);
    }
  };

  return (
    <div className={styles.addContainer}>
      <h2>Add Transaction</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
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

        <label>Wallet</label>
        <select
          value={selectedWallet}
          onChange={(e) => setSelectedWallet(e.target.value)}
        >
          {wallets?.map((wallet, index) => {
            return (
              <option value={wallet._id} key={index}>
                {wallet.name}
              </option>
            );
          })}
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
