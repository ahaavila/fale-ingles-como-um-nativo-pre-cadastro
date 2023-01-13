import React, { useState } from 'react';
import styles from './payment.module.css';
import {sendMail, validateEmail, validateName} from "../../utils/mail";
import { useRouter } from 'next/router'
export default function Payment() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    function mailValidate(email) {
        validateEmail(email) ? setEmailError('Email inválido') : setEmailError('');
    }

    function nameValidate(name) {
        validateName(name) ? setNameError('Nome tem que ter mais de 3 caracteres') : setNameError('');
    }

    async function mail(name, email,  phone)  {
        setLoading(true);
        const response = await sendMail(name, email,  phone);
        if (response.status === 200)  {
            setLoading(false);
            await router.push('/thanks');
        } else {
            setError(response.error);
        }
    }

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
                <h2>Passo 1: Dados para cadastro</h2>
                <div className={styles.cadastroFormDiv}>
                    <form className={styles.cadastroForm}>
                        <label>Nome</label>
                        <input
                            name="name"
                            type="text"
                            onChange={e => setName(e.target.value)}
                            onBlur={e => nameValidate(e.target.value)}
                            required
                        />
                        <small style={{ color: 'red' }}>{nameError}</small>
                        <label>Email para receber o material</label>
                        <input
                            name="email"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            onBlur={e => mailValidate(e.target.value)}
                            required
                        />
                        <small style={{ color: 'red' }}>{emailError}</small>
                        <label>Whatsapp</label>
                        <input name="phone" type="tel" onChange={e => setPhone(e.target.value)} />
                        <small style={{ color: 'red' }}>{error}</small>
                    </form>
                </div>
            </div>

            <div className={styles.payment}>
                <h2>Passo 2: Pagamento</h2>
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
                <h2>Passo 3: Considerações Finais</h2>
                <div className={styles.infoContent}>
                    <p>Para que possamos confirmar sua inscrição, você deverá clicar no botão <strong>Finalizar Inscrição</strong></p>
                    <p>e enviar o comprovante do pagamento para o email: <strong>lorenabrandaosoueu@gmail.com</strong></p>
                    <p>com o email que foi feita a inscrição.</p>
                    <button
                        className={styles.infoButton}
                        onClick={() => mail(name, email, phone)}
                    >
                        {loading ? 'Enviando...' : 'Finalizar Inscrição'}
                    </button>
                </div>
            </div>
          </div>
        </>
    );
}
