import Head from "next/head";
import Navbar from "../Navbar";
import MobileNavbar from "../MobileNavbar";
// import Footer from "./Footer";
import { useRouter } from "next/router";
import styles from "./layout.module.scss";

export default function Layout({ children, title }) {
  const router = useRouter();

  return (
    <div className={styles.layoutContainer}>
      <Head>
        <title>Finance Tracking</title>
        <link rel="icon" href="/favicon.ico" />

        {/* <!-- Primary Meta Tags -->
                <meta name="title" content={`Matthew Dizon | ${title}`} />
                <meta name="description" content="Hi, I'm Matthew. I'm a student and a software developer who is highly inclined to personal development and blockchain technology." />

                <!-- Open Graph / Facebook -->
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.matthewdizon.com/" />
                <meta property="og:title" content={`Matthew Dizon | ${title}`} />
                <meta property="og:description" content="Hi, I'm Matthew. I'm a student and a software developer who is highly inclined to personal development and blockchain technology." />
                <meta property="og:image" content="https://www.matthewdizon.com/wedding.jpeg" />

                <!-- Twitter -->
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.matthewdizon.com/" />
                <meta property="twitter:title" content={`Matthew Dizon | ${title}`} />
                <meta property="twitter:description" content="Hi, I'm Matthew. I'm a student and a software developer who is highly inclined to personal development and blockchain technology." />
                <meta property="twitter:image" content="https://www.matthewdizon.com/wedding.jpeg"></meta> */}
      </Head>
      <MobileNavbar />
      <Navbar />
      <main className={styles.mainContainer}>{children}</main>
      {/* { router.pathname == "/" ? null :
            (<Footer />)
            } */}
    </div>
  );
}
