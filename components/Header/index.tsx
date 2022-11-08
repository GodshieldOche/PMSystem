import React from "react";
import { useRouter } from "next/router";
import { User } from "../../typedefs";
import { userAgent } from "next/server";

interface Props {
  organizations: any[];
  activeOrganization: string,
  user: User;
}

const index: React.FC<Props> = ({ organizations, user, activeOrganization }) => {
  const router = useRouter();

  const toggleSideBar = () => {
    document.querySelector("aside")?.classList.toggle("hide");
    document.querySelector(".fa-bars")?.classList.toggle("fa-close");

    if (document.querySelector("aside")?.classList.contains("hide")) {
      let element = document.querySelector(".main-content") as HTMLElement;
      element.style.width = "100%";
    }
  };

  return (
    <header>
      <div>
        {organizations.length >= 1 ? (
          <>
            {activeOrganization} :{organizations[0]}
            {router.pathname.substring(1, router.pathname.length)}
          </>
        ) : (
          <div>Add or Join an Organisation</div>
        )}
      </div>

      <div className="user">
        <i className="fa fa-bell"></i>

        <img className="user-image" src="/user.png" alt="user icon" />
        <p className="user-name">{user?.fullName}</p>

        <i className="fa fa-bars" onClick={toggleSideBar}></i>
      </div>
    </header>
  );
};

export default index;
