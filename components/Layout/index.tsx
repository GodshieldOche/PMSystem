import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useRouter } from "next/router";
import { User } from "../../typedefs";
import { getToken } from "../../helper";

interface Props {
  children: React.ReactNode;
  currentUser: User;
}

const Layout: React.FC<Props> = ({ children, currentUser }) => {
  const [smallScreen, setSmallScreen] = useState(false);

  //   const hello = async () => {
  //     const result = await getToken();
  //     console.log(result);
  //   };

  //   useEffect(() => {
  //     hello();
  //   }, []);

  const router = useRouter();

  useEffect(() => {
    screen.width < 900 ? setSmallScreen(true) : setSmallScreen(false);
  }, []);

  return (
    <div className="main">
      {!router.pathname.includes("/auth") && (
        <>
          <Sidebar smallScreen={smallScreen}></Sidebar>

          <div className="main-content">
            <Header organizations={[]} user={currentUser}></Header>

            <div className="main-content-dashboard">{children}</div>
          </div>
        </>
      )}

      {router.pathname.includes("/auth") && <>{children}</>}
    </div>
  );
};

export default Layout;
