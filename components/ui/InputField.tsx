import { Input } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export const InputField = (props) => {
    const {
        label = "",
        value = "",
        error = "",
        required = false,
        disabled = false,
        addonBefore = "",
        type = "text",
        name = "",
        id = "",
        placeholder = "",
        onChange = (e?: any) => { },
        onBlur = (e?: any) => { }
    } = props

    return (
        <>
            {
                label ? <label className={`text-sm block mb-1.5 ${error ? 'text-red-600' : ''}`} htmlFor={id}>{label}{required ? <span className="text-red-600">*</span> : ""}:</label> : ""
            }
            <Input
                addonBefore={addonBefore}
                size="large"
                id={id}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                type={type}
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

export const PasswordField = (props) => {
    const {
        label = "",
        value = "",
        error = "",
        name = "",
        id = "",
        placeholder = "",
        onChange = (e?: any) => { },
        onBlur = (e?: any) => { }
    } = props

    return (
        <>
            {
                label ? <label className={`text-sm block mb-1.5 ${error ? 'text-red-600' : ''}`} htmlFor={id}>{label}:</label> : ""
            }
            <Input.Password
                size="large"
                id={id}
                placeholder={placeholder}
                name={name}
                status={error ? 'error' : ''}
                onChange={onChange}
                onBlur={onBlur}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={value} />
            {
                error ? <p className="text-xs mt-1 text-red-600">{error}</p> : null
            }
        </>
    )
}

<Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />