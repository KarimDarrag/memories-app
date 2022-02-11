import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={() => window.location.reload()}
        >
          CLICK HERE if Liked/Updated post but change is not seen
        </Button>

        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
