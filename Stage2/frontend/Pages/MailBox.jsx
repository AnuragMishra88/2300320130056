import React, { useState, useEffect } from 'react';

function MailBox() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const token = import.meta.env.VITE_TOKEN; 
       

        const res = await fetch("http://localhost:3000/productswithpriority", {
      
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          
        });
        console.log(res.data);

        if (res.ok) {
          const data = await res.json();
          setResponse(data.output);
        } else {
          console.error("Server error:", res.status);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchData(); 
  }, []);
  console.log({response});

  return (
    <div className="mailbox">
      {response.map((item, index) => (
        <p key={index}>{JSON.stringify(item)}</p>
      ))}
    </div>
  );
}

export default MailBox;
