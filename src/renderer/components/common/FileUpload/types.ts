export interface FileUploadProps {
    label: string;
    onFileChange?: (file: File | null) => void;
}