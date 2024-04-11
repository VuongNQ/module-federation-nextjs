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
  images: {
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const remotes = {
      remoteApp: `remoteApp@http://localhost:3001/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
    };
    const federationConfig = {
      name: "shell",
      filename: "static/chunks/remoteEntry.js",
      exposes: {
      },
      remotes,
      shared: {},
      extraOptions: {
        // exposePages: true,
      },
    };
    // console.log(federationConfig);
    config.plugins.push(new NextFederationPlugin(federationConfig));
    return config;
  },
};

module.exports = nextConfig;
