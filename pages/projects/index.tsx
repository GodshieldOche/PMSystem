import React, { useEffect, useState } from "react";
import type { AppProps } from 'next/app';
import axios from "axios";
import { User } from "../../typedefs";
import { getToken } from "../../helper";

export default function App(props:any) {
    const [modal, setModal] = useState(false);
    const [activeOrganization, setActiveOrganization] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<any>([]);
    const [projects, setProjects] = useState<any>([]);

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const getCurrentUser = async () =>{
    let token = await getToken();

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    const res = await axios.get(`/api/users`, requestOptions);
    setCurrentUser(res.data.currentUser);
    return res.data.currentUser;
  }
  useEffect(() => {
    setProjects(props.organisation?.organisation?.projects);  
      console.log(props.organisation.organisation)
  }, [])
  

 
  

  const createProject = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    let token = await getToken();
    try {
      const response = await axios.post(`/api/projects`, {name:inputs.name, description: inputs.description, organisation:props.organisation?.organisation?._id}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
          Accept: "application/json",
        },
      });
      if (response.status == 201) {
        alert("Project created successfully");
        location.reload();
        setModal(false);
      } else {
        alert("Issues creating Project, Try again");
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  return (

    <div>
        <div className="stats">
        
            <div className="stats-cards">
                <p>Team</p>
                <h3>5</h3> 
            </div>

            <div className="stats-cards">
                <p>Open Issues</p>
                <h3>5</h3> 
            </div>

            <div className="stats-cards">
                <p>Completed Issues</p>
                <h3>5</h3> 
            </div>

        </div>

        <div className="transactions">
            <div className="history">
                <p> Projects History</p>
                <i className="fa fa-plus" onClick={()=>setModal(true)}>

                </i>
            </div>

            <p className="today">
              Projects
            </p>

            {projects?.length? 
            
              projects.map((proj:{name:string, issues:number, date:Date, status:boolean},index:number) =>{ return <div key={index} className="transactions-card">
                    <div className="start">
                        <i className={proj.status? "fa fa-arrow-down": "fa fa-arrow-up"}></i>
                        <div className="details">
                            <p>{proj.name}</p>
                            <p className="amount">3 members</p>
                        </div>
                    </div>

                    <div className="end">
                        <p className="date">Oct 25</p>
                        <p className="coin-amount">Issues: {proj.issues}</p>
                        
                    </div>

                </div>}): <p>No Projects Yet</p>
            
            }

            

            {/* <p className="today">
                Completed Projects
            </p>
            {projects && !projects.status 
            
            &&
              <div className="transactions-card">
                  <div className="start">
                      <i className="fa fa-arrow-up"></i>
                      <div className="details">
                          <p>CoinSys Website</p>
                          <p className="amount">3 members</p>
                      </div>
                  </div>

                  <div className="end">
                      <p className="date">Oct 25</p>
                      <p className="coin-amount">Issues: 4</p>
                      
                  </div>

              </div>
            } */}

        </div>

        {modal && (
        <div className="modal-overlay">
          <div className="verify-modal">
            <div className="verify-modal-header">
              <p>Create New Project</p>
              <i className="fa fa-close" onClick={() => setModal(false)}></i>
            </div>

            <label>Enter Project Name</label>
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

            <button className="btn-primary" onClick={createProject}>
              Create
            </button>
          </div>
        </div>
      )}

    </div>
  )
}