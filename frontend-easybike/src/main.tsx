import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { FirebaseProvider } from "./context/Firebase.tsx";
import { ThemeProvider } from "./context/Admin Context/themeContext.tsx";
import { AppWrapper } from "./components/Admin/components/common/PageMeta.tsx";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";

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
