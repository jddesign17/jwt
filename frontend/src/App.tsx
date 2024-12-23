import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
 

  useEffect(()=>{
      fetchData()
  },[])

  async function fetchData() {
    
    try {

      const response = await axios.get("http://localhost:3000",{
        headers:{
          "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjhmOWIyMDZlMGY4Mjg0NmFhMTgxMyIsIm5hbWUiOiJyYWphIiwiaWF0IjoxNzM0OTMyOTE0fQ.8tpYqDeIxzJYVq5sD3c0EtBO6SFbxP-KmeCnNHZtDto"
        }
      })
      console.log(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    </>
  );
};

export default App;
