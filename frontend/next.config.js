/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination:
					process.env.NODE_ENV !== 'production'
						? 'http://localhost:5000/api/:path*'
						: 'https://elmarschmittou.com:5000/api/:path*',
			},
		];
	},
};

module.exports = nextConfig;
