import React, {useState} from "react";
import { useRouter } from "next/router";
import { User } from "../../typedefs";
import { userAgent } from "next/server";

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

  const [showNoti, setShowNoti] = useState(false);

  return (
    <header>
      <div>
        {organizations?.length >= 1 ? (
          <>
            {activeOrganization}: {""}
            {router.pathname.substring(1, router.pathname.length)}
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
              <div className="notiBox-content">

                <p>Emeka Invited You To Join Edu Concept Organization</p>
                <button>Accept</button>

              </div>

              <div className="notiBox-content">

                <p>Emeka assigned task Frontend to You</p>
                <button>Accept</button>

              </div>

              <div className="notiBox-content">

                <p>Emeka Invited You To Join Edu Concept Organization</p>
                <button>Accept</button>

              </div>

              <div className="notiBox-content">

                <p>Emeka Invited You To Join Edu Concept Organization</p>
                <button>Accept</button>

              </div>


              
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
