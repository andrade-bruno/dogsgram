"use client";

import { PhotoData } from "@/interfaces/origamid/photo";
import PhotoContent from "@/components/photo/photo-content";
import styles from "./photo-modal.module.scss";
import { usePathname, useRouter } from "next/navigation";

export default function PhotoModal({ photo }: { photo: PhotoData }) {
  const router = useRouter();
  const pathname = usePathname();

  if (!pathname.includes("photo")) {
    return null;
  }

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) router.back();
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <PhotoContent data={photo} single={false} />
    </div>
  );
}
