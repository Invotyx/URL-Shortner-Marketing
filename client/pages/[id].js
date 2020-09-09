import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Advertisement from './Advertisement';
import Head from 'next/head';
import { API_ADDR } from '../config/constans';
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
          },
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
          <link rel="icon" href={item.meta_image} />
          <meta name="description" content={item.meta_description} />
          <meta property="og:image" content={item.meta_image}></meta>
          <meta property="facebook:image" content={item.meta_image}></meta>
        </Head>
        <div className="col-md-6">
          <h4>Campaign</h4>
          <div className="card">
            <div className="card-header">
              <img
                className="card-img-top"
                src={item.meta_image}
                alt="Card image cap"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.meta_title}</h5>
              <p className="card-text">{item.meta_description}</p>
              <a href={item.destination_url} className="btn btn-primary">
                Go To Link
              </a>
            </div>
          </div>
        </div>
        {item.advertisement && <Advertisement id={item.advertisement.id} />}
      </div>
    );
  }
}
