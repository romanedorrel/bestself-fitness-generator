import FormsBackground from "@/components/FormsBackground";

export default function PageLayout({children}) {
    return <div className='bg-parent'><FormsBackground/>
        {children}
    </div>
}