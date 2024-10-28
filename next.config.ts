import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	assetPrefix: "/",
	output: 'export',
	images: {
		unoptimized: true,
	},
	experimental: {
		reactCompiler: true
	}
};

export default nextConfig;
