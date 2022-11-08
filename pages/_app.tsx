import type { AppProps } from "next/app";
import "../styles/styles.scss";
import Layout from "../components/Layout";
import App from "next/app";
import absoluteUrl from "next-absolute-url";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout currentUser={pageProps.currentUser}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const jwt = appContext?.ctx?.req?.cookies?.PmToken || null;
  const { origin } = absoluteUrl(appContext?.ctx?.req);

  let user;

  if (jwt) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };

    const res = await fetch(`${origin}/api/users`, requestOptions);
    user = await res.json();
  }
  console.log(JSON.stringify(user));
  return {
    pageProps: {
      ...appProps.pageProps,
      currentUser: user && user.currentUser,
    },
  };
};
