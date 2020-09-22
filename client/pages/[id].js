import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Advertisement from "../components/Advertisement";
import NoAdvertisement from "../components/NoAdvertisement";
import Head from "next/head";
import Loader from "../components/Loader";
import AdFooter from "../components/AdFooter";
// import Error from "../components/Error";
import Error from "next/error";
import { API_ADDR } from "../config/constans";
export default function Campaign() {
  const router = useRouter();

  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetch(`${API_ADDR}/campaign/view/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              setItem(result.data.campaign);
            } else {
              setError(result);
            }
            setIsLoaded(true);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
    return () => {
      setError(null);
      setItem({});
      setIsLoaded(false);
    };
  }, [router.query]);

  if (error) {
    return <Error statusCode="404" error={error.message}></Error>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    let footer = false;
    if (
      !item.advertisement ||
      item.advertisement.subscription.plan.title == "Cause"
    ) {
      footer = true;
    }
    return (
      <div className="row ">
        <Head>
          <title>{item.meta_title}</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous"
          />
          <link rel="icon" href={item.meta_image} />
          <meta name="description" content={item.meta_description} />
          <meta property="og:image" content={item.meta_image}></meta>
          <meta property="facebook:image" content={item.meta_image}></meta>
          <meta property="image" content={item.meta_image}></meta>
        </Head>
        <div
          className="col-sm-12 "
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {item.advertisement ? (
            <Advertisement
              advertisement={item.advertisement}
              destination_url={item.destination_url}
              id={item.advertisement.id}
            />
          ) : (
            <NoAdvertisement destination_url={item.destination_url} />
          )}
        </div>
        {footer ? <AdFooter advertisement={item.advertisement} /> : <div></div>}
      </div>
    );
  }
}
