import { cva } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from 'src/components/Navbar';
import Input from 'src/components/inputs/input';
import Button from 'src/components/inputs/button';
import Image from 'next/image';
import Head from 'next/head';

import Loading from 'src/components/Loading';
import Link from 'next/link';
import axios from 'axios';

const container = cva(['text-white flex sm:flex-col']);
const BgContainer = cva([
  'flex flex-col w-1/2 ml-44 md:ml-20 sm:w-full sm:ml-0'
]);
const searchContainer = cva([
  ' bg-violet-900 p-3 rounded-lg mb-10 sm:mt-5'
]);
const titleContainer = cva(['bg-violet-900  h-12 flex font-bold']);
const dataContainer = cva(['bg-violet-800  h-12 flex ']);
const DeviceArea = cva([
  'text-white font-medium w-1/4 mt-3 font-bold'
]);
const userArea = cva([
  'text-white ml-2  font-medium w-1/4 mt-3 font-bold'
]);
const userDataArea = cva([
  'text-white ml-2  font-medium w-1/2 mt-3 font-bold'
]);
const DeviceDataArea = cva([
  'text-white font-medium w-1/2 mt-3 font-bold'
]);
const localeArea = cva([
  'text-white font-medium w-1/3 mt-3 font-bold'
]);
const actionArea = cva([
  'text-white font-medium w-1/5 mt-3 flex font-bold'
]);
const icon = cva(['hover:scale-150']);
const userEditArea = cva(['font-medium w-1/2 flex ']);
const inputArea = cva(['w-3/4']);
const buttonArea = cva(['w-1/5 h-10 mt-1 ml-1 flex ']);
const mainContainer = cva([
  'overflow-y-scroll h-96 sm:h-full sm:overflow-y-hidden'
]);
const formArea = cva(['flex']);
const arrayEmpty = cva(['text-black text-center font-medium mt-10']);
const errorarea = cva(['bg-red-600 rounded-lg']);
const clientArea = cva(['flex w-1/2']);

type User = {
  id: string;
  usuario: string;
  nome: string;
  lat: any | null;
  long: any | null;
  isAccuracy: boolean;
};

export default function Home() {
  const { status } = useSession();
  const [dataTest, setDatatest] = useState<User[]>([]);
  const [dataInit, setDataInit] = useState<User[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [catchId, setCatchId] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function fetchData() {
    axios
      .get('/api/device')
      .then(res => {
        setDatatest(res.data.data);

        setDataInit(res.data.data);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('algo deu errado tente novamente');
      });
  }
  useEffect(() => {
    fetchData();

    if (status === 'unauthenticated') {
      window.location.href = '/auth/signIn';
    }
  }, [status]);

  const searchData = (e: any) => {
    if (e.target.value == '') {
      setDatatest(dataInit);
    } else {
      const filterdata = dataTest.filter(data => {
        const { nome } = data;
        return nome.toLowerCase().includes(e.target.value);
      });
      setDatatest(filterdata);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { id, user, device } = e.target;

    if (
      user.value == user.defaultValue &&
      device.value == device.defaultValue
    ) {
      setIsEdit(false);
    } else {
      axios
        .put('/api/device', {
          id: id.value,
          nome: device.value,
          usuario: user.value
        })
        .then(() => {
          window.location.reload();
          setErrorMessage('');
        })
        .catch(err => {
          setErrorMessage(err.response.data.message);
          setIsEdit(false);
        });
    }
  };

  const deleteData = async (e: any) => {
    const { id } = e.target;
    axios
      .delete('/api/device', {
        data: { id: id }
      })
      .then(() => {
        window.location.reload();
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.response.data.message);
      });
  };
  if (status === 'authenticated')
    return (
      <div className={container()}>
        <Head>
          <title>Dashboard</title>
        </Head>{' '}
        <Navbar />
        <div className={BgContainer()}>
          <div className={searchContainer()}>
            <Input
              placeholder="Pesquise um usuario"
              id="search"
              name="search"
              onChange={searchData}
              type="text"
            />
          </div>

          <div className={errorarea()}>
            {' '}
            {errorMessage != '' ? (
              <div>{errorMessage}</div>
            ) : (
              <div></div>
            )}{' '}
          </div>

          <div className={titleContainer()}>
            <div className={userArea()}>Usuario:</div>
            <div className={DeviceArea()}>Dispositivo: </div>
            <div className={localeArea()}>Localização:</div>
            <div className={actionArea()}>Ação:</div>
          </div>
          {dataTest.length === 0 ? (
            <div className={arrayEmpty()}>
              A pesquisa não encontrou resutados, Tente novamente!!
            </div>
          ) : (
            <div className={mainContainer()}>
              {dataTest.map((data): any => (
                <div key={data.id} className={dataContainer()}>
                  {isEdit && data.id == catchId ? (
                    <div className={userEditArea()}>
                      <form
                        className={formArea()}
                        onSubmit={handleSubmit}
                      >
                        <div className={inputArea()}>
                          <Input
                            id="user"
                            type="text"
                            name="user"
                            defaultValue={data.usuario}
                          />
                        </div>
                        <div className={inputArea()}>
                          <Input
                            id="device"
                            type="text"
                            name="device"
                            defaultValue={data.nome}
                          />
                        </div>

                        <Input
                          id="id"
                          type="hidden"
                          name="id"
                          defaultValue={data.id}
                        />

                        <div className={buttonArea()}>
                          <Button
                            id="button"
                            title="Ok"
                            type="submit"
                          />
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className={clientArea()}>
                      <div className={userDataArea()}>
                        {data.usuario}
                      </div>
                      <div className={DeviceDataArea()}>
                        {data.nome}{' '}
                      </div>
                    </div>
                  )}

                  {data.lat == null ? (
                    <div className={localeArea()}>
                      Localização não disponivel
                    </div>
                  ) : (
                    <div className={localeArea()}>
                      <Link
                        href={`https://www.google.es/maps?q=${data.lat},${data.long}`}
                        target="_blank"
                      >
                        veja aqui sua localização{' '}
                        {data.isAccuracy == true
                          ? ' (alta precisão)'
                          : ' (baixa precisão)'}
                      </Link>
                    </div>
                  )}

                  <div className={actionArea()}>
                    <Image
                      src="/images/editar.png"
                      alt="editar"
                      width={35}
                      height={35}
                      quality={40}
                      className={icon()}
                      onClick={() => {
                        setIsEdit(true);
                        setCatchId(data.id);
                      }}
                    />

                    <Image
                      src="/images/delete.png"
                      alt="deletar"
                      width={30}
                      height={30}
                      quality={40}
                      className={icon()}
                      id={data.id}
                      onClick={deleteData}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );

  return <Loading />;
}
