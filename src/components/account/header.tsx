"use client";

import React from "react";
import FeedIcon from "@/icons/feed";
import StatisticsIcon from "@/icons/statistics";
import AddIcon from "@/icons/add";
import ExitIcon from "@/icons/exit";
import styles from "./header.module.css";
import useMedia from "@/hooks/use-media";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logout from "@/actions/logout";

function getTitle(pathname: string) {
  switch (pathname) {
    case "/account/post":
      return "Post your photo";
    case "/account/statistics":
      return "Statistics";
    default:
      return "Account";
  }
}

export default function AccountHeader() {
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const pathname = usePathname();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    window.location.href = "/login"; // Hard refresh page, reset contexts
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>

      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link
          href="/account"
          className={pathname === "/account" ? "active" : ""}
        >
          <FeedIcon />
          {mobile && "Account"}
        </Link>
        <Link
          href="/account/statistics"
          className={pathname === "/account/statistics" ? "active" : ""}
        >
          <StatisticsIcon />
          {mobile && "Statistics"}
        </Link>
        <Link
          href="/account/post"
          className={pathname === "/account/post" ? "active" : ""}
        >
          <AddIcon />
          {mobile && "Post"}
        </Link>
        <button onClick={handleLogout}>
          <ExitIcon />
          {mobile && "Exit"}
        </button>
      </nav>
    </header>
  );
}
