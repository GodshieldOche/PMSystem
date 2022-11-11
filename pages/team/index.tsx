import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../helper";

export default function App(props:any) {
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<any[]>([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    let token = await getToken();
    const response = await axios.get(`api/users/${search}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
        Accept: "application/json",
      },
    });
    setSearchedUsers(response.data.users);
  };

  const inviteMember = async () => {
    let token = await getToken();
    const response = await axios.post(
      `/api/invite`,
      {
        email: search,
        organisationId: props.organisation?.organisation?._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
          Accept: "application/json",
        },
      }
    );

    if (response.status == 201) {
            alert("Invitation Sent successfully");
            setSearch('');
    } else {
        alert("Issues Sending Invitation, Try again");
    }
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
      setTeams(response.data.organisation.members);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    
    let active: any = localStorage.getItem("activeOrganization");
    if (active !== null) {
        active = JSON.parse(active);
        fetchOrganizationDetails(active._id);
    } else {
        fetchOrganizationDetails(
            props.user?.organisations[0]?.organisationId?._id
        );
    }

  }, [props.user?.length]);

  return (
    <div className="team">
      <div className="intro">
        <p className="">Team Members</p>
        <div className="add-member">
          <p>Add Member:</p>
          <form>
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Enter User Email"
            />
            {search && (
              <div className="dropdown">
                <ul>
                  {searchedUsers?.map((user, index) => {
                    return (
                      <li key={index} onClick={() => setSearch(user.email)}>
                        {user.email}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </form>
          <i className="fa fa-plus" onClick={inviteMember}></i>
        </div>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Working On</th>
              <th>Assigned</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team, index) => {
              return (
                <tr key={index}>
                  <td>{team.userId.fullName}</td>
                  <td>{team.userId.email}</td>
                  <td>{team.userId.workingOn}</td>
                  <td>{team.userId.assigned}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
