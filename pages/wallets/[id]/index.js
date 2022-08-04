import Layout from "../../../components/Layout";
import React from "react";

function WalletId({ wallets, transactions, walletId }) {
  const wallet = wallets?.find((wallet) => wallet._id === walletId);

  const walletTransactions = transactions?.filter((transaction) =>
    transaction.wallet.includes(walletId)
  );

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

  const walletId = context.params.id;

  return { props: { wallets, transactions, walletId } };
}
