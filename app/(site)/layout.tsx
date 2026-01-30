// app/(site)/layout.tsx
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="appShell">
      <Header />
      <main className="container main">{children}</main>
      <Footer />
    </div>
  );
}
