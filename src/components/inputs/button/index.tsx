import { ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  small?: boolean;
  danger?: boolean;
  info?: boolean;
  warn?: boolean;
  sucess?: boolean;
};
const inputButton = cva(['text-indigo-700 bg-white hover:text-white hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800']);
const Button = ({
  title,
  small,
  danger,
  info,
  warn,
  sucess,
  ...rest
}: ButtonType) => {
  return (
    <div>
      <button className={inputButton()} {...rest}>{title}</button>
    </div>
  );
};
export default Button;
