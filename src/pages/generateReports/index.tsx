import Head from 'next/head';
import { cva } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Navbar from 'src/components/Navbar';
import ReportForm from 'src/components/reportForm';

import Loading from 'src/components/Loading';

const container = cva(['flex sm:flex-col']);
const bgContainer = cva(['ml-44 md:ml-20 mt-10 w-3/4 sm:w-full sm:ml-0']);

export default function GenerateReports() {
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
          <title>Gerar Relatorios</title>
        </Head>
        <Navbar />
        <div className={bgContainer()}>
          <ReportForm />
        </div>
      </div>
    );


  return <Loading />;

}
