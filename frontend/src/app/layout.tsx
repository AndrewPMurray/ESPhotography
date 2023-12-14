import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@components/NavBar';
import Footer from '@components/Footer';
import './globals.css';
import ClientContextProvider from '@components/ClientContextProvider';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ModalProvider } from '@context/Modal';
import { PropsWithChildren } from 'react';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Elmar Schmittou Photography',
	description: 'Professional photographs by Indianapolis based photographer, Elmar Schmittou.',
	keywords:
		'Indianapolis photographer,Indianapolis photography,Indianapolis family photographer,Indianapolis portrait photographer,Indianapolis portrait photography,Indianapolis pet photographer,Indianapolis senior photos,Indianapolis fine art photographer,Indianapolis elopement photographer,Indianapolis couples portraits,Indianapolis newborn photographer,Indianapolis pet portraits,Indianapolis candid photography,Indianapolis headshot photography,Indianapolis street photography',
	robots: 'index, follow',
};

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width viewport-fit=cover',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<body id='root' className={`${inter.className} leading-none bg-white w-screen`}>
				<ClientContextProvider>
					<ModalProvider>
						<Navbar />
						{children}
						<Footer />
					</ModalProvider>
				</ClientContextProvider>
			</body>
		</html>
	);
}
