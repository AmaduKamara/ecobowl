import { Radio } from "antd";

export const RadioField = (props) => {
    const {
        label = "",
        error = "",
        name = "",
        value = "",
        required = false,
        id = "",
        children,
        onChange = (e?: any) => { }
    } = props

    return (
        <>
            <label className={`text-sm block mb-3 ${error ? 'text-red-600' : ''}`} htmlFor={id}>{label}{required ? <span className="text-red-600">*</span> : ""}:</label>
            <Radio.Group onChange={onChange} name={name} value={value} size="large">{children}</Radio.Group>
            {
                error ? <p className="text-xs mt-1 text-red-600">{error}</p> : null
            }
        </>
    )
}