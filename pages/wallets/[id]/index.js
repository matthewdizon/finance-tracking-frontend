import Layout from "../../../components/Layout";
import React from "react";
import { useRouter } from "next/router";

function WalletId({ wallets, transactions }) {
  const router = useRouter();
  const { id } = router.query;

  const wallet = wallets?.find((wallet) => wallet._id === id);

  const walletTransactions = transactions?.filter((transaction) =>
    transaction.wallet.includes(id)
  );

  console.log("tx", walletTransactions);

  return (
    <Layout>
      <h1>WalletId: {wallet?.name}</h1>
      <div>
        {walletTransactions?.map((transaction, index) => {
          return (
            <div key={index}>
              <p>{transaction.amount}</p>
              <p>{transaction.tag}</p>
              <p>{transaction.date}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default WalletId;

export async function getServerSideProps(context) {
  const wallets = await (
    await fetch(`${process.env.BACKEND_SERVER}/api/wallets/`)
  ).json();

  const transactions = await (
    await fetch(`${process.env.BACKEND_SERVER}/api/transactions/`)
  ).json();

  return { props: { wallets, transactions } };
}
