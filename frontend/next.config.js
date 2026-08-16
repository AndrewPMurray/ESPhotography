/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['swiper'],
	distDir: 'build',
	images: {
		imageSizes: [16, 32, 48, 64, 96, 128, 150, 256, 384],
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
