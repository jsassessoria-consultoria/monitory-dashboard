import { InputHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
type InputType = InputHTMLAttributes<HTMLInputElement> & {
  small?: boolean;
  danger?: boolean;
  info?: boolean;
  warn?: boolean;
  sucess?: boolean;
  invalid?: boolean;
};
const container = cva(['mb-8']);
const inputtext = cva([
  'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
]);
const label = cva([
  'block mb-2 ml-2 text-lg font-medium text-white dark:text-white'
]);
const Input = ({ title, id, invalid, ...rest }: InputType) => {
  return (
    <div className={container()}>
      <label htmlFor={id} className={label()}>
        {title}
      </label>
      <input id={id} className={inputtext()} {...rest}></input>
    </div>
  );
};
export default Input;
