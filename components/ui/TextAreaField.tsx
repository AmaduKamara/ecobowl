import { Input } from "antd"
const { TextArea } = Input;

export const TextAreaField = (props) => {
    const {
        label = "",
        value = "",
        error = "",
        required=false,
        row = 2,
        name = "",
        id = "",
        placeholder = "",
        onChange = (e?: any) => { },
        onBlur = (e?: any) => { }
    } = props

    return (
        <>
            <label className={`text-sm block mb-1.5 ${error ? 'text-red-600' : ''}`} htmlFor={id}>{label}{required ? <span className="text-red-600">*</span> : ""}:</label>
            <TextArea
                size="large"
                id={id}
                placeholder={placeholder}
                name={name}
                rows={row}
                status={error ? 'error' : ''}
                onChange={onChange}
                onBlur={onBlur}
                value={value} />
            {
                error ? <p className="text-xs mt-1 text-red-600">{error}</p> : null
            }
        </>
    )
}