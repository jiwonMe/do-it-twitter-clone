import React, { useEffect, useState } from "react";
import { dbService } from "firebase.config";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {

  const [nweetList, setNweetList] = useState([]);

  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setNweetList(newArray);
      });
  }, []);

  return (
    <div className='container'>
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweetList.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
