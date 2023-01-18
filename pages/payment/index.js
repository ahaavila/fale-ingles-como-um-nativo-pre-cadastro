import React, { useEffect, useState } from 'react';
import styles from './payment.module.css';
import { sendMail, validateEmail, validateName } from "../../utils/mail";
import { useRouter } from 'next/router'
import { checkIfCountryIsBrazil } from "../../utils/utils";
import InputMask from 'react-input-mask';
export default function Payment() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isFromBrazil, setIsFromBrazil] = useState(false);

    useEffect(() => {
        setIsFromBrazil(checkIfCountryIsBrazil());
    }, []);

    const router = useRouter();

    function mailValidate(email) {
        validateEmail(email) ? setEmailError('Email inválido') : setEmailError('');
    }

    function nameValidate(name) {
        validateName(name) ? setNameError('Nome tem que ter mais de 3 caracteres') : setNameError('');
    }

    function disableButton() {
        return name === '' || email === '';
    }

    const brazilPaymentData = {
        transfer: {
            bank: 'NuBank (0260)',
            agency: '0001',
            account: '4538018-1',
            CPF: '03885590638',
            name: 'Lorena Brandão de Castro',
        },
        pix: {
            CPF: '03885590638',
        }
    }

    const otherPaymentData = {
        transfer: {
            IBAN: 'PT50003300004566367295605',
            name: 'Augusto Henrique Alves de Ávila'
        }
    }

    async function mail(name, email,  phone)  {
        setLoading(true);
        if (nameError !== '' || emailError !== '') {
            setError('Nome ou email inválido!');
            setLoading(false);
        } else {
            setError('');
            const response = await sendMail(name, email,  phone);
            if (response.status === 200)  {
                setLoading(false);
                await router.push('/thanks');
            } else {
                setError(response.error);
            }
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
                <span>{ isFromBrazil ? 'R$ 27,00' : '10,00€' }</span>
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
                        <InputMask
                            name="phone"
                            mask={isFromBrazil ? '(99) 99999-9999' : '999 999 999'}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            <div className={styles.payment}>
                <h2>Passo 2: Pagamento</h2>
                <div className={styles.paymentContent}>
                    {isFromBrazil ?
                        (
                            <>
                                <h4>Transferência:</h4>
                                <div>
                                    <ul className={styles.paymentList}>
                                        <li><span>Banco:</span> { brazilPaymentData.transfer.bank }</li>
                                        <li><span>Agência:</span> { brazilPaymentData.transfer.agency }</li>
                                        <li><span>Conta:</span> { brazilPaymentData.transfer.account }</li>
                                        <li><span>CPF:</span> { brazilPaymentData.transfer.CPF }</li>
                                        <li><span>Nome:</span> { brazilPaymentData.transfer.name }</li>
                                    </ul>
                                </div>
                                <h4>Pix:</h4>
                                <div>
                                    <ul className={styles.paymentList}>
                                        <li><span>CPF:</span> { brazilPaymentData.pix.CPF }</li>
                                    </ul>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <h4>Transferência:</h4>
                                <div>
                                    <ul className={styles.paymentList}>
                                        <li><span>IBAN:</span> { otherPaymentData.transfer.IBAN }</li>
                                        <li><span>Nome:</span> { otherPaymentData.transfer.name }</li>
                                    </ul>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <div className={styles.info}>
                <h2>Passo 3: Considerações Finais</h2>
                <div className={styles.infoContent}>
                    <p>Para que possamos confirmar sua inscrição, você deverá clicar no botão <strong>Finalizar Inscrição</strong> e enviar o</p>
                    <p>comprovante do pagamento para o email: <strong>lorenabrandaosoueu@gmail.com</strong></p>
                    <p><small style={{ color: 'red', textAlign: 'start' }}>*Enviar pelo email cadastrado na inscrição.</small></p>
                    <button
                        className={styles.infoButton}
                        type="button"
                        onClick={() => mail(name, email, phone, isFromBrazil)}
                        disabled={disableButton()}
                    >
                        {loading ? 'Enviando...' : 'Finalizar Inscrição'}
                    </button>
                    <small style={{ color: 'red', display: 'block', marginBlockStart: '1rem' }}>{error}</small>
                </div>
            </div>
          </div>
        </>
    );
}
