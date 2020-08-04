import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import axios from "axios";
import queryString from "query-string";
import Layout from "src/layout";

const fetchData = async (url) =>
  axios(`https://cors-anywhere.herokuapp.com/${url}`);

const getComic = async (num) => {
  const comic = await fetchData(`https://xkcd.com/${num}/info.0.json`);
  return comic.data;
};

const getXKCDInfo = async () => fetchData("https://xkcd.com/info.0.json");

const getRandomComic = async (xkcdInfo) => {
  const num = Math.floor(Math.random() * xkcdInfo.data.num);
  return getComic(num);
};

const NotFound = (props) => {
  const { num } = queryString.parse(props.location.search);
  const [comicInfo, setComicInfo] = useState(null);

  useEffect(() => {
    const setInfo = async () => {
      const xkcdInfo = await getXKCDInfo();
      let comic;
      if (!isNaN(num) && num <= xkcdInfo.data.num) {
        comic = await getComic(num);
      }

      if (!comic) {
        comic = await getRandomComic(xkcdInfo);
      }
      setComicInfo(comic);
    };
    setInfo();
  }, [num, setComicInfo]);

  console.log(comicInfo);
  return (
    <Layout>
      <h1>404: Page not found</h1>
      <p>Sorry, but the page could not be found.</p>
      {comicInfo && (
        <>
          <h6>Enjoy this lovely xkcd (#{comicInfo.num}) comic as you wait.</h6>
          <br />
          <img src={comicInfo.img} alt={`XKCD Comic #${comicInfo.num}`} />
        </>
      )}
      <br />
      <Link to="/">Click Here to Return to Safety</Link>
    </Layout>
  );
};

export default NotFound;
