import Head from 'next/head'
import Image from 'next/image'
import teste from '../public/assets/images/teste.png';
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Aulão do GET</title>
      </Head>

      <div className={styles.title}>
        <div className={styles.teste}>
          <h1 className={styles.h1}>
              <p>Bem-vindo ao</p>
            <span className={styles.aulao}>Aulão do</span> <span className={styles.get}></span>GET!
          </h1>
        </div>
      </div>
      <div className={styles.form}>
          <h1>Aulão do GET</h1>
          <p><i>Se deseja avançar no inglês, está no lugar certo!</i></p>
          <p className={styles.textBreak}>
              O verbo GET é amplamente usado pelos nativos no <br />
              dia-a-dia, com diversos significados. E neste AULÃO eu <br />
              irei abordar estas diferenças e muito mais!
          </p>
          <h1>Sobre o Aulão:</h1>
          <ul className={styles.formUl}>
              <li>Acontecerá dia 25/01/2023, 19 horas (horário de Brasília);</li>
              <li>Pelo ZOOM;</li>
              <li>Com duração de 2 horas (um intervalo de 15 minutos);</li>
              <li>Material de apoio e lista de exercícios enviados para o email cadastrado, antes do AULÃO;</li>
              <li>Valor: 27,00.</li>
          </ul>

          <div className={styles.duvida}>
              <h3>Dúvida sobre o Aulão</h3>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>"- Lorena! Sou iniciante, o AULÃO é para mim?"</p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>"- Sim!!! O AULÃO é para todos os níveis. Porque eu acredito que desde o <br />
                  início do aprendizado, o aluno precisa aprender a se comunicar como um nativo. <br />
              </p>
          </div>


          <Link href="/payment">
              <button className={styles.paymentButton}>
                  QUERO ME INSCREVER!
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
              </button>
          </Link>
      </div>
        <div className={styles.image}>
            <Image
                src={teste}
                alt="Estude inglês"
                className={styles.englishImage}
                width={300}
                height={300}
            />
        </div>
    </div>
  )
}
