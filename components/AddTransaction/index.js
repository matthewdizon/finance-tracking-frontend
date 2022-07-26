import { useEffect, useState } from "react";
import styles from "./addTransaction.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AddTransaction({ wallets }) {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const curr = new Date();
  curr.setDate(curr.getDate());
  const today = curr.toISOString().substring(0, 10);

  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Expense");
  const [date, setDate] = useState(today);
  const [error, setError] = useState(null);

  wallets = wallets?.filter((wallet) => {
    return wallet.user === userId;
  });

  useEffect(() => {
    setSelectedWallet(wallets[0]?._id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      amount,
      description,
      tag,
      date,
      selectedWallet,
      userId,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/transactions`,
      {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

  console.log(selectedWallet);

  return (
    <div className={styles.addContainer}>
      <h2>Add Transaction</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label>Amount</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          step=".01"
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
          {/* <option value="Investment">Investment</option>
          <option value="Transfer">Transfer</option>
          <option value="Savings">Savings</option> */}
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

        <input type="hidden" value={userId || ""} />

        <button>Add Transaction</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
