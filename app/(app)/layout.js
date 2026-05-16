import NavBar from "../../components/NavBar";

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main">{children}</main>
    </div>
  );
}
