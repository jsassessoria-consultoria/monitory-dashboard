import { cva } from 'class-variance-authority';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Button from '../inputs/button';
import axios from 'axios';

const errorarea = cva(['bg-red-600 rounded-lg mb-10 text-center']);
const sucessarea = cva(['bg-green-600 rounded-lg mt-10 text-center']);
const container = cva([
  'flex flex-col text-white w-3/4 p-10 h-3/4 bg-violet-900 rounded-xl'
]);
const title = cva(['text-center text-white text-xl mb-10']);
const titleContainer = cva(['bg-violet-700  h-12 flex']);
const mainContainer = cva(['overflow-y-scroll h-1/4 ']);
const dataContainer = cva([
  'bg-violet-800  h-12 flex hover:bg-violet-600 '
]);
const dataContainerSelect = cva([
  'bg-violet-600  h-12 flex hover:bg-violet-600 '
]);
const idArea = cva(['text-white font-medium w-1/4 mt-3 ml-2']);
const userArea = cva(['text-white font-medium w-1/2 mt-3']);
const buttonarea = cva([
  'flex items-center w-full justify-center mt-8'
]);
const arrayEmpty = cva([
  'text-white text-center font-medium mt-10 mb-10'
]);

interface ModalProps {
  inputDate: boolean;
  message: string;
}
type User = {
  id: number;
  name: string;
};

const ReportForm = (props: ModalProps) => {
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
  const [idValue, setIdvalue] = useState<number>();
  const [error, setError] = useState<String>();
  const [sucess, setSucess] = useState<String>();

  useEffect(() => {
    setDataInit(dataTest);
  }, [setDataInit]);

  const searchUsers = (e: any) => {
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
    const { date, user } = e.target;

    if (user.value == '') {
      setSucess('');
      setError('o usuário não foi selecionado!!');
    } else {
      axios.post('#', { id: user.value, date: date.value }).then(()=>{
        setError('');
        setSucess('relatorio solicitado com sucesso'); //ficara essa mensagem por enquanto para representar o retorno do backEnd mas posteriormente ela sera substituida
      }).catch(()=>{
        setSucess('');
        setError('Relatorio não enviado tente novamente');
      });
    }
    
  };

  const handleDate = (e: any) => {
    const date = new Date();

    let dateArray = e.target.value.split('-');

    if (dateArray[0] > date.getFullYear()) {
      e.target.value = '';
    } else if (dateArray[0] == date.getFullYear()) {
      if (dateArray[1] > date.getMonth() + 1) {
        e.target.value = '';
      } else if (dateArray[1] == date.getMonth() + 1) {
        if (dateArray[2] > date.getDate()) {
          e.target.value = '';
        }
      }
    }
  };

  return (
    <div className={container()}>
      <div className={title()}>{props.message}</div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Pesquise um usuario"
          id="search"
          title="Pesquise o usuario que se deseja buscar o relatorio:"
          name="search"
          type="text"
          onChange={searchUsers}
        />
        {error === '' ? (<div></div>) : (<div className={errorarea()}>{error}</div>)}
        {sucess === '' ? (<div></div>) : (<div className={sucessarea()}>{sucess}</div>)}
        <div className={titleContainer()}>
          <div className={idArea()}>ID: </div>
          <div className={userArea()}>Usuario:</div>
        </div>
        {dataTest.length === 0 ? (
          <div className={arrayEmpty()}>
            A pesquisa não encontrou resutados, Tente novamente!!
          </div>
        ) : (
          <div className={mainContainer()}>
            <input
              id="user"
              name="user"
              value={idValue}
              type="hidden"
              required
            />
            {dataTest.map((data): any => (
              <div
                key={data.id}
                className={
                  data.id == idValue
                    ? dataContainerSelect()
                    : dataContainer()
                }
                onClick={() => {
                  setIdvalue(data.id);
                }}
              >
                <div className={idArea()}>{data.id} </div>
                <div className={userArea()}>{data.name}</div>
              </div>
            ))}
          </div>
        )}
        {props.inputDate ? (
          <div>
            <Input
              id="date"
              title="Selecione a data do relatorio desejado:"
              name="date"
              type="date"
              onChange={handleDate}
              required
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className={buttonarea()}>
          <Button type="submit" title="Buscar Relatorio" />
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
