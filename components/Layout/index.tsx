import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useRouter } from "next/router";
import axios from "axios";
import { User } from "../../typedefs";
import { getToken } from "../../helper";

interface Props {
  children: React.ReactNode;
  currentUser: User;
}

const Layout: React.FC<Props> = ({children, currentUser}) => {
    const [smallScreen, setSmallScreen] = useState(false);
    const [activeOrganization, setActiveOrganization] = useState('Edu Concepts');
    const [organizations, setOrganizations] = useState([]);
    const [modal, setModal] = useState(false);

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        superadmin: currentUser._id, 
    });

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const router = useRouter();

    const fetchUserDetails = async () =>{
        let token = await getToken();

        try {
            const response = await axios.get(`/api/auth?organization=${activeOrganization}&token=${token}`);
            
    
    
          } catch (error) {
            alert(error);
          }
    }

    const changeOrganization = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveOrganization(event.target.value);
        fetchUserDetails();
    }

    const createOrganization = async (event:  React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();

        let token = await getToken();   
        try {
            const response = await axios.post(`/api/organisations`, inputs, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`,
                    Accept: "application/json",
                },
            });
            if(response.status == 201){
                alert('Organization created successfully');
                setModal(false);
                setInputs({
                    name: '',
                    description: '',
                    superadmin: currentUser._id,
                });
            }else{
                alert('Issues creating organization, Try again');
            }   
            
        } catch (error) {
            alert(error);
        }
        // fetchUserDetails();
    }
    


 
    return (
        <div>
            <div className="main">
                {
                    !router.pathname.includes('/auth') && <>
                        <Sidebar smallScreen={smallScreen} ></Sidebar>

                        <div className="main-content">
                            <Header activeOrganization={activeOrganization} organizations={organizations} user={currentUser}></Header>

                            <div className="main-content-dashboard">
                                <div className="account-select">
                                    <div>
                                        <p>Change Organization</p>
                                        <select name="account" id="" value={activeOrganization} onChange={(event) => changeOrganization(event)}>
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

            

            {modal && (
                <div className="modal-overlay">
                <div className="verify-modal">
                    <div className="verify-modal-header">
                    <p>Create New Organization</p>
                    <i className="fa fa-close" onClick={() => setModal(false)}></i>
                    </div>

                    <label>Enter Organization Name</label>
                    <br />
                    <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    placeholder=""
                    onChange={handleChange}
                    />
                    <br />

                    <label>Description</label>
                    <br />
                    <input
                    type="text"
                    name="description"
                    value={inputs.description}
                    placeholder=""
                    onChange={handleChange}
                    />
                    <br />

                    <button className="btn-primary" onClick={createOrganization}>
                    Create
                    </button>
                </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
