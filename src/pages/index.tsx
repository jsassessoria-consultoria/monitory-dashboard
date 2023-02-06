import { cva } from 'class-variance-authority';

const container = cva(['text-blue-900']);

export default function Home() {
  return (
    <div>
        <div className={container()}>
          Projeto 
      </div>

    </div>
   
  );
}
