const BACKEND_URL = 'http://localhost:5000';
const FRONTEND_URL = 'http://localhost:3000';

// Target width breakpoints (150px for slider previews, 1080px for full displays)
const TARGET_WIDTHS = [150, 1080];

async function waitForServer(url, name, maxRetries = 30) {
	for (let i = 0; i < maxRetries; i++) {
		try {
			const res = await fetch(url);
			if (res.ok || res.status < 500) {
				console.log(`✅ ${name} is ready!`);
				return true;
			}
		} catch {
			// Server not listening yet
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
	throw new Error(`Timed out waiting for ${name} at ${url}`);
}

async function warmImageCache() {
	try {
		await waitForServer(`${BACKEND_URL}/api/images`, 'Backend');
		await waitForServer(FRONTEND_URL, 'Frontend');
		console.log('🔍 Fetching image records from backend...');

		// 1. Fetch images from your running Express backend
		const response = await fetch(`${BACKEND_URL}/api/images`);
		if (!response.ok) {
			throw new Error(`Backend returned status ${response.status}`);
		}

		const images = await response.json();
		const urls = images.map((img) => img.url).filter(Boolean);

		console.log(`🔥 Found ${urls.length} images. Warming Next.js image cache...`);

		// 2. Loop over each image URL and hit Next.js's Image Optimization endpoint
		for (const url of urls) {
			for (const width of TARGET_WIDTHS) {
				const nextImageUrl = `${FRONTEND_URL}/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`;
				try {
					const cacheRes = await fetch(nextImageUrl);
					if (cacheRes.ok) {
						console.log(`[Cached ${width}px]: ${url}`);
					} else {
						console.warn(`[Failed ${cacheRes.status}]: ${url}`);
					}
				} catch (err) {
					console.error(`[Error fetching ${width}px]:`, err.message);
				}
			}
		}

		console.log('✅ Image cache warming complete!');
	} catch (err) {
		console.error('❌ Warmup failed:', err.message);
	}
}

warmImageCache();
