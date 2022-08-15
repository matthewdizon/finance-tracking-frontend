import styles from "../../styles/transactions.module.scss";
import Layout from "../../components/Layout";
import AddTransaction from "../../components/AddTransaction";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useTransition } from "react";

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

  const userTransactions = transactions?.filter((transaction) => {
    return transaction.user === userId;
  });

  // console.log("tx", new Date(userTransactions[0].date).getMonth());

  const d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = d.getMonth();

  const monthlyTransactions = userTransactions?.filter((transaction) => {
    // return transaction.user === userId;
    return new Date(transaction.date).getMonth() === month;
  });

  const userWallets = wallets?.filter((wallet) => {
    return wallet.user === userId;
  });

  console.log(userWallets);

  if (userWallets?.length === 0) {
    return (
      <Layout>
        <div className={styles.emptyWalletContainer}>
          <h2>Want to add a transaction?</h2>
          <p>It looks like you don&apos;t have any wallets yet</p>
          <Link href={"/wallets"}>Add a wallet here!</Link>
        </div>
      </Layout>
    );
  }

  // for (const transaction of userTransactions) {
  //   console.log(transaction.amount);
  // }

  var monthlyExpenses = monthlyTransactions
    .filter(({ tag }) => tag === "Expense")
    .reduce(function (acc, obj) {
      return acc + obj.amount;
    }, 0);

  return (
    <Layout>
      <div className={styles.homeContainer}>
        <div className={styles.transactions}>
          <h2>Transactions</h2>
          <p>
            Expenses for the month of {months[month]}: {monthlyExpenses}
          </p>
          {!userTransactions && <div>Loading...</div>}
          {userTransactions &&
            userTransactions.map((transaction, index) => {
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
          {userTransactions?.length === 0 && <div>No transactions</div>}
        </div>
        <AddTransaction wallets={wallets} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  const transactions = await (
    await fetch(`${process.env.BACKEND_SERVER}/api/transactions`)
  ).json();

  const wallets = await (
    await fetch(`${process.env.BACKEND_SERVER}/api/wallets`)
  ).json();

  return { props: { transactions, wallets } };
}
