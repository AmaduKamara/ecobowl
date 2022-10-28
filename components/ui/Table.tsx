import { Popconfirm, Table } from "antd";
import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";
import { Card } from "../AppLayout";

export const AntTable = ({ columns, rows, rowKey = "id", scroll = {}, pagination = {}, loading = false }) => {
  return (
    
    <Card className="px-3 pt-3">
      {
        <Table size="small" loading={loading} pagination={pagination} rowKey={rowKey} scroll={scroll} columns={columns} dataSource={rows} />
      }
      </Card>
  );
}

export const AntTableFooter = ({ columns, rows, rowKey = "id", scroll = {}, footer = (e?: any) => { return '' } }) => {
  return (
    <Card className="p-3">
      {
        <Table footer={footer} size="small" rowKey={rowKey} scroll={scroll} columns={columns} dataSource={rows} />
      }
    </Card>
  );
}

export const AntTableNested = ({ columns, rows, rowKey = "id", pagination = {} }) => {
  return <Table size="small" rowKey={rowKey} columns={columns} dataSource={rows} pagination={pagination} />;
}

export const AntTableExpanded = ({ columns, rows, expandable, rowKey = "id", scroll = {}, loading = false, footer = null }) => {
  return (
    <Card className="px-3 pt-3">
      {
        footer ? <Table loading={loading} footer={footer} rowKey={rowKey} expandable={{ expandedRowRender: expandable }} size="small" scroll={scroll} columns={columns} dataSource={rows} /> :
          <Table loading={loading} rowKey={rowKey} expandable={{ expandedRowRender: expandable }} size="small" scroll={scroll} columns={columns} dataSource={rows} />
      }
    </Card>
  );
}

export const Action = ({ record, app = {}, removeMessage = "", view = (e?: any) => { }, edit = (e?: any) => { }, remove = (e?: any) => { }, del = true, print = false, show = true, update = true, resend = false, resetPass = false, printRFQ = false }) => {
  return (
    <div className="flex items-center space-x-3 justify-end">
      {
        show ? <button onClick={() => view(record)} type="button" className="text-xl text-green-500"><FiEye /></button>
          : null
      }
      {
        update ? <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button> : null
      }
      {
        del ? <Popconfirm
          placement="topRight"
          title={removeMessage}
          onConfirm={() => remove(record)}
          okText="Yes"
          cancelText="No"
        >
          <button className="text-xl text-red-500"><FiTrash2 /></button>
        </Popconfirm> : null
      }
    </div>
  )
}