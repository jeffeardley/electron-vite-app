import React from 'react';
import { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <input 
                type="text" 
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default TextInput;