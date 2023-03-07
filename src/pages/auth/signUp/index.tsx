import Input from 'src/components/inputs/input';
import Button from 'src/components/inputs/button';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

import Head from 'next/head';

const errorarea = cva(['bg-red-600 rounded-lg']);
const title = cva([
  'font-bold text-4xl text-black text-right mb-4 mt-4 float-right'
]);
const description = cva([
  'text-lg text-black text-right mb-8 float-right'
]);
const titleform = cva([
  'font-bold text-4xl text-white text-center mb-4 mt-4'
]);
const descriptionform = cva(['text-lg text-white text-center mb-8']);
const container = cva(['flex justify-start h-screen ']);
const bgcontainer = cva(['w-1/2 flex flex-col md:hidden']);
const formcontainer = cva([
  'w-1/2 bg-violet-900 p-4 flex flex-col md:w-full'
]);
const buttonarea = cva([
  'flex items-center w-full justify-center mt-8'
]);
const imggraphic = cva(['w-full']);
const computer = cva(['w-1/3']);

const SignUp = () => {
  const [emailError, setErrorEmail] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      confEmail: event.target.conf_email.value,
      senha: event.target.senha.value
    };
    const { email, confEmail, senha } = data;
    if (email == confEmail) {
      setErrorEmail(false);
      await axios
        .post(process.env.NEXT_PUBLIC_API_ROUTE + '/signup', {
          email: email,
          senha: senha
        }) //caminho do back pegando do .env + nome da rota
        .then(() => {
          setError(false);
          setTimeout(function () {
            window.location.href = '/auth/signIn';
          }, 1000);
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setErrorEmail(true);
    }
  };

  return (
    <div className={container()}>
      <Head>
        <title>SignUp</title>
      </Head>

      <div className={bgcontainer()}>
        <div className={title()}>Primeiro Acesso</div>
        <div className={description()}>
          Seja bem vindo!! cheque o tempo de uso de seus aparelhos
          aqui
        </div>
        <Image
          src="/../public/images/grafico.png"
          alt="computador"
          width={400}
          height={100}
          quality={100}
          className={imggraphic()}
        />
        <div>
          <Image
            src="/../public/images/monitorym.png"
            alt="computador"
            width={200}
            height={200}
            quality={100}
            className={computer()}
          />
        </div>
      </div>

      <div className={formcontainer()}>
        <div className={titleform()}> ODS SAURON</div>
        <div className={descriptionform()}>
          Cadastre-se para monitorar seus aparelhos.
          <div className={errorarea()}>
            {emailError
              ? 'Os emails não são iguais!! Por favor tente novamente.'
              : ''}
          </div>
          <div className={errorarea()}>
            {' '}
            {error
              ? 'Não foi possivel fazer o cadastro!! Por favor tente novamente.'
              : ''}{' '}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            title="Email:"
            type="email"
            required
          />
          <Input
            id="confEmail"
            name="conf_email"
            title="Confirmação de email:"
            type="email"
            required
          />
          <Input
            id="senha"
            name="senha"
            title="Senha:"
            type="password"
            minLength={8}
            required
          />
          <div className={buttonarea()}>
            <Button type="submit" title="CADASTRAR" />
          </div>
        </form>

        <div className={descriptionform()}>
          {' '}
          Já tem uma conta?{' '}
          <Link href="/auth/signIn">Clique aqui </Link> para fazer
          login
        </div>
      </div>
    </div>
  );
};
export default SignUp;
