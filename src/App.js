import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
const urlParams = new URLSearchParams(window.location.search);
const limit = urlParams.get("limit") || 6;
const q = urlParams.get("q") || 'showrecent';
const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-11?limit=${limit}&q=${q}`)
    .then((res) => {
        return res.json();
      })
      .then((data) => {
        try {
       //   const parsedData = JSON.parse(data);
          setData(data);
        } catch (error) {
          console.log("Invalid JSON format:", error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.createdDateTime}>
          <h3 style={{ color: "brown" }}> {item.createdDateTime} ---- model: <span style={{ color: "blue", fontSize: "24px" }}>{item.model}</span></h3>
          <h4 style={{ color: "green" }}>{item.question}</h4>
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default App;
