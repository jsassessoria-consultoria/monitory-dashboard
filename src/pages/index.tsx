import { cva } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
const container = cva(['text-blue-900']);

export default function Home() {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') window.location.href = '/auth/signIn';
  }, [status]);

  if (status === 'authenticated')
    return (
        <div className={container()}>Projeto {JSON.stringify(data.user, null, 2)}</div>
    );
  return <div>Loading</div>;

}
