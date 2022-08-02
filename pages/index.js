import { useEffect, useState } from "react";
import styles from "../styles/index.module.scss";
import Layout from "../components/Layout";
import AddTransaction from "../components/AddTransaction";

export default function Home() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const json = await res.json();

    if (res.ok) {
      setTransactions(json);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTransactions();
  }, []);

  console.log(transactions);

  const deleteTransaction = async (id) => {
    const res = await fetch("/api/transactions/" + id, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      console.log(json);
      fetchTransactions();
    }
  };

  return (
    <Layout>
      <div className={styles.homeContainer}>
        <div className={styles.transactions}>
          <h2>Transactions</h2>
          {loading && <div>Loading...</div>}
          {transactions &&
            transactions.map((transaction, index) => {
              return (
                <div key={index} className={styles.transaction}>
                  <p>Amount: {transaction.amount.toLocaleString()}</p>
                  {transaction.description && (
                    <p>Description: {transaction.description}</p>
                  )}
                  <p>Tag: {transaction.tag}</p>
                  <p>Date: {transaction.date}</p>
                  <button onClick={() => deleteTransaction(transaction._id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          {transactions?.length === 0 && <div>No transactions</div>}
        </div>
        <AddTransaction fetchTransactions={fetchTransactions} />
      </div>
    </Layout>
  );
}
