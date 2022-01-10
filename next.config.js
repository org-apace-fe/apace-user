/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: [
			'images.pexels.com',
			'https://picsum.photos/',
			'useapace.com',
			'https://i.ibb.co/',
		],
	},
};
