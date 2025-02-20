import React from "react";
import { FileUploadProps } from "./types";

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileChange }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (onFileChange) {
            onFileChange(file);
        }
    }

    return (
        <div>
        <label>{label}</label>
        <input 
            type="file" 
            onChange={handleFileChange} 
        />
        </div>
    );
};

export default FileUpload;