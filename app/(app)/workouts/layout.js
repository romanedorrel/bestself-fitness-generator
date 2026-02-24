import NavBar from '@/components/NavBar'

export default function PageLayout({children}) {
    return ( 
        <div> <NavBar/>
            {children}
        </div>
    );
}