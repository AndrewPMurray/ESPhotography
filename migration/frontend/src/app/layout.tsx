import type { Metadata } from 'next';
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
	generator:
		'Photography Photographer Photo Photos shoot fine art prints indy Indianapolis Indiana circle city Midwest portrait portraits family pet studio dog cat couple couples elope elopement senior high school portraits newborn candid street style black white nature headshot commissions Elmar schmittou best talented skilled classy',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<body className={`${inter.className} leading-none bg-white w-screen`}>
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
