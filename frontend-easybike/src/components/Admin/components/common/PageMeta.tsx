import type { ReactNode } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

interface PageMetaProps {
	title: string;
	description: string;
}

const PageMeta = ({ title, description }: PageMetaProps): JSX.Element => (
	<Helmet>
		<title>{title}</title>
		<meta name="description" content={description} />
	</Helmet>
);

interface AppWrapperProps {
	children: ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps): JSX.Element => (
	<HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
