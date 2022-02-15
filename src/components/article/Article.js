import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import {
  Chip,
  Grid,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  Link,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import PictureWrapper from "../pictureWrapper/PictureWrapper";
import StarFilled from "../../assets/icons/star-filled.svg";
import AttachmentIcon from "../../assets/icons/attachment.svg";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

const Article = (props) => {
  const { articleData } = props;
  const [count, setCount] = useState(0);
  const stateCount = useSelector((state) => state.count);
  const showButton = useSelector((state) => !state.showHeaderButton);

  const dispatch = useDispatch();

  const onInputchange = (event) => {
    const number = parseInt(event.target.value) || 0;
    setCount(number);
    dispatch({ type: "ITEMS_COUNT", count: number });
  };

  const ref = useRef();
  const inViewport = useOnScreen(ref);

  setTimeout(() => {
    if (!inViewport && showButton) {
      dispatch({ type: "SHOW_HEADER_BUTTON", showButton: true });
    } else if (inViewport && !showButton) {
      dispatch({ type: "SHOW_HEADER_BUTTON", showButton: false });
    }
  });

  return (
    <Container
      sx={{
        marginTop: "128px",
        marginBottom: "20px",
      }}
    >
      <Container
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PictureWrapper articleImages={articleData.images}></PictureWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box>
                <Typography variant="body1">{articleData.title}</Typography>
                <Typography variant="body2">
                  By{" "}
                  <Link color="secondary.dark" href={articleData.supplier_link}>
                    {articleData.supplier_name}
                  </Link>
                </Typography>
                <Box>
                  {Array(5)
                    .fill(null)
                    .map((a, i) => (
                      <StarFilled
                        key={i}
                        fill={i + 1 < articleData.stars ? "#ebc054" : "gray"}
                        height="20"
                        width="20"
                      />
                    ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginRight: "4px",
                    }}
                  >
                    {articleData.price.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    EUR{" "}
                  </Typography>
                  <Typography variant="body2">
                    +
                    {articleData.transport_costs.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    {articleData.currency} shipping
                  </Typography>
                </Box>
                <Typography variant="body2">
                  All prices include {articleData.vat_percent}% taxes
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showButton && (
                  <TextField
                    sx={{
                      marginRight: "10px",
                    }}
                    defaultValue={stateCount}
                    onChange={onInputchange}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                )}
                <Typography
                  sx={{
                    marginRight: "10px",
                  }}
                  variant="body1"
                >
                  PCE
                </Typography>
                <div ref={ref}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch({ type: "ADD_ITEM", count })}
                  >
                    Add to cart
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Box
          bgcolor="background.paper"
          sx={{
            padding: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography variant="subtitle2">DESCRIPTION</Typography>
              <Typography variant="subtitle1">
                {articleData.description_long}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Box
                bgcolor="background.default"
                sx={{
                  padding: 2,
                }}
              >
                <Typography variant="subtitle2">DETAILS</Typography>
                <Divider />
                <Typography variant="body2">Features</Typography>
                <List>
                  {Object.keys(articleData.features).map((key) => (
                    <ListItem key={key}>
                      <Typography variant="body2">{key}</Typography>
                      <Typography variant="subtitle1">
                        {articleData.features[key]}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body2">Attachments</Typography>
                <List>
                  {articleData.attachments.map((a, i) => (
                    <ListItem key={i}>
                      <AttachmentIcon fill={"#acc7d0"} height="10" width="10" />
                      <Link color="secondary.dark" href={a.file_link}>
                        {a.file_label}
                      </Link>
                    </ListItem>
                  ))}
                </List>
                <Box>
                  <Typography variant="body2">Keywords</Typography>
                  {articleData.keywords.map((kw) => (
                    <Chip key={kw} label={kw} />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                bgcolor="background.default"
                sx={{
                  padding: 2,
                }}
              >
                <Typography variant="subtitle2">PRICING & SHIPPING</Typography>
                <Divider />
                <List>
                  <ListItem>
                    <Typography variant="body2">Minimum order: </Typography>
                    <Typography variant="subtitle1">
                      {articleData.minimum_order_quantity} {articleData.unit}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2">Shipping: </Typography>
                    <Typography variant="subtitle1">
                      {articleData.transport_costs.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      EUR
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2">Delivery: </Typography>
                    <Typography variant="subtitle1">
                      {articleData.delivery_time} days
                    </Typography>
                  </ListItem>
                </List>
                <Typography variant="body2">Price breaks</Typography>
                <Table>
                  <TableBody>
                    {Object.keys(articleData.price_breaks).map((key) => (
                      <TableRow key={key}>
                        <TableCell>
                          ex {key} {articleData.unit}
                        </TableCell>
                        <TableCell>
                          {articleData.price_breaks[key].toLocaleString(
                            "de-DE",
                            {
                              minimumFractionDigits: 2,
                            }
                          )}{" "}
                          {articleData.currency}/{articleData.unit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

Article.propTypes = {
  articleData: PropTypes.object,
};

export default Article;
