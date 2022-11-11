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

const Layout: React.FC<Props> = ({ children, currentUser }) => {
  const [smallScreen, setSmallScreen] = useState(false);

  const [activeOrganization, setActiveOrganization] = useState<any>({});
  const [user, setUser] = useState(currentUser);


  const [organizations, setOrganizations] = useState(
    user?.organisations
  );
  const [organizationDetails, setOrganizationDetails] = useState([]);

  const [modal, setModal] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    superAdmin: currentUser?._id,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const router = useRouter();

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
      setOrganizationDetails(response.data);
      setActiveOrganization(response.data.organisation);

    } catch (error) {
      console.log(error);
    }
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
    setUser(res.data.currentUser);
    return res.data.currentUser;


  }

  useEffect(() => {
    getCurrentUser().then((user)=>
    {
      let active: any = localStorage.getItem("activeOrganization");
      if (active !== null) {
        active = JSON.parse(active);
        fetchOrganizationDetails(active._id);
        setActiveOrganization(active);
      } else {
        fetchOrganizationDetails(
          user?.organisations[0]?.organisationId?._id
        );
        setActiveOrganization(user?.organisations[0]?.organisationId);
      }
    });
    
  }, [user?.length]);

  const changeOrganization = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    const organization = organizations.find(
      (item) => item?.organisationId?._id === id
    );
    setActiveOrganization(organization?.organisationId);
    fetchOrganizationDetails(organization?.organisationId._id);
    localStorage.setItem(
      "activeOrganization",
      JSON.stringify(organization?.organisationId)
    );
  };

  const createOrganization = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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
      if (response.status == 201) {
        alert("Organization created successfully");
        location.reload();
        setModal(false)
      } else {
        alert("Issues creating organization, Try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="main">
        {!router.pathname.includes("/auth") && (
          <>
            <Sidebar smallScreen={smallScreen}></Sidebar>

            <div className="main-content">
              <Header
                activeOrganization={activeOrganization?.name}
                organizations={organizations}
                user={user}
              ></Header>

              <div className="main-content-dashboard">
                <div className="account-select">
                  <div>
                    <p>Change Organization</p>
                    <form>
                      <select
                        placeholder={activeOrganization?.name}
                        // value={activeOrganization.name}
                        onChange={changeOrganization}
                      >
                        {organizations.map((item, index) => (
                          <option key={index} value={item?.organisationId?._id}>
                            {item?.organisationId?.name}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>

                  <div>
                    <p>Create Organization</p>
                    <i
                      className="fa fa-plus"
                      onClick={() => setModal(true)}
                    ></i>
                  </div>
                </div>

                {React.cloneElement(children as React.ReactElement<any>, {
                  user: user,
                  organisation:organizationDetails,
                  activeorganization:activeOrganization
                })}

              </div>
            </div>
          </>
        )}

        {router.pathname.includes("/auth") && <>{children}</>}
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
