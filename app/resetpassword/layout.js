import FormsBackground from "@/components/Background";

export default function PageLayout({children}) {
    return <main className="auth-page"><FormsBackground/>
        {children}
    </main>
}
