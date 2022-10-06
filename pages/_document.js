import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="author" content="Lorena Brandão" />
        <meta name="description" content="Fale inglês como um nativo" />
        <meta 
          name="keywords" 
          content="inglês, curso, curso de inglês, aula de inglês, aula, escola de ingles perto de mim, wiseup escola de ingles, 123 curso de ingles, curso de ingles poliglota, curso de ingles montreal, ucla curso de ingles, aula particular de ingles sao paulo, curso de inglês zenaric completo, " 
        />
        <meta name="reply-to" content="lorenabrandaosoueu@gmail.com"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}