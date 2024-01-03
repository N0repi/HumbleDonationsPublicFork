/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            // "assets.coingecko.com",
            // "maroon-blank-stoat-172.mypinata.cloud",
            // "raw.githubusercontent.com",
            // "arbitrum.foundation",
            // "ethereum-optimism.github.io",
            // "s2.coinmarketcap.com",
            // "pinata.cloud",
            // "mypinata.cloud",
        ],
    },
    /* Specify domains in the future */
}

module.exports = {
    transpilePackages: ["@uniswap/widgets", "@uniswap/conedison"],
    // images: {
    //     domains: [],
    //     path: '/src/assets',
    //     loader: 'default',
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "maroon-blank-stoat-172.mypinata.cloud",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "assets.coingecko.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "arbitrum.foundation",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ethereum-optimism.github.io",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "s2.coinmarketcap.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
}
