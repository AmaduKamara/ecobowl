import Router, { useRouter } from "next/router";

import { useAuth } from "./auth";

export const checkPermissions = (route: string) => {

    const { user } = useAuth();

    const subRoute = route.trim().split("/")[1];

    let path = subRoute.replace("-", " ").toLowerCase();

    if (path === "report center") path = "report";
    if (path === "role/[id]") path = "role";
    if (path === "user") path = "users";

    return true;
}

export const Permission = ({ children }) => {
    let access = true;

    const { user, isAuthenticated } = useAuth();
    const { pathname } = useRouter();

    if ((pathname === "/login" || pathname === "/change-password" || pathname === "/network") && isAuthenticated && user && user.status != "Password Pending") {
        access = false;
        window.location.pathname = "/";
    }

    if (pathname === "/network" && isAuthenticated && !user) {
        access = false;
        window.location.pathname = "/login";
    }

    if (pathname !== "/network" && pathname !== "/login" && !isAuthenticated) {
        access = false;
        window.location.pathname = "/login";
    }

    if (user && user.status === "Password Pending" && pathname !== "/change-password" && isAuthenticated) {
        access = false;
        window.location.pathname = "/change-password";
    }

    if (isAuthenticated && pathname === "/not-found") {
        access = false;
        window.location.pathname = '/'
    };

    access = checkPermissions(pathname);

    if (!access) window.location.pathname = "/";

    return access ? children : null;
}