import { useEffect, useState } from 'react';
import Head from 'next/head';
import { API_ADDR } from '../config/constans';

export default function Home() {
  // error, isLoaded, items
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${API_ADDR}/campaign/view/get-all`)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          setItems(result.data.campaigns);
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
    return () => {
      setError(null);
      setItems([]);
      setIsLoaded(false);
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="row justify-content-around">
        <Head>
          <title>Campaigns List</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous"
          />
        </Head>
        <div class="col--md-4">
          <h4>Campaigns List</h4>
          <ul class="list-group">
            {items.map((item) => (
              <li class="list-group-item" key={item.interal_url}>
                <a href={`${item.internal_url}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
