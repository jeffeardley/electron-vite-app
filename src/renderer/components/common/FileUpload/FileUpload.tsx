import React from "react";
import { FileUploadProps } from "./types";

const FileUpload: React.FC<FileUploadProps> = ({ label, defaultValue = ''}) => {
    return (
        <div>
        <label>{label}</label>
        <input type="file" defaultValue={defaultValue} />
        </div>
    );
};

export default FileUpload;