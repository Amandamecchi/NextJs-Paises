import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Image className={styles.image} src="/images/paises.png" alt="Maiko Xikixiki" width={300} height={200} />
            <h1 className={styles.title}>Países sei oq sei oq lá</h1>
            <div className={styles.description}>
                <p>AAAAAAAAAAAAAAAAAAA</p>
                <ul className={styles.list}>
                    <li>Next.js (App Router)</li>
                    <li>CSS Modules</li>
                    <li>React Components</li>
                    <li>React Hooks</li>
                    <li>PreLoad</li>
                    <li>PreFetch</li>
                    <li>Fetch Axios</li>
                    <li>LocalStorage</li>
                    <li>React Toastify</li>
                    <li>AntD</li>
                    <li>Skeleton</li>
                </ul>
            </div>
            <Link href="/countries">
                <button className={styles.button}>Acessar Países</button>
            </Link>
        </div>
    );
}

