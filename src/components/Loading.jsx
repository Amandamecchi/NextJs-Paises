import React from "react";
import Image from "next/image"; 
import styles from "../styles/Loading.module.css";

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Image src="/images/world.gif" alt="Loading" width={100} height={100} />
            <p>Carregando países...</p>
        </div>
    );
}
