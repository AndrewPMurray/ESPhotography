/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['swiper'],
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

export default nextConfig;
