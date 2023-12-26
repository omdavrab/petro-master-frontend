import { useRouter } from "next/router";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/admin/AdminLayout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import Loader from "@/components/admin/Loader";
import Head from "next/head";
import { useEffect, useState } from "react";
import Notification from "../components/Notification";

config.autoAddCss = false;
export default function App({ Component, pageProps, initialTheme }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
    };

    const stopLoading = () => {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    };

    // Subscribe to route change events to show/hide the loader
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    router.events.on("routeChangeError", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
      router.events.off("routeChangeError", stopLoading);
    };
  }, []);
  useEffect(() => {
    const time = setInterval(() => {
      const currentTime = Date.now();
      const expirationTime = sessionStorage.getItem("expiration_time");
      const matchResult = router.pathname.match(
        /\/\[[a-zA-Z_]+\]\/\[[a-zA-Z_]+\]/
      );
      const desiredString = matchResult ? matchResult[0] : null;

      if (expirationTime && Number(expirationTime) <= currentTime) {
        sessionStorage.clear();
        localStorage.clear();
        if (desiredString === "/[table_id]/[restaurant_id]") {
          window.location.href = `/`;
          // router.push(`/${table_id}/${restaurant_id}`);
        } else {
          router.push("/admin/login");
          // window.location.href = "/admin/login";
        }
      }
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="spinner"></div>
        </div>
      )}
      <ToastContainer style={{ zIndex: "99999" }} className="z-[999]" />
      <Provider store={store}>
        <Notification />
        <Loader />
        {router.pathname === "/" ||
        router.pathname === "/admin/onboarding/personaldetail" ||
        router.pathname === "/admin/login" ||
        router.pathname === "/admin/register" ||
        router.pathname === "/admin/forgotpassword/new_password" ||
        router.pathname === "/error_404" ||
        router.pathname === "/admin/forgotpassword" ||
        router.pathname === "/admin/resetpassword" ||
        router.pathname === "/admin/verification" ||
        router.pathname === "/admin/register/verification" ||
        router.pathname === "/admin/restaurant-detail" ? (
          <Component {...pageProps} />
        ) : (
          <ThemeProvider attribute="class" defaultTheme={initialTheme}>
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          </ThemeProvider>
        )}
      </Provider>
    </>
  );
}
export const getServerSideProps = async () => {
  // get the initial theme from the server-side props
  const initialTheme = "light"; // set this to the system theme if you want to use it

  return { props: { initialTheme } };
};
