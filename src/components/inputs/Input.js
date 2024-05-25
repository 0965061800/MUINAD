import React from 'react';
import { useController } from 'react-hook-form';

const Input = ({name = "", type="text", children, control, ...props}) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
      });
    return (
        <input
        type={type} id={name}
        placeholder={`Enter product ${name}`} {...field} {...props}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    );
};

export default Input;