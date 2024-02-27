import {fetcher} from "@app/api/Fetcher";

export interface User {
  address:
    {street: string, suite: string, city: string, zipcode: string}
  company:
    {name: string, catchPhrase: string}
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}

function getUsers(): Promise<User[]> {
  return fetcher<User[]>({
    url: 'https://jsonplaceholder.typicode.com/users',
    method: "get",
  });
}

export default {
  getUsers
};