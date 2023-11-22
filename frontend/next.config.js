/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination:
					process.env.NODE_ENV !== 'production'
						? 'http://localhost:5000/api/:path*'
						: 'https://elmarschmittou.com/api/:path*',
			},
		];
	},
};

module.exports = nextConfig;
