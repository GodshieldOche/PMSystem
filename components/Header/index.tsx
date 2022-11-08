import React from 'react';
import { useRouter } from 'next/router';


interface Props {
    organization:string
}

const index: React.FC<Props> = ({organization}) => {
    const router = useRouter();

    const toggleSideBar = () => {
        document.querySelector('aside')?.classList.toggle('hide');
        document.querySelector('.fa-bars')?.classList.toggle('fa-close');

        if (document.querySelector('aside')?.classList.contains('hide')){
            let element = document.querySelector('.main-content') as HTMLElement;
            element.style.width = '100%'
        }
    }

    return (
        <header>
            <p>{organization} : {router.pathname.substring(1, router.pathname.length)}</p>

            <div className="user">
            <i className="fa fa-bell"></i>
            
            <img className="user-image" src="/user.png" alt="user icon"/>
            <p className="user-name">Victoria Jones</p>

            <i className="fa fa-bars" onClick={toggleSideBar}></i>

            </div>
        </header>
    )
}

export default index