import Link from "next/link";
import styles from "./mobileNavbar.module.scss";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function MobileNavbar(props) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className={styles.MobileNavbarContainer}>
      <div>
        {/* <Link href="/">Home</Link> */}
        <Link href="/transactions">Transactions</Link>
        <Link href="/wallets">Wallets</Link>
      </div>
      {user ? (
        <div className={styles.userContainer}>
          {/* <p>Welcome, {user.name}</p>
          <div>
            <Image
              src={user.image}
              height="50px"
              width="50px"
              alt="User Profile Image"
            />
          </div> */}
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

export default MobileNavbar;
