import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@components/NavBar';
import './globals.css';
import ClientContextProvider from '@components/ClientContextProvider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Elmar Schmittou Photography',
	description: 'Professional photographs by Indianapolis based photographer, Elmar Schmittou.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<Script src='https://kit.fontawesome.com/5fd6832267.js' />
			</head>
			<body className={inter.className}>
				<ClientContextProvider>
					<Navbar />
					{children}
				</ClientContextProvider>
			</body>
		</html>
	);
}
