import "../../public/css/global.css";
import InstallBootstrap from "../components/InstallBootstrap";

export const metadata = {
  title: "Mi React ERP",
  description: "React ERP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <InstallBootstrap />
        {children}
        </body>
    </html>
  );
}
