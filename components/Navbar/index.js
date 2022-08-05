import Link from "next/link";
import styles from "./navbar.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className={styles.navContainer}>
      <div>
        <Link href="/">Home</Link>
        <Link href="/wallets">Wallets</Link>
      </div>
      {user ? (
        <div className={styles.userContainer}>
          <p>Welcome, {user.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <Link href="/auth/signIn">
          <button>Sign in</button>
        </Link>
      )}
    </nav>
  );
}
