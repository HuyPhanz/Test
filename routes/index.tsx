import React from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import RouteList, {IRoute} from "./RouteList";
import Config from "../config";
import {AppProps} from "next/app";
import {useRouter} from "next/router";
import ApiUser from "@app/api/ApiUser";
import store from "@app/redux/store";

export default function Routes({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element | null {
  const routerNext = useRouter();
  const {user} = store.getState();

  const login = routerNext.pathname === Config.PATHNAME.LOGIN;

  const isRoute = (key: keyof IRoute): boolean => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        return !!route[key];
      }
    }
    return false;
  };

  const isRouteRequireRole = (): boolean => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        return !!route.role;
      }
    }
    return false;
  };

  // const isUserRoleAuthorized = (): boolean => {
  //   const userRole = ApiUser.getUserRole();
  //   if (userRole) {
  //     for (const route of RouteList) {
  //       if (router.pathname === route.path) {
  //         return !!route.role?.includes(userRole);
  //       }
  //     }
  //   }
  //   return false;
  // };

  const isPrivateRoute = (): boolean | undefined => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        if (route.isPrivate === undefined) {
          if (ApiUser.isLogin()) {
            return route.isPrivate;
          }
          return true;
        }
        return route.isPrivate;
      }
    }
    return false;
  };

  const goToLogin = (): null => {
    router.push(Config.PATHNAME.LOGIN);
    return null;
  };

  if (typeof window === "undefined") {
    return null;
  }

  if (isRoute("isPublic")) {
    return <Component {...pageProps} />;
  }

  if (isRoute("isAuth")) {
    return goToLogin();
  }

  if (isPrivateRoute()) {
    // if (ApiUser.isLogin()) {
    //   if (isRouteRequireRole()) {
    //     if (user?.role === IAccountRole.STAFF) {
    //       router.push(`/partners/${user?.storeId}`);
    //     } else {
    //       return (
    //         <DashboardLayout>
    //           <Component {...pageProps} />
    //         </DashboardLayout>
    //       );
    //     }
    //   }
    //   return (
    //     <DashboardLayout>
    //       <Component {...pageProps} />
    //     </DashboardLayout>
    //   );
    // }
    // return goToLogin();'
    return (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      );
  }
  const is404Page = router.route === "/404";

  // if (!ApiUser.isLogin()) {
  //   if (is404Page) {
  //     return <Component {...pageProps} />;
  //   }
  //   return goToLogin();
  // }
  return (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
