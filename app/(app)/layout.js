import FormsBackground from "@/components/FormsBackground";

export default function AppLayout({ children }) {
  return (
    <FormsBackground>
        <div className="app-container">
            {children}
        </div>
    </FormsBackground>
  );
}