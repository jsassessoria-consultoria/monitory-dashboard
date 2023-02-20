import { cva } from 'class-variance-authority';
import Button from 'src/components/inputs/button';
import Input from 'src/components/inputs/input';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';

const container = cva(['flex justify-start h-screen']);
const bgcontainer = cva(['w-1/2 flex flex-col md:hidden']);
const title = cva([
  'font-bold text-4xl text-black text-right mb-4 mt-4 float-right'
]);
const description = cva([
  'text-lg text-black text-right mb-8 float-right ml-64 '
]);
const formcontainer = cva([
  'w-1/2 bg-violet-900 p-4 flex flex-col md:w-full'
]);
const titleform = cva([
  'font-bold text-4xl text-white text-center mb-4 mt-4'
]);
const descriptionform = cva([
  'text-lg text-white text-center mb-20'
]);
const buttonarea = cva([
  'flex items-center w-full justify-center mt-8 mb-8'
]);
const iconsArea = cva(['flex ml-20 mt-20']);
const imageIcon = cva(['w-1/4']);
const image = cva(['w-2/3 h-1/2 mt-32']);
const icon = cva(['flex flex-col items-center ']);
const errorarea = cva(['bg-red-600 rounded-lg']);

const SignIn = () => {
  const [errorsignIn, setErrorSignIn] = useState('');
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const data = {
        email: event.target.email.value,
        senha: event.target.senha.value
      };
      const { email, senha } = data;

      const res: any = await signIn('credentials', {
        email: email,
        senha: senha,
        redirect: false
      });
      
      if ((res.status == 401)) {
        setErrorSignIn(res.error);
      } 
      if (res.status == 200) {
        window.location.href = '/';
      }
    } catch (error: any) {
      setErrorSignIn(
        'servidor não esta respondendo !! Tente novamente mais tarde'
      );
    }
  };

  return (
    <div className={container()}>
      <Head>
        <title>SignIn</title>
      </Head>
      <div className={formcontainer()}>
        <div className={titleform()}> ODS SAURON</div>
        <div className={descriptionform()}>
          Por favor faça login no sistema, <br /> Para monitorar os
          seus aparelhos.
          <div className={errorarea()}>
            {' '}
            {errorsignIn != '' ? (
              <div>{errorsignIn}</div>
            ) : (
              <div></div>
            )}{' '}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            name="email"
            title="Email:"
            required
          />
          <Input
            type="password"
            id="senha"
            name="senha"
            title="Senha:"
            minLength={8}
            required
          />
          <div className={buttonarea()}>
            <Button type="submit" title="ENTRAR" />
          </div>
        </form>
        <div className={descriptionform()}>
          {' '}
          Ainda não tem uma conta?{' '}
          <Link href="/auth/signUp">Clique aqui </Link> para
          cadastrar
        </div>
      </div>
      <div className={bgcontainer()}>
        <div className={title()}>Monitore seus aparelhos</div>
        <div className={description()}>
          Verifique o tempo de uso dos seus softwares aqui, veja onde
          estão localizados, gerencie seus dados emita relatorios.
          <div className={iconsArea()}>
            <div className={icon()}>
              <div>Pesquisa</div>
              <Image
                src="/../public/images/pesquisa.png"
                alt="computador"
                width={200}
                height={200}
                quality={100}
                className={imageIcon()}
              />
            </div>

            <div className={icon()}>
              <div>Analise</div>
              <Image
                src="/../public/images/analise.png"
                alt="computador"
                width={200}
                height={200}
                quality={100}
                className={imageIcon()}
              />
            </div>
            <div className={icon()}>
              <div>Relatorio</div>
              <Image
                src="/../public/images/relatorio.png"
                alt="computador"
                width={200}
                height={200}
                quality={100}
                className={imageIcon()}
              />
            </div>
          </div>
        </div>
        <Image
          src="/../public/images/monitoramento.png"
          alt="computador"
          width={200}
          height={200}
          quality={100}
          className={image()}
        />
      </div>
    </div>
  );
};
export default SignIn;
