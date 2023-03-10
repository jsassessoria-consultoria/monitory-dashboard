import Head from 'next/head';
import { cva } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Navbar from 'src/components/Navbar';
import ReportForm from 'src/components/reportForm';

const container = cva(['flex']);
const bgContainer = cva(['ml-44 md:ml-20 mt-10 w-full']);
export default function SearchReports() {
  const { status } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/auth/signIn';
    }
  }, [status]);
  if (status === 'authenticated')
    return (
      <div className={container()}>
        <Head>
          <title>Pesquisar Relatorios</title>
        </Head>
        <Navbar />
        <div className={bgContainer()}>
          <ReportForm inputDate={true} message='Pesquise seus relatorios antigos aqui'/>
        </div>
      </div>
    );

  return <div>Loading</div>;
}
