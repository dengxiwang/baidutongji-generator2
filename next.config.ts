import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	assetPrefix: "/",
	output: 'export',
	images: {
		unoptimized: true,
	},
	reactCompiler: true
};

export default nextConfig;
