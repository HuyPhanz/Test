import "./index.scss";
import {useEffect, useState} from "react";
import Posts, {User} from "@app/api/Posts";
import {Button, Input, Table} from "antd";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone number',
    dataIndex: 'phone',
    key: 'phone',
  },
];

export function PartnerManagement(): JSX.Element {

  const [users, setUsers] = useState<User[]>([])
  const [searchKey, setSearchKey] = useState("")

  const getData = () => {
    Posts.getUsers().then((res) => {
      console.log(res);
      setUsers(res);
    })
  }

  const handleSearch = () => {
    setUsers(users.filter((user) => user.name.includes(searchKey)))
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div >
      <div className="flex gap-1 w-50 mb-1">
        <Input placeholder={"Search"} onChange={(event) => setSearchKey(event.target.value)}/>
        <Button onClick={() => handleSearch()}>Search</Button>
      </div>
      <Table dataSource={users} columns={columns} />;
    </div>
  );
}
