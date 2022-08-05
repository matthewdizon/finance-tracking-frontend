import styles from "../styles/index.module.scss";
import Layout from "../components/Layout";
import AddTransaction from "../components/AddTransaction";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home({ transactions, wallets }) {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const deleteTransaction = async (id) => {
    const res = await fetch("/api/transactions/" + id, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      router.push(router.asPath);
    }
  };

  transactions = transactions?.filter((transaction) => {
    return transaction.user === userId;
  });

  console.log(transactions);

  return (
    <Layout>
      <div className={styles.homeContainer}>
        <div className={styles.transactions}>
          <h2>Transactions</h2>
          {!transactions && <div>Loading...</div>}
          {transactions &&
            transactions.map((transaction, index) => {
              const wallet = wallets.find(
                (wallet) => wallet._id === transaction.wallet
              );

              return (
                <div key={index} className={styles.transaction}>
                  <p>Amount: {transaction.amount.toLocaleString()}</p>
                  {transaction.description && (
                    <p>Description: {transaction.description}</p>
                  )}
                  <p>Tag: {transaction.tag}</p>
                  <p>Date: {transaction.date}</p>
                  <p>Wallet: {wallet?.name}</p>
                  <button onClick={() => deleteTransaction(transaction._id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          {transactions?.length === 0 && <div>No transactions</div>}
        </div>
        <AddTransaction wallets={wallets} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const transactions = await (
    await fetch(`${process.env.BACKEND_SERVER}/api/transactions`)
  ).json();

  const wallets = await (
    await fetch(`${process.env.BACKEND_SERVER}/api/wallets`)
  ).json();

  return { props: { transactions, wallets } };
}
