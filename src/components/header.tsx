"use client";

import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import { useUserContext } from "@/context/user";

export default function Header() {
  const { user } = useUserContext();

  const UserArea = () => {
    if (!user)
      return (
        <Link className={styles.login} href={"/login"}>
          Sign In | Sign Up
        </Link>
      );

    return (
      <div className="rectangle">
        <p>{user.nome || user.email}</p>
        <Link className={styles.logo} href="/account">
          <Image
            src="/assets/user.svg"
            alt="Account"
            width={22}
            height={22}
            priority
          />
        </Link>
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} href={"/"}>
          <Image
            src={"/assets/dogs.svg"}
            alt="Dogs"
            width={28}
            height={22}
            priority
          />
        </Link>
        <UserArea />
      </nav>
    </header>
  );
}
