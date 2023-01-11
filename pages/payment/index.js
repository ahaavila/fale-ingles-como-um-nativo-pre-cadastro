import React from 'react';
import styles from './payment.module.css'
import Link from "next/link";
export default function Payment() {
    return (
        <>
        <header className={styles.header}>
            <strong>Lorena Brandão</strong>
            <button className={styles.cart}>
                <span className="material-symbols-outlined">
                    shopping_cart_checkout
                </span>
                <span>R$ 30,00</span>
            </button>
        </header>
          <div className={styles.container}>
            <div className={styles.cadastro}>
                <h3>Passo 1: Dados para cadastro</h3>
                <div className={styles.cadastroFormDiv}>
                    <form className={styles.cadastroForm}>
                        <label>Nome</label>
                        <input  required/>
                        <label>Email para receber o material</label>
                        <input />
                        <label>Whatsapp</label>
                        <input />
                    </form>
                </div>
            </div>

            <div className={styles.payment}>
                <h3>Passo 2: Pagamento</h3>
                <div className={styles.paymentContent}>
                    <h4>Transferência:</h4>
                    <div>
                        <ul className={styles.paymentList}>
                            <li><span>Agência:</span> 111111</li>
                            <li><span>Conta:</span> 222222</li>
                            <li><span>CPF:</span> 333333333</li>
                            <li><span>Nome:</span> Lorena Brandão de Castro</li>
                        </ul>
                    </div>
                    <h4>Pix:</h4>
                    <div>
                        <ul className={styles.paymentList}>
                            <li><span>CPF:</span> 11111111</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.info}>
                <h3>Passo 3: Considerações Finais</h3>
                <div className={styles.infoContent}>
                    <p>Para que possamos confirmar sua inscrição, você deverá clicar no botão <strong>Finalizar Inscrição</strong></p>
                    <p>e enviar o comprovante do pagamento para o email: <strong>lorenabrandaosoueu@gmail.com</strong></p>

                    <Link href="/thanks">
                        <button className={styles.infoButton}>Finalizar Inscrição</button>
                    </Link>
                </div>
            </div>
          </div>
        </>
    );
}
