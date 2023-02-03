import Input from 'src/components/inputs/input';
import Button from 'src/components/inputs/button';
import { cva } from 'class-variance-authority';
import Image from 'next/image';

const title = cva([
  'font-bold text-4xl text-black text-right mb-4 mt-4 float-right'
]);
const description = cva([
  'text-lg text-black text-right mb-8 float-right'
]);
const titleform = cva([ 
  'font-bold text-4xl text-white text-center mb-4 mt-4'
]);
const descriptionform = cva(['text-lg text-white text-center mb-8']);
const container = cva(['flex justify-start h-screen']);
const bgcontainer = cva(['w-1/2 flex flex-col']);
const formcontainer = cva([
  'w-1/2 bg-violet-900 p-4 flex flex-col '
]);
const buttonarea = cva([
  'flex items-center w-full justify-center mt-8'
]);
const imggraphic = cva(['w-full']);
const computer = cva(['w-1/3']);

const SignUp = () => {
  return (
    <div className={container()}>
      <div className={bgcontainer()}>
        <div className={title()}>Primeiro Acesso</div>
        <div className={description()}>
          Seja bem vindo!! cheque o tempo de uso de seus aparelhos
          aqui
        </div>
        <Image src='/../public/images/grafico.png' alt='computador' width={400} height={100} quality={100} className={imggraphic()}/>
        <div><Image src='/../public/images/monitorym.png' alt='computador' width={200} height={200} quality={100} className={computer()} /></div>
      </div>

      <div className={formcontainer()}> 
        <div className={titleform()}> MONITORY SOFTWARE</div>
        <div className={descriptionform()}>
          {' '}
          Cadastre-se para monitorar seus aparelhos.
        </div> 
        <form>
          <Input
            id="email"
            name="email"
            title="Email:"
            type="email"
            required
          />
          <Input
            id="conf_email"
            name="cpnf_email"
            title="Confirmação de email:"
            type="email"
            required
          />
          <Input
            id="senha"
            name="senha"
            title="Senha:"
            type="password"
            minLength = {8}
            required
          />
          <div className={buttonarea()}>
            <Button type="submit" title="CADASTRAR" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
