import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import { User } from "../../typedefs";
import { userAgent } from "next/server";
import { getToken } from "../../helper";
import axios from "axios";


interface Props {
  organizations: any[];
  activeOrganization: string;
  user: User;
}

const index: React.FC<Props> = ({
  organizations,
  user,
  activeOrganization,
}) => {
  const router = useRouter();

  const toggleSideBar = () => {
    document.querySelector("aside")?.classList.toggle("hide");
    document.querySelector(".fa-bars")?.classList.toggle("fa-close");

    if (document.querySelector("aside")?.classList.contains("hide")) {
      let element = document.querySelector(".main-content") as HTMLElement;
      element.style.width = "100%";
    }
  };

  const acceptInvite = async (id:any) =>{
    let token = await getToken();
    const response = await axios.post(
      `/api/invite/accept`,
      {
        organisation: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
          Accept: "application/json",
        },
      }
    );

    if (response.status == 200) {
      alert("Invite accepted successfully");
      location.reload();
    } else {
      alert("Issues accepting invite, Try again");
    }
  }

  const messages = user?.inbox;
  

  const [showNoti, setShowNoti] = useState(false);

  return (
    <header>
      <div>
        {organizations?.length >= 1 ? (
          <>
            {activeOrganization}: {""}
            {router.pathname.substring(1, router.pathname.length).toUpperCase()}
          </>
        ) : (
          <div>Add or Join an Organisation</div>
        )}
      </div>

      <div className="user">
        <i className="fa fa-bell" onClick={()=>setShowNoti(!showNoti)}>
          <i className="fa fa-circle"></i>

          {showNoti && 
            <div className="notiBox fine-scrollbar">
              <h6>Notifications</h6>
              {messages.length?

                messages.map((item,index) =>{
                  return <div key={index} className="notiBox-content">

                  <p>{item.message}</p>
                  <button onClick={() => acceptInvite(item.organisation)}>Accept</button>

                  </div>
                }):

                <p className="empty">No Notifications</p>
              }

            </div>
          }
        
        </i>

        <img className="user-image" src="/user.png" alt="user icon" />
        <p className="user-name">{user?.fullName}</p>

        <i className="fa fa-bars" onClick={toggleSideBar}></i>
      </div>
    </header>
  );
};

export default index;
