import Layout from "../../components/Layout";
import styles from "../../styles/wallets.module.scss";
import AddWallet from "../../components/AddWallet";
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";

export default function Wallets({ wallets }) {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const deleteWallet = async (id) => {
    const res = await fetch("/api/wallets/" + id, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      router.push(router.asPath);
    }
  };

  const userWallets = wallets?.filter((wallet) => {
    return wallet.user === userId;
  });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wallets}>
          <h2>Wallets</h2>
          {!userWallets && <div>Loading...</div>}
          {userWallets &&
            userWallets.map((wallet, index) => {
              return (
                <div key={index} className={styles.wallet}>
                  <p>Name: {wallet.name}</p>
                  <p>Amount: {wallet.amount.toLocaleString()}</p>
                  {wallet.description && (
                    <p>Description: {wallet.description}</p>
                  )}
                  <button onClick={() => deleteWallet(wallet._id)}>
                    Delete
                  </button>
                  <button>
                    <Link href={`/wallets/${wallet._id}`}>View</Link>
                  </button>
                </div>
              );
            })}
          {userWallets?.length === 0 && <div>No wallets</div>}
        </div>
        <AddWallet />
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

  const res = await fetch(`${process.env.BACKEND_SERVER}/api/wallets`);
  const wallets = await res.json();

  return { props: { wallets } };
}
