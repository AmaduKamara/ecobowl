import { Tabs } from "antd";

export const SMTab = ({ size = 'small' || 'middle' || 'large' || undefined, defaultActiveKey = "1", children }) => {
    const tSize: any = size;

    return (
        <Tabs defaultActiveKey={defaultActiveKey} size={tSize} style={{ marginBottom: 32 }}>
            {children}
        </Tabs>
    )
}
