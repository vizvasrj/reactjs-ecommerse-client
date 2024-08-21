import React from "react";

export interface CheckboxProps {
    id?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, name: string, value: boolean) => void;
    className?: string;
}

export interface CheckboxState {
    isChecked: boolean;
}