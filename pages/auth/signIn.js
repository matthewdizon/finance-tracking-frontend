import styles from "../../styles/signIn.module.scss";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn({ providers }) {
  return (
    <div className={styles.signInContainer}>
      <h1>Sign In</h1>
      <p>You need to login first to use the application</p>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, { callbackUrl: `${window.location.origin}/` })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      <Link href={"/"}>Go Back Home</Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
