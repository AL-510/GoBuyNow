import { Box, Button, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { useState } from "react";
import { payusingpaytm } from "../../service/api";
import { post } from "../../utils/paytm";

const LeftContainer = styled(Box)(({theme}) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}))

const Image = styled("img")({
  padding: '15px',
});

const StyledButton = styled(Button)(({theme}) => ({
    width: '46%',
    height: 50,
    borderRadius: 2,
    [theme.breakpoints.down('lg')]: {
        width: '44%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '46%'
    }
}))

const ActionItem = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const {id} = product;

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity))
    navigate('/cart')
  }

  const buyNow = async() => {
    let response = await payusingpaytm({amount: 500, email: 'achyutlath@gmail.com'});
    let information = {
      action: 'https://securegw-stage.paytm.in/order/process',
      params: response
    }
    post(information);
}

  return (
    <LeftContainer>
      <Box style={{ padding: "15px 20px", border: "1px solid #f0f0f0", width: "90%"}}>
        <Image src={product.detailUrl} alt="product" />
      </Box>
      <StyledButton variant="contained" onClick={() => addItemToCart()} style={{ background: "#ff9f00", marginTop: 5 }}>
        <Cart />
        Add to Cart
      </StyledButton>
      <StyledButton
        variant="contained"
        onClick={() => buyNow()}
        style={{ background: "#fb541b", marginLeft: 32, marginTop: 5 }}
      >
        <Flash />
        Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

export default ActionItem;
