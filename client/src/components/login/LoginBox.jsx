import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { useState, useContext } from "react";
import { authenticateSignup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
`;

const Image = styled(Box)`
  background: #070707
    url(https://images.unsplash.com/photo-1677362651362-a371122c7ae2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=60)
    center 85% no-repeat;
  height: 100%;
  width: 20%;
  padding: 45px 35px;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  margin-left: 15px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateNewAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  cursor: pointer;
`;

const Error = styled(Typography)`
   font-size: 10px;
   color: #ff6161;
   line-height: 0;
   margin-top: 10px;
   font-weight: 600;
`;

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subheading: 'Get access to your orders, wishlist and recommendations.'
    },
    signup: {
        view: 'signup',
        heading: 'Welcome to GoBuyNow!',
        subheading: 'Sign up with your mobile number to get started'
    }
}

const signupInitialValues = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  phone: ''
}

const loginInitialValues = {
  username: '',
  password: ''
}

const LoginBox = ({ open, setOpen }) => {

  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues)
  const [login, setLogin] = useState(loginInitialValues)
  const [error, setError] = useState(false);
  const {setAccount} = useContext(DataContext)

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  }

  const onInputChange = (e) => {
    setSignup({...signup, [e.target.name]: e.target.value})
  }

  const signupUser = async () => {
    let response = await authenticateSignup(signup)
    if(!response){
      handleClose();
      setAccount(signup.firstname)
    }
  }

  const onValueChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value })
  }

  const loginUser= async() => {
    let response = await authenticateLogin(login);
    console.log(response)
    if(response.status === 200) {
      handleClose();
      setAccount(response.data.data.firstname);
    } else{
      setError(true);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset", maxHeight: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "82.8%" }}>
          <Image>
            <Typography
              variant="h5"
              style={{ color: "white", fontWeight: "600" }}
            >
              {account.heading}
            </Typography>
            <Typography
              style={{ marginTop: 20, color: "white", fontWeight: "600" }}
            >
              {account.subheading}
            </Typography>
          </Image>
          {account.view === 'login' ? (
            <Wrapper>
              <TextField variant="standard" onChange={(e) => onValueChange(e)} name='username' label="Enter Username" />
              {error && <Error>Please enter valid username or password</Error>}
              <TextField variant="standard" onChange={(e) => onValueChange(e)} name='password' label="Enter Password" />
              <Text>
                Your use of GoBuyNow's services implies your acceptance of their
                Terms of Use and Privacy policy
              </Text>
              <LoginButton onClick={() => loginUser()}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP>Get OTP</RequestOTP>
              <CreateNewAccount onClick={() => toggleSignup()}>
                New to GoBuyNow? Create an account
              </CreateNewAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label="Enter Firstname" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label="Enter Lastname" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label="Enter Username" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label="Enter Email" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Enter Password" />
              <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label="Enter Phone" />
              <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginBox;
