
export interface InputProps {
    autoComplete?: string;
    type: string;
    value?: string;
    error?: string;
    step?: number;
    decimals?: boolean;
    min?: number;
    max?: number | null;
    disabled?: boolean;
    placeholder?: string;
    rows?: number;
    label?: string;
    name: string;
    onInputChange: (name: string, value: string | number | File) => void;
    inlineElement?: React.ReactNode;
}