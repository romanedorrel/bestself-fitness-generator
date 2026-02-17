'use client'
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavBar() {
    const path = usePathname();
    //returns navbar for navigating through the application
    return (
        <nav className='NavBar'style={{backgroundColor: '#09193b', color: '#14bbe5'}}>
        <ul className='menu'> 
           <li><Link href='/workouts' className={path.startsWith('/workouts') ? 'active' : null}>Workouts</Link></li> 
           <li><Link href='/meals' className={path.startsWith('/meals') ? 'active' : null}>Meals</Link></li>
           <li ><button className='logout' onClick={() => signOut()}>Log out</button></li>
        </ul>
        <Link href='/deleteuser' className='signup'>Delete</Link>
        </nav>
        
        
    )
}

export default NavBar;