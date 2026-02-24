import Background from "@/components/Background";

export default function AppLayout({ children }) {
  return (
    <Background>
        <div className="app-container">
            {children}
        </div>
    </Background>
  );
}