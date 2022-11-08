import React, {useEffect, useState} from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useRouter } from 'next/router';

interface Props {
    children: React.ReactNode,
}

const Layout: React.FC<Props> = ({children}) => {
    const [smallScreen, setSmallScreen] = useState(false);

    const router = useRouter()

    useEffect(() => {
        screen.width < 900? setSmallScreen(true): setSmallScreen(false);

    }, [])
    
  return (
    <div className="main">
        {
            !router.pathname.includes('/auth') && <>
                <Sidebar smallScreen={smallScreen} ></Sidebar>

                <div className="main-content">
                    <Header organization='Edu Concepts'></Header>

                    <div className="main-content-dashboard">

                        {children}

                    </div>
                </div>   
            </>
        }

        {
            router.pathname.includes('/auth') && <>
                

                {children}
            </>
        }
            
    </div>
  )
}

export default Layout