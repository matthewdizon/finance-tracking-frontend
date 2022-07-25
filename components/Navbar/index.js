import Link from "next/link";
import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <Link href="/">Home</Link>
      <Link href="/wallets">Wallets</Link>
    </nav>
  );
}
