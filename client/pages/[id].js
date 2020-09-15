import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Advertisement from "./Advertisement";
import Head from "next/head";
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
            // console.log(result);
            if (result.success) {
              setItem(result.data.campaign);
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
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="row justify-content-around">
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
        </Head>
        <div className="col-md-8">
          {item.advertisement && (
            <Advertisement
              destination_url={item.destination_url}
              id={item.advertisement.id}
            />
          )}
        </div>
      </div>
    );
  }
}
