import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
const App = () => {
const [data, setData] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [isLoading, setIsLoading] = useState(false);
const rowCount = data.length;
const [limit, setLimit] = useState('6');


  useEffect(() => {
    console.log(searchQuery);
    const q = searchQuery.replace(/ /g, "-");
    if (q === "") {
      return;
    }
    setIsLoading(true);
    
    fetch(`https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-12?limit=${limit}&query=${q}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        try {
          //   const parsedData = JSON.parse(data);
          setData(data);
          setIsLoading(false);
        } catch (error) {
          console.log("Invalid JSON format:", error);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [searchQuery, limit]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };



  return (
    <div>
      <input id="searchInput" style={{ fontSize: "18px", height: "10%", width: "60%", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" }} type="text" onKeyDown={(event) => event.key === "Enter" && handleSearchChange(event)} placeholder="Search..." />
      <label htmlFor="limitInput">    Rows Limit:</label>
      <input id="limitInput" style={{ width: "10%", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" }} type="text" onKeyDown={(event) => event.key === "Enter" && handleLimitChange(event)} placeholder="6" />
      <div>
        {isLoading && <p> Loading Data...</p>}
        {/* Rest of your component */}
      </div>
      <h5 style={{ color: "green" }}> Total Rows: {rowCount}</h5>
      {data.map((item) => (
        <div key={item.createdDateTime}>
          {item.Relatedness && (
              <span style={{ color: "orange", fontSize: "12px" }}>Relatedness: {item.Relatedness}</span>
          )}
          <div style={{ border: "1px dotted black", padding: "2px" }}>
            <p style={{ color: "grey" }}>{item.question}</p>
          </div>
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default App;
