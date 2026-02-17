import Background from '@/components/Background'
import styles from '../page.module.css'
import NavBar from '@/components/NavBar'

export default function PageLayout({children}) {
    return <div className='bg-parent'><NavBar/><Background/>
        {children}
    </div>
}