import { DatePicker, DatePickerProps } from "antd";
import moment from "moment";
import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    value?: string;
    name?: string;
    required?: boolean;
    format?: string;
    onChanged?:  DatePickerProps['onChange'];
    picker?: "time" | "date" | "week" | "month" | "quarter" | "year" | undefined
}

export const DateField = (props: Props) => {
    const {
        label = "",
        value = new Date(),
        error = "",
        required = false,
        picker,
        name = "",
        id,
        format="YYYY-MM-DD",
        onChanged,
        onBlur
    } = props

    return (
        <>
            {
                label ? <label className={`text-sm block mb-1.5 ${error ? 'text-red-600' : ''}`} htmlFor={id}>{label}{required ? <span className="text-red-600">*</span> : ""}:</label> : ""
            }
            <DatePicker
                picker={picker}
                size="large"
                style={{ width: '100%' }}
                name={name}
                value={moment(value)}
                format={format}
                onBlur={onBlur}
                onChange={onChanged}
            />
            {
                error ? <p className="text-xs mt-1 text-red-600">{error}</p> : null
            }
        </>
    )
}