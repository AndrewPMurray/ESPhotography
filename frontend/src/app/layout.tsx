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
	keywords: `
				professional photographer,professional photography,Photography,
				Photographer,Indianapolis Photographer,Photo,Photos,photoshoot,indianapolis photos,
				fine art,art,photo art,prints,indy photographer,indy photos,Indianapolis Photographer,
				Indiana Photographer,circle city photographer,Midwest photographer,portrait,portraits,
				family,family portraits,family photographer,indianapolis family photographer,
				pet photographer,photo studio,dog photographer,
				indianapolis dog photographer,cat photographer,
				indianapolis cat photographer,couple photography,couples photography,
				indianapolis couples photography,elope photographs indiana,elopement photography,
				senior high school portraits,high school portraits,school portraits,newborn photography,
				newborn photographer,indianapolis newborn photographer,candid photos,candid photographs,
				candid photography,street style photographs,street style photography,black white photography
				,black white photographs,nature photography,photo headshot,photography commissions,Elmar,
				elmar schmittou,best photographer,best indianapolis photographer,best indianapolis photography,
				talented photographer,skilled photographer,skilled indiana photographer,
				classy photographs indianapolis,classy photography indiana
				`,
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
