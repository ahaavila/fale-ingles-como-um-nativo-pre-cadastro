import React from 'react';
import styles from './thanks.module.css';
import Image from 'next/image';
import image from '../../public/assets/images/lorena.jpeg';
export default function Index() {
    return (
        <main className={styles.container}>
            <h2>Obrigado pelo interesse no</h2>
            <h2>Aulão do GET!</h2>
            <h2>Em breve você receberá um email com mais informações.</h2>
            <div className={styles.image}>
                <Image
                    src={image}
                    width={375}
                    height={666}
                    alt="Teacher Lorena Brandão"
                />
            </div>
        </main>
    )
}
