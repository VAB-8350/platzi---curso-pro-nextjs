import { ProviderAuth } from '@hooks/useAuth';
import MainLayour from '@layout/MainLayout';
import '@styles/tailwind.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ProviderAuth>
				<MainLayour>
					<Component {...pageProps} />
				</MainLayour>
			</ProviderAuth>
		</>
	);
}
