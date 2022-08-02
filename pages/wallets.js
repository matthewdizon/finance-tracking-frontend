import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import styles from "../styles/wallets.module.scss";
import AddWallet from "../components/AddWallet";

export default function Wallets() {
  const [wallets, setWallets] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWallets = async () => {
    const res = await fetch("/api/wallets");
    const json = await res.json();

    if (res.ok) {
      setWallets(json);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchWallets();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wallets}>
          <h2>Wallets</h2>
          {loading && <div>Loading...</div>}
          {wallets &&
            wallets.map((wallet, index) => {
              return (
                <div key={index} className={styles.wallet}>
                  <p>Name: {wallet.name}</p>
                  <p>Amount: {wallet.amount.toLocaleString()}</p>
                  {wallet.description && (
                    <p>Description: {wallet.description}</p>
                  )}
                  {/* <button onClick={() => deleteTransaction(transaction._id)}>
                Delete
              </button> */}
                </div>
              );
            })}
          {wallets?.length === 0 && <div>No wallets</div>}
        </div>
        <AddWallet fetchWallets={fetchWallets} />
      </div>
    </Layout>
  );
}
