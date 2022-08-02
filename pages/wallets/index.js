import Layout from "../../components/Layout";
import styles from "../../styles/wallets.module.scss";
import AddWallet from "../../components/AddWallet";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Wallets({ data }) {
  const router = useRouter();

  const deleteWallet = async (id) => {
    const res = await fetch("/api/wallets/" + id, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      router.push(router.asPath);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wallets}>
          <h2>Wallets</h2>
          {!data && <div>Loading...</div>}
          {data &&
            data.map((wallet, index) => {
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
          {data?.length === 0 && <div>No wallets</div>}
        </div>
        <AddWallet />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BACKEND_SERVER}/api/wallets`);
  const data = await res.json();

  return { props: { data } };
}
