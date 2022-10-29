import { Select } from "antd"
import { useEffect, useState } from "react"

export const SelectField = (props) => {

    const { label = "", mode = "", required = false, value = "", id = "", error = "", name = "", placeholder = "", disabled = false, onChange = (e?: any, name?: any) => { }, onBlur = (e?: any) => { }, onSearch = (e?: any) => { }, children } = props
    
    const [val, setVal] = useState()

    useEffect(() => {
        setVal(value ? value : null)
    }, [value])

    return (
        <>
            {
                label ? <label className={`text-sm block mb-1.5 ${error ? 'text-red-600' : ''}`} htmlFor={id}>{label}{required ? <span className="text-red-600">*</span> : ""}:</label> : null
            }
            <Select
                placeholder={placeholder}
                showSearch
                mode={mode}
                disabled={disabled}
                id={id}
                onChange={(e) => onChange(e, name)}
                onBlur={onBlur}
                value={val}
                filterOption={(input, option) =>
                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
                onSearch={onSearch}
                size="large"
                style={{ width: "100%" }}
            >
                {children}
            </Select>
            {
                error ? <p className="text-xs mt-1 text-red-600">{error}</p> : null
            }
        </>
    )
}