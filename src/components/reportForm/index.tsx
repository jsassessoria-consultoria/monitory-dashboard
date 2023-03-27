import { cva } from 'class-variance-authority';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Button from '../inputs/button';

import StringfyDate from '../StringfyDate';
import axios from 'axios';
import DateRangePicker, { DateRange } from 'rsuite/DateRangePicker';
import { CustomProvider } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';
import isAfter from 'date-fns/isAfter';

import CreateReports from '../CreateReports';
import CatchUser from '../CatchUser';

const errorarea = cva(['bg-red-600 rounded-lg mb-10 text-center']);
const sucessarea = cva([
  'bg-green-600 rounded-lg mt-10 text-center'
]);

const container = cva([
  'flex flex-col text-white w-3/4 p-10 h-max bg-violet-900 rounded-xl sm:w-full'
]);
const title = cva(['text-center text-white text-xl mb-10']);

const dateTitle = cva(['mb-10']);
const titleContainer = cva(['bg-violet-700  h-12 flex font-bold']);
const mainContainer = cva(['overflow-y-scroll h-40 ']);
const dataContainer = cva([
  'bg-violet-800  h-12 flex hover:bg-violet-600 text-sm'
]);
const dataContainerSelect = cva([
  'bg-violet-600  h-12 flex hover:bg-violet-600 '
]);

const idArea = cva(['text-white font-medium w-1/2 mt-3  font-bold']);
const userArea = cva([
  'text-white font-medium w-1/2 mt-3 ml-5 font-bold'
]);

const buttonarea = cva([
  'flex items-center w-full justify-center mt-8'
]);
const arrayEmpty = cva([
  'text-white text-center font-medium mt-10 mb-10'
]);

const label = cva([
  'block mb-2 ml-2 text-lg font-medium text-white dark:text-white'
]);

type User = {
  id: string;
  usuario: string;
  nome: string;
  
};

const ReportForm = () => {
  const [dataTest, setDatatest] = useState<User[]>([]);
  const [dataInit, setDataInit] = useState<User[]>([]);
  const [idValue, setIdvalue] = useState<string>();
  const [error, setError] = useState<String>();
  const [sucess, setSucess] = useState<String>();

  const [dateValue, setDateValue] = useState<DateRange>();
  const Currentdate = new Date();

  async function fetchData() {
    axios
      .get(process.env.NEXT_PUBLIC_API_ROUTE + '/device')
      .then(res => {
        setDatatest(res.data.data);

        setDataInit(res.data.data);
        setError('');
      })
      .catch(() => {
        setError('algo deu errado, Tente novamente!!');
      });
  }

  useEffect(() => {
    fetchData();
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let date: any;
    if (dateValue != null) {
      date = StringfyDate(dateValue);
    } else {
      date = '';
    }

    const { user } = e.target;
    const chosenUser = CatchUser(user.value, dataTest); // pegando dados do usuario escolhido para o relatorio

    if (user.value == '' || date == '') {
      setSucess('');
      setError('o usuário e/ou data não foram selecionados!!');
    } else {
      axios
        .post(process.env.NEXT_PUBLIC_API_ROUTE + '/reports', {
          id: user.value,
          startDate: date.startDate,
          endDate: date.endDate
        })
        .then(res => {
          setError('');

          setSucess('relatorio solicitado com sucesso'); //ficara essa mensagem por enquanto para representar o retorno do backEnd mas posteriormente ela sera substituida
          CreateReports(res.data.data, chosenUser, date); // device sera substituido por res.data.software e res.data.user
        })
        .catch((err) => {
          setSucess('');
          setError(err.response.data.message);
        });
    }
  };

  const searchUsers = (e: any) => {
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

  const handleDate = (value: any) => {
    setDateValue(value);
  };

  return (
    <div className={container()}>
      <div className={title()}>Pesquise seus relatorios aqui</div>
      <form onSubmit={handleSubmit}>
        <div className={dateTitle()}>
          <div className={label()}>
            Selecione o periodo de tempo do relatorio desejado:
          </div>
          <CustomProvider locale={ptBr}>
            <DateRangePicker
              block
              placeholder="Clique e selecione as datas aqui"
              value={dateValue}
              onChange={handleDate}
              format="dd-MM-yyyy"
              disabledDate={date =>
                isAfter(
                  date,
                  new Date().setDate(Currentdate.getDate() - 1)
                )
              }
            />
          </CustomProvider>
        </div>
        <Input
          placeholder="Pesquise um usuario"
          id="search"
          title="Pesquise o usuario que se deseja buscar o relatorio:"
          name="search"
          type="text"
          onChange={searchUsers}
        />

        {error === '' ? (
          <div></div>
        ) : (
          <div className={errorarea()}>{error}</div>
        )}
        {sucess === '' ? (
          <div></div>
        ) : (
          <div className={sucessarea()}>{sucess}</div>
        )}

        <div className={titleContainer()}>
          <div className={userArea()}>Usuario:</div>
          <div className={idArea()}>Dispositivo: </div>
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
              value={idValue} //pegar id do user
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
                <div className={userArea()}>{data.usuario}</div>
                <div className={idArea()}>{data.nome} </div>
              </div>
            ))}
          </div>
        )}

        <div className={buttonarea()}>
          <Button type="submit" title="Buscar Relatorio" />
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
