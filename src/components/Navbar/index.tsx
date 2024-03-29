import { cva } from 'class-variance-authority';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const container = cva([
  'flex w-1/6 sm:w-full sm:flex sm:h-20 sm:flex'
]);
const title = cva([
  'ml-10 text-2xl text-white mb-10 font-bold sm:text-xl'
]);
const mainMenu = cva([
  ' inline-flex flex-col bg-violet-900 h-screen w-full sm:flex sm:h-20 '
]);
const linknav = cva([
  'flex font-bold text-lg hover:no-underline text-white ml-10 mb-5 hover:bg-white hover:text-black p-2 rounded sm:p-1 sm:text-base sm:ml-5'
]);
const containerLinks = cva([
  'mt-12 inline-flex flex-col sm:flex sm:flex-row sm:mt-6'
]);

const imageIcon = cva(['w-1/7 ml-2 sm:hidden']);

const Navbar = () => {
  return (
    <div className={container()}>
      <nav className={mainMenu()}>
        <div className={containerLinks()}>
          <div className={title()}> ODS SAURON</div>
          <Link className={linknav()} href="/">
            Inicio
          </Link>
          <Link className={linknav()} href="/generateReports">
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
              src="/images/logout.png"
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
