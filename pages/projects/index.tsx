import React, { useEffect, useState } from "react";
import type { AppProps } from 'next/app';
import axios from "axios";
import { User } from "../../typedefs";
import { getToken } from "../../helper";

export default function App(props:any) {
    const currentUser = props.currentUser;
    const [modal, setModal] = useState(false);
    const [activeOrganization, setActiveOrganization] = useState<any>([]);
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        organisation: activeOrganization._id,
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const fetchOrganizationDetails = async (id: any) => {
    let token = await getToken();

    try {
      const response = await axios.get(`/api/organisations/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
          Accept: "application/json",
        },
      });
      setActiveOrganization(response.data.organisation);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    let active: any = localStorage.getItem("activeOrganization");
    if (active !== null) {
      active = JSON.parse(active);
      fetchOrganizationDetails(active._id);
    } else {
      fetchOrganizationDetails(
        currentUser?.organisations[0]?.organisationId._id
      );
    }
  }, [currentUser?.organisations]);
  

  const createProject = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    let token = await getToken();
    try {
      const response = await axios.post(`/api/projects`, inputs, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
          Accept: "application/json",
        },
      });
      if (response.status == 201) {
        alert("Project created successfully");
        location.reload();
      } else {
        alert("Issues creating Project, Try again");
      }
    } catch (error) {
      alert(error);
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
                Open Projects
            </p>

            <div className="transactions-card">
                <div className="start">
                    <i className="fa fa-arrow-down"></i>
                    <div className="details">
                        <p>Cash Application</p>
                        <p className="amount">3 members</p>
                    </div>
                </div>

                <div className="end">
                    <p className="date">Oct 25</p>
                    <p className="coin-amount">Issues: 4</p>
                    
                </div>

            </div>

            <p className="today">
                Completed Projects
            </p>

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