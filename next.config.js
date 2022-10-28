const prod = process.env.NODE_ENV === 'production';
const withPWA = require("next-pwa")({
    dest: "public",
    disable: prod ? false : true
});

const nextConfig = withPWA({
    reactStrictMode: true,
    styledComponents: true,
    publicRuntimeConfig: {
        backendUrl: process.env.BASE_URL,
    },
});
module.exports = nextConfig;