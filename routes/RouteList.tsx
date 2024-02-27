import {IAccountRole} from "../types";
import IconSidebar from "@app/components/Icon/IconSidebar";

export interface IRoute {
  path: string;
  name: string;
  role?: Array<IAccountRole>;
  icon?: string | JSX.Element;
  isSidebar?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isUpdating?: boolean;
  isAuth?: boolean;
  isSSR?: boolean;
  children?: IRoute[];
  disabled?: boolean;
}

const routes: IRoute[] = [
  {
    path: "/",
    name: "Posts",
    icon: <IconSidebar nameIcon="events" width={23} height={23} />,
    isSSR: true,
    isSidebar: true,
    isPrivate: false,
  },

  {
    path: "/partners",
    name: "Users",
    icon: <IconSidebar nameIcon="events" width={23} height={23} />,
    isSSR: true,
    isSidebar: true,
    isPrivate: false,
  },
];

export default routes;
