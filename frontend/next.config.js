/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'minio.domainofaka.app',
				port: '',
				pathname: '/esphotography/**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:5000/api/:path*',
			},
		];
	},
};

module.exports = nextConfig;
