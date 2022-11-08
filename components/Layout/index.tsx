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
  const [activeOrganization, setActiveOrganization] = useState(
    currentUser?.organisations[0]?.organisationId?.name
  );
  const [organizations, setOrganizations] = useState<any>(
    currentUser?.organisations
  );
  const [modal, setModal] = useState(false);
  const user = "63690a8df67be17b2f936111";
  const token = "";

  //   useEffect(() => {
  //     setActiveOrganization(currentUser?.organisations[0]?.organisationId?.name);
  //     setOrganizations(currentUser?.organisations);
  //   }, [currentUser]);

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    superadmin: user,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const router = useRouter();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `/api/auth?organization=${activeOrganization}&token=${token}`
      );
    } catch (error) {
      alert(error);
    }
  };

  const changeOrganization = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveOrganization(event.target.value);
    fetchUserDetails();
  };

  const createOrganization = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/organisations`, inputs, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Bearer:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjkwYThkZjY3YmUxN2IyZjkzNjExMSIsImVtYWlsIjoiZ2dvZHNoaWVsZEBnbWFpbC5jb20iLCJpYXQiOjE2Njc4MzM1MTF9.KO4kAwXf0GvFhRicHoi6w9xSZ5ugINFIO7ssuPkav9E",
        },
      });
      console.log(response);
      setInputs({
        name: "",
        description: "",
        superadmin: user,
      });
    } catch (error) {
      alert(error);
    }
    // fetchUserDetails();
  };

  return (
    <div>
      <div className="main">
        {!router.pathname.includes("/auth") && (
          <>
            <Sidebar smallScreen={smallScreen}></Sidebar>

            <div className="main-content">
              <Header
                activeOrganization={activeOrganization}
                organizations={organizations}
                user={currentUser}
              ></Header>

              <div className="main-content-dashboard">
                <div className="account-select">
                  <div>
                    <p>Change Organization</p>
                    <select
                      name="account"
                      id=""
                      value={activeOrganization}
                      onChange={(event) => changeOrganization(event)}
                    >
                      {organizations?.map((item: any, index: number) => (
                        <option key={index} value={item.organisationId.name}>
                          {item.organisationId.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p>Create Organization</p>
                    <i
                      className="fa fa-plus"
                      onClick={() => setModal(true)}
                    ></i>
                  </div>
                </div>

                {children}
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
