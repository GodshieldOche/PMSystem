import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


interface Props {
    smallScreen: boolean
}
const index: React.FC<Props> = ({smallScreen}) => {
  const router = useRouter();
  return (
    <aside className={smallScreen? 'hide': ''}>
        <div className="logo">PM System</div>

        <ul>
            <Link href="/dashboard"><li className={router.pathname=='/dashboard'? 'active':''}><i className="fa fa-th-large"></i>Dashboard</li></Link>
            <Link href="/projects"><li className={router.pathname.includes('/projects') ? 'active':''}><i className="fa fa-tasks"></i>Projects</li></Link>
            <Link href="/team"><li className={router.pathname.includes('/team') ? 'active':''}><i className="fa fa-users"></i>Team</li></Link>

            <hr/>

            <li className="logout"><i className="fa fa-sign-out"></i>Logout</li>
        </ul>
        
    </aside>
  )
}

export default index