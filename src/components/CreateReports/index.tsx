import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

type TitleReports = {
  text: string;
  fontSize: number;
  bold: boolean;
  margin: number[];
  color: string;
  alignment: string;
};
function CreateReports(reports: any, user: any, date: any) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dateStartArray = date.startDate.split('-');
  const dateEndArray = date.endDate.split('-');
  const textDate =
    dateStartArray[2] +
    '/' +
    dateStartArray[1] +
    '/' +
    dateStartArray[0] +
    ' a ' +
    dateEndArray[2] +
    '/' +
    dateEndArray[1] +
    '/' +
    dateEndArray[0];
  const reportTitle: TitleReports[] = [
    {
      text: 'ODS SAURON',
      fontSize: 25,
      color: '#43159D',
      bold: true,
      margin: [15, 20, 0, 70],
      alignment: 'center'
    },
   
  ];
  function generateColumns(count: number) {
    const dataColumn = reports[count].map((subreport: any) => {
      let minutos = (subreport.tempo / 60000) % 60;
      let horas = subreport.tempo / 3600000;

      let tempo: string =
        String(horas.toFixed()).padStart(2, '0') +
        ' horas e ' +
        String(minutos.toFixed()).padStart(2, '0') +
        ' minutos';

      return [
        {
          text: subreport.nome,
          style: 'tableHeader',
          fontSize: 12,
          margin: [0, 2, 0, 2]
        },
        {
          text: tempo,
          style: 'tableHeader',
          fontSize: 12,
          margin: [0, 2, 0, 2]
        }
      ];
    });
    return dataColumn;
  }
  let i: number = -1;
  const data = reports.map((report: any) => {
    let dateArray = report[0].data.split('-');
    let ReportDate =
      dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];

    i = i + 1;
    let dataSoftware: any = generateColumns(i);

    return [
      
      {
        text: 'relatorio do dia ' + ReportDate,
        style: 'header',
        bold: true,
        margin: [0, 20, 0, 5],
        fontSize: 15
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [
            [
              {
                text: 'Softwares',
                style: 'tableHeader',
                fontSize: 12
              },
              {
                text: 'Tempo de execução',
                style: 'tableHeader',
                fontSize: 12
              }
            ],
            ...dataSoftware
          ]
        },
        layout: 'headerLineOnly'
      }
    ];
  });
  const details: any = [
    {
      text: 'Monitoramento do dia: ' + textDate,
      style: 'header',
      alignment: 'center',
      bold: true,
      margin: [0, 0, 0, 5]
    },
    {
      text: 'Informações sobre o aparelho monitorado: ',
      style: 'header',
      bold: true,
      margin: [0, 0, 0, 5]
    },
    {
      text: 'nome do usuário: ' + user.usuario,
      style: 'header'
    },
    {
      text: 'nome do dispositivo: ' + user.nome,
      style: 'header',
      margin: [0, 0, 0, 35]
    },
    ...data
  ];
  function Footer(currentPage: any, pageCount: any) {
    return [
      {
        text: currentPage + '/' + pageCount,
        aligniment: 'right',
        fontSize: 9,
        margin: [5, 40, 20, 0] // left, top, right, bottom
      }
    ];
  }

  const docDefinitions: any = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle], //o titulo e configuraçoes da pagina
    content: [details], //conteudo do pdf
    footer: Footer // rodape do pdf
  };

  pdfMake.createPdf(docDefinitions).download();
}

export default CreateReports;
