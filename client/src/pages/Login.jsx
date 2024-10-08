import React, { useState } from "react";
import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Container,
  Text,
  Center,
  Button,
  Stack,
  Spinner
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { apiUrl } from "../Enviroments"
import { useNavigate} from 'react-router-dom'
const Login = () => {
  const [input, setInput] = useState({
    email: localStorage.getItem("email") ||  "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(JSON.parse(localStorage.getItem("isEmailSent") || "false"))
  const [disableEmail, setDisableEmail] = useState(JSON.parse(localStorage.getItem("disableEmail") || "false"))
  const navigate = useNavigate();
  const loginHandler = async () => {
 
    if (!input.email) {
      toast.error("Email is required");
    }
    setLoading(true);
    try {
      const response = await apiUrl.post("/login", { email: input.email });
      toast.success(response.data.message);
      setIsEmailSent(true);
      setDisableEmail(true);
        localStorage.setItem("email", input.email)
        localStorage.setItem("isEmailSent", JSON.stringify(true));
        localStorage.setItem("disableEmail", JSON.stringify(true));
    } catch (err) {
       next(err);
    }
    finally{
      setLoading(false);
    }
  };


const varifyOtpHandler= async ()=>{
    if(!input.email){
        toast.error("Email is required");
    }
    if(!input.otp){
        toast.error("OTP is required");
        return;
    }
    setLoading(true);
        const response= await apiUrl.post('/varify',{email: input.email, otp:input.otp});
        if(response.data.errmessage){
          toast.error(response.data.errmessage);
          setLoading(false);
          return;
        }
        setDisableEmail(true);
        setIsEmailSent(false);
        localStorage.removeItem("isEmailSent")
        localStorage.removeItem("disableEmail")
        localStorage.removeItem("email");
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setLoading(false);
        navigate('/');
}


  return (
    <>
      <Container position="relative" h="100px">
        <Card m={5}>
          <CardBody>
            <Center>
              <Text fw={"bolder"} fontSize="3xl">
                Login
              </Text>
            </Center>

            <FormControl isRequired>
              <FormLabel> Email Address</FormLabel>
              <Input
                disabled={disableEmail}
                readOnly={disableEmail}
                type="email"
                 name="email"
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                }}
                value={input.email}
              />
            </FormControl>
            {isEmailSent && (
              <FormControl>
                <FormLabel> Email OTP</FormLabel>
                <Input
                  type="text"
                   name="otp"
                  onChange={(e) => {
                    setInput({ ...input, otp: e.target.value });
                  }}
                  value={input.otp}
                  
                />
              </FormControl>
            )}
            <FormControl>
              <Stack spacing={10} pt={2}>
                {isEmailSent ? (
                  <Button colorScheme="blue" onClick={varifyOtpHandler}>
                    {
                      loading? (
                        <Spinner size="sm" color="blue" />
                      ) : (
                        "VarifyOtp"
                      )
                    }
                  </Button>
                ) : (
                  <Button colorScheme="blue" onClick={loginHandler}>
                    {
                      loading? (
                        <Spinner size="sm" color="blue" />
                      ) : (
                        "Login"
                      )
                    }
                  </Button>
                )}
              </Stack>
            </FormControl>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Login;
