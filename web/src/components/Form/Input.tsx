/* 
Conseguindo inserir todas as props que um input
poderia receber vindo de um HTML qualquer
*/
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props : InputProps) {
    return (
        <input
            id={props.id}
            placeholder={props.placeholder}
            type={props.type}
            name={props.name}
            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
    );
}