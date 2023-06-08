import { Box, Button, Typography, styled, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginBox from "../login/LoginBox";
import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  margin: '0 3% 0 auto',
  '& > *': {
    marginRight: '40px |important',
    fontSize: 14,
    alignItems: 'center'
  },
  [theme.breakpoints.down('md')] : {
    display: 'block',
    
}
}))

const Container = styled(Link)(({theme}) => ({
    display: 'flex',
    width: 170,
    marginLeft: 10,
    textDecoration: 'none',
    color: 'inherit',
    [theme.breakpoints.down('md')] : {
        display: 'block',
        marginLeft: 0
    }
}))

const ExtraText = styled(Typography)(({theme}) => ({
    marginTop: 6,
    width: 150,
    marginLeft: 65,
    [theme.breakpoints.down('md')] : {
        marginLeft: 0,
        marginTop: 20
    }
}))

const LoginButton = styled(Button)`
  color: #ffffff;
  bacground: #2874f0;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
`;
const CustomButtons = () => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);

  const {cartItems} = useSelector(state => state.cart);

  const openDialog = () => {
    setOpen(true);
  };
  return (
    <Wrapper>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton variant="contained" onClick={() => openDialog()}>
          Login
        </LoginButton>
      )}

      <ExtraText >
        Become a Seller
      </ExtraText>
      <ExtraText >
        More
      </ExtraText>

      <Container to="/cart">
        <ExtraText style={{display: 'flex'}}>
        <Badge badgeContent={cartItems?.length} color="error">
        <ShoppingCartIcon style={{ marginTop: 6 }} />
        </Badge>
        <Typography style={{ marginTop: 6, marginLeft: 10 }}>Cart</Typography>
        </ExtraText>
      </Container>
      <LoginBox open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButtons;
