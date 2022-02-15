import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Badge,
  Toolbar,
  AppBar,
  Typography,
  useScrollTrigger,
  Container,
  Box,
  Button,
  TextField,
} from "@mui/material";

import CartIcon from "../../assets/icons/cart.svg";
import HeartIcon from "../../assets/icons/favorite.svg";
import FactsIcon from "../../assets/icons/facts-soft.svg";
import { useTheme } from "@mui/material";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props) => {
  const { articleData } = props;

  const cartItems = useSelector((state) => state.cartItems);
  const showButton = useSelector((state) => state.showHeaderButton);
  const stateCount = useSelector((state) => state.count);

  const [windowWidth, setwindowWidth] = useState(501);
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => setwindowWidth(window.innerWidth));
    setwindowWidth(window.innerWidth);
    return () => window.removeEventListener("resize");
  }, []);

  const theme = useTheme();
  const dispatch = useDispatch();
  const onInputchange = (event) => {
    const number = parseInt(event.target.value) || 0;
    setCount(number);
    dispatch({ type: "ITEMS_COUNT", count: number });
  };

  return (
    <ElevationScroll {...props}>
      <AppBar sx={{ borderBottom: "2px solid #efefef" }}>
        <Toolbar>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            {windowWidth > 500 && (
              <Typography variant="h6" component="h6" color="secondary">
                {articleData.title}
              </Typography>
            )}
            {showButton && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  sx={{
                    marginRight: "10px",
                  }}
                  defaultValue={stateCount}
                  onChange={onInputchange}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <Typography
                  sx={{
                    marginRight: "10px",
                  }}
                  variant="body1"
                >
                  PCE
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => dispatch({ type: "ADD_ITEM", count: count })}
                >
                  Add to cart
                </Button>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HeartIcon
                fill={theme.palette.secondary.light}
                height="30"
                width="30"
              />
              <FactsIcon
                fill={theme.palette.secondary.light}
                height="30"
                width="30"
              />
              <Badge color="secondary" badgeContent={cartItems} max={999}>
                <CartIcon
                  fill={theme.palette.secondary.light}
                  height="30"
                  width="30"
                />
              </Badge>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

Header.propTypes = {
  // children: PropTypes.element.isRequired,
  window: PropTypes.func,
  articleData: PropTypes.object,
};

export default Header;
