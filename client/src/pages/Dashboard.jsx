import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [ loading, setLoading] = useState(false);
  const navigate = useNavigate();
  if(!token){
      navigate('/login');
  }

const logoutHandler= async ()=>{
  setLoading(true);
  localStorage.removeItem("token");
  navigate('/login');
}




  return (
    <div>
      {" "}
      <Button colorScheme="red" onClick={logoutHandler}>
                    {
                      loading? (
                        <Spinner size="sm" color="red" />
                      ) : (
                        "Logout"
                      )
                    }
                  </Button>
    </div>
  );
};

export default Dashboard;
