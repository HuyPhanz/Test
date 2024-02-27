import {Button, Form, Input, Table} from "antd";
import "./index.scss";
import {useState} from "react";



const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
];

export function Events(): JSX.Element {

  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      name: 'post 1',
      content: 'content 1.........................',
    },
    {
      key: 1,
      name: 'post 2',
      content: 'content 2.........................',
    },
  ])

  const onFinish = (values: any) => {
    setDataSource([...dataSource, {...values, key: dataSource.length}])
  };

  return (
    <div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input content!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
