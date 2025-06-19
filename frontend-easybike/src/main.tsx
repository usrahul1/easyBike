import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { FirebaseProvider } from "./context/Firebase.tsx";
import { ThemeProvider } from "./context/Admin Context/themeContext.tsx";
import { AppWrapper } from "./components/Admin/components/common/PageMeta.tsx";
import { pdfjs } from "react-pdf";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<AppWrapper>
				<BrowserRouter>
					<FirebaseProvider>
						<App />
					</FirebaseProvider>
				</BrowserRouter>
			</AppWrapper>
		</ThemeProvider>
	</StrictMode>
);
