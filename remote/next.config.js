const NextFederationPlugin = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
        removeConsole: process.env.APP_ENV === "production",
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        const remotes = {
        };
        const federationConfig = {
            name: "remote",
            filename: "static/chunks/remoteEntry.js",
            exposes: {
                "./Remote": "./src/remote-entry.ts",
            },
            remotes,
            shared: {
            },
            extraOptions: {
                exposePages: true,
            },
        };
        // console.log(federationConfig);
        config.plugins.push(new NextFederationPlugin(federationConfig));
        return config;
    },
};

module.exports = nextConfig;
