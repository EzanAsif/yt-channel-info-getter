import React, { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [state, setState] = useState({
    searchKeyword: null,
    channelInfo: null,
  });
  const getChannelInfo = (keyword) => {
    const searchQuery = keyword.toUpperCase();
    searchQuery.split(" ").join("");
    var config = {
      method: "get",
      url: `/channelinfo/${searchQuery}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.channelInfo);
        let info = {
          name: response.data.channelInfo.author,
          desc: response.data.channelInfo.description,
          subs: response.data.channelInfo.subscriberCount,
          imgUrl: response.data.channelInfo.authorThumbnails[0].url,
        };
        setState((prevState) => ({
          ...prevState,
          channelInfo: info,
        }));
        console.log(info);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getVids = (keyword) => {
    const searchQuery = "ElliotChoy";
    // const searchQuery = keyword.toUpperCase();
    var config = {
      method: "get",
      url: `/channelvideos/${searchQuery}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log("This is videos");
        console.log(response);
        // setState((prevState) => ({
        //   ...prevState,
        // }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      This is our app
      <br />
      <input
        placeholder="Enter name of channel whose data you want to fetch"
        onChange={(e) => {
          let value = e.target.value;
          value.split(" ").join("");
          console.log(value);
          setState((prevState) => ({
            ...prevState,
            searchKeyword: value,
          }));
        }}
      />
      <button
        onClick={() => {
          console.log(state.searchKeyword);
          if (state.searchKeyword) {
            getChannelInfo(state.searchKeyword);
            getVids(state.searchKeyword);
          }
        }}
      >
        Get Data!
      </button>
      {state.channelInfo?.name ? (
        <div>Got Data</div>
      ) : (
        <div>Error finding data</div>
      )}
    </div>
  );
}

export default App;
