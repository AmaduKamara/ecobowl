export const UnAuthRoutes = (route) => {
    switch (route) {
        case "/verify":
            return true;

        case "/resend-token":
            return true;

        default:
            return false;
    }
}