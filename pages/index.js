import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/index.module.scss";
import Layout from "../components/Layout";

export default function Home() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const json = await res.json();

      if (res.ok) {
        setTransactions(json);
      }
    };

    fetchTransactions();
  }, []);

  console.log(transactions);

  return (
    <Layout>
      <h1>Home</h1>
      <div className={styles.transactions}>
        {transactions &&
          transactions.map((transaction, index) => {
            return (
              <div key={index} className={styles.transaction}>
                <p>Amount: {transaction.amount}</p>
                <p>Description: {transaction.description}</p>
                <p>Tag: {transaction.tag}</p>
                <p>Date: {transaction.date}</p>
                <p>Created: {transaction.createdAt}</p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}
