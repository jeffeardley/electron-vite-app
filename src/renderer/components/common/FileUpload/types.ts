export interface FileUploadProps {
    label: string;
    defaultValue?: string;
    onFileChange?: (file: File | null) => void;
}