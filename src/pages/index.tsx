import { cva } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from 'src/components/Navbar';
import Input from 'src/components/inputs/input';
import Button from 'src/components/inputs/button';
import Image from 'next/image';
import Head from 'next/head';

const container = cva(['text-white flex']);
const BgContainer = cva(['flex flex-col w-1/2 ml-44 md:ml-20']);
const searchContainer = cva([' bg-violet-900 p-3 rounded-lg mb-10']);
const titleContainer = cva(['bg-violet-900  h-12 flex']);
const dataContainer = cva(['bg-violet-800  h-12 flex ']);
const idArea = cva(['text-white font-medium w-1/4 mt-3 ml-2']);
const userArea = cva(['text-white font-medium w-1/2 mt-3']);
const actionArea = cva(['text-white font-medium w-1/4 mt-3 flex ']);
const icon = cva(['hover:scale-150']);
const userEditArea = cva(['font-medium w-1/2 flex ']);
const inputArea = cva(['w-3/4']);
const buttonArea = cva(['w-1/5 h-10 mt-1 ml-1']);
const mainContainer = cva(['overflow-y-scroll h-1/2']);
const formArea = cva(['flex']);
const arrayEmpty = cva(['text-black text-center font-medium mt-10']);

type User = {
  id: number;
  name: string;
};

export default function Home() {
  const { status } = useSession();
  const [dataTest, setDatatest] = useState<User[]>([
    { id: 12345, name: 'Airi Satou' }, //esses dados estão simulando o recebimento dos usuarios no back-end
    { id: 12346, name: 'Angelica Ramos' },
    { id: 12347, name: 'Ashton Cox' },
    { id: 12348, name: 'Bradley Greer' },
    { id: 12349, name: 'Brenden Wagner' },
    { id: 15342, name: 'Caesar Vance' },
    { id: 16343, name: 'Cara Stevens' },
    { id: 17341, name: 'Cedric Kelly' },
    { id: 14341, name: 'Gloria Little' },
    { id: 19342, name: 'Jenette Caldwell' }
  ]);

  const [dataInit, setDataInit] = useState<User[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [catchId, setCatchId] = useState<number>();

  useEffect(() => {
    setDataInit(dataTest); // o react hook ta reclamando mas isso sera removido mais tarde por um metodo axios para pegar os dados, esta aqui so para um teste de dados
    if (status === 'unauthenticated') {
      window.location.href = '/auth/signIn';
    }
  }, [status]);

  const searchData = (e: any) => {
    if (e.target.value == '') {
      setDatatest(dataInit);
    } else {
      const filterdata = dataTest.filter(data => {
        const { name } = data;
        return name.toLowerCase().includes(e.target.value);
      });
      setDatatest(filterdata);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value, defaultValue } = e.target.user;
    dataInit.map(data => {
      if (data.name == defaultValue) {
        data.name = value;
      }
    });
    setIsEdit(false);
  };

  const deleteData = (e: any) => {
    const { id } = e.target;

    let result = dataTest.filter(data => {
      return data.name != id;
    });
    setDatatest(result);
    setDataInit(result);
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
          <div className={titleContainer()}>
            <div className={idArea()}>ID: </div>
            <div className={userArea()}>Usuario:</div>
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
                  <div className={idArea()}>{data.id} </div>
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
                            defaultValue={data.name}
                          />
                        </div>
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
                    <div className={userArea()}>{data.name}</div>
                  )}
                  <div className={actionArea()}>
                    
                      <Image
                        src="/../public/images/editar.png"
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
                        src="/../public/images/delete.png"
                        alt="deletar"
                        width={30}
                        height={30}
                        quality={40}
                        className={icon()}
                        id={data.name}
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
  return <div>Loading</div>;
}
