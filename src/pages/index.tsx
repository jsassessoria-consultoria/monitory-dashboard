import { cva } from 'class-variance-authority';

const container = cva(['text-blue-600']);

export default function Home() {
  return <div className={container()}>Projeto</div>;
}
