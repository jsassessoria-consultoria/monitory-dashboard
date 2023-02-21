import { cva } from 'class-variance-authority';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const container = cva(['flex w-1/3']);
const mainMenu = cva([
  ' inline-flex flex-col bg-violet-900 h-screen w-1/2 '
]);
const linknav = cva([
  'flex font-medium text-white ml-10 mb-5 hover:bg-white hover:text-black p-2 rounded'
]);
const containerLinks = cva(['mt-12 inline-flex flex-col']);
const imageIcon = cva(['w-1/7 ml-2']);
const Navbar = () => {
  return (
    <div className={container()}>
      <nav className={mainMenu()}>
        <div className={containerLinks()}>
          <Link className={linknav()} href="/">
            Inicio
          </Link>
          <Link className={linknav()} href="#">
            Pesquisar relatorios
          </Link>
          <Link className={linknav()} href="#">
            Gerar relatorio
          </Link>
          <Link
            className={linknav()}
            onClick={() => {
              signOut();
            }}
            href="/auth/signIn"
          >
            <Image
              src="/../public/images/logout.png"
              alt="computador"
              width={30}
              height={30}
              quality={100}
              className={imageIcon()}
            />{' '}
            Sair
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
