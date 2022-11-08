import React, {useEffect, useState} from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useRouter } from 'next/router';
import axios from 'axios'


interface Props {
    children: React.ReactNode,
}

const Layout: React.FC<Props> = ({children}) => {
    const [smallScreen, setSmallScreen] = useState(false);
    const [organization, setOrganization] = useState('Edu Concepts');
    const [modal, setModal] = useState(false);
    const user = '63690a8df67be17b2f936111';
    const token = '';

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        superadmin: user, 
    });

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const router = useRouter();

    const fetchUserDetails = async () =>{
        try {
            const response = await axios.get(`/api/auth?organization=${organization}&token=${token}`);
            
    
    
          } catch (error) {
            alert(error);
          }
    }

    const changeOrganization = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrganization(event.target.value);
        fetchUserDetails();
    }

    const createOrganization = async (event:  React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
   
        try {
            const response = await axios.post(`/api/organisations`, inputs, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjkwYThkZjY3YmUxN2IyZjkzNjExMSIsImVtYWlsIjoiZ2dvZHNoaWVsZEBnbWFpbC5jb20iLCJpYXQiOjE2Njc4MzM1MTF9.KO4kAwXf0GvFhRicHoi6w9xSZ5ugINFIO7ssuPkav9E'
                },
            });
            console.log(response);
            setInputs({
                name: '',
                description: '',
                superadmin: user,
            })


        } catch (error) {
            alert(error);
        }
        // fetchUserDetails();
    }
    

    useEffect(() => {
        screen.width < 900? setSmallScreen(true): setSmallScreen(false);
        // fetchUserDetails();

    }, [])
    
  return (
    <div>
        <div className="main">
            {
                !router.pathname.includes('/auth') && <>
                    <Sidebar smallScreen={smallScreen} ></Sidebar>

                    <div className="main-content">
                        <Header organization={organization}></Header>

                        <div className="main-content-dashboard">
                            <div className="account-select">
                                <div>
                                    <p>Change Organization</p>
                                    <select name="account" id="" value={organization} onChange={(event) => changeOrganization(event)}>
                                        <option value="Edu Concepts">Edu Concepts</option>
                                        <option value="Prime Concepts">Prime Concepts</option>
                                    </select>
                                </div>

                                <div>
                                    <p>Create Organization</p>
                                    <i className='fa fa-plus' onClick={() => setModal(true)}></i>
                                </div>
                                
                            </div>

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

        { modal && 
            <div className="modal-overlay" >
                <div className="verify-modal">
                    <div className="verify-modal-header">
                        <p>Create New Organization</p>
                        <i className="fa fa-close" onClick={() => setModal(false)}></i>
                    </div>

                    <label>Enter Organization Name</label><br/>
                    <input type="text" name='name' value={inputs.name} placeholder="" onChange={handleChange} /><br/>

                    <label>Description</label><br/>
                    <input type="text" name='description' value={inputs.description} placeholder="" onChange={handleChange} /><br/>

                    <button className="btn-primary" onClick={createOrganization}>Create</button>
                </div>
            </div>
        }
    </div>
    
  )
}

export default Layout