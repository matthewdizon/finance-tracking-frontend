import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./addWallet.module.scss";
import { useSession } from "next-auth/react";

export default function AddWallet({}) {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wallet = { name, amount, description, userId };

    const res = await fetch(`${process.env.BACKEND_SERVER}/api/wallets`, {
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
      router.push(router.asPath);
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
          step=".01"
        />

        <label>Description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <input type="hidden" value={userId || ""} />

        <button>Add Wallet</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
