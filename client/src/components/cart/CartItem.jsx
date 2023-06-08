import { Box, Typography, styled, Button } from "@mui/material";
import { addEllipsis } from "../../utils/common_utils";
import GroupedButton from "./ButtonGroup";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";


const Component = styled(Box)`
  border-top: 1px solid #f0f0f0;
  display: flex;
  background: #FFF;
`;

const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const Remove = styled(Button)`
   margin-top: 20px;
   font-size: 16px;
   color: #000;
   font-weight: 600;
`;

const CartItem = ({ item }) => {
  const assured =
    "https://images.unsplash.com/photo-1679490831266-a72d94f2e409?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

    const dispatch = useDispatch();
    
    
    const removeItemFromCart = (id) => {
      dispatch(removeFromCart(id))
    }



  return (
    <Component>
      <LeftComponent>
        <img src={item.url} alt="product" style={{height: 110, width: 110}}/>
        <GroupedButton/>
      </LeftComponent>
      <Box style={{margin: 20}}>
        <Typography>{addEllipsis(item.title.longTitle)}</Typography>
        <SmallText>
          Seller:RetailNet
          <Box component="span">
            <img
              src={assured}
              alt="assured"
              style={{ width: 50, marginLeft: 10, border: "1px solid black" }}
            />
          </Box>
        </SmallText>
        <Typography style={{margin: '20px 0'}}>
          <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
            ₹{item.price.cost}
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#878787" }}>
            <strike>₹{item.price.mrp}</strike>
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#388E3C" }}>
            {item.price.discount}
          </Box>
        </Typography>
        <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
      </Box>
    </Component>
  );
};

export default CartItem;
