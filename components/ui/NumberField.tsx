import { InputNumber } from "antd";

export const NumberField = (props) => {

    const {
        label = "",
        value = "",
        error = "",
        name = "",
        min = 0,
        required = false,
        max = 1000,
        id = "",
        placeholder = "",
        onChange = (e?: any, name?: any) => { },
        onBlur = (e?: any) => { }
    } = props

    return (
        <>
            {
                label ? <label className={`text-sm block mb-1.5 ${error ? 'text-red-600' : ''}`} htmlFor={id}>{label}{required ? <span className="text-red-600">*</span> : ""}:</label> : ""
            }
            <InputNumber
                size="large"
                style={{ width: "100%" }}
                id={id}
                min={min}
                max={max}
                placeholder={placeholder}
                name={name}
                status={error ? 'error' : ''}
                onChange={(e) => onChange(e, name)}
                onBlur={onBlur}
                value={value ? value : null} />
            {
                error ? <p className="text-xs mt-1 text-red-600">{error}</p> : null
            }
        </>
    )
}