import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DefaultDialog from ".";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { red, yellow } from "@mui/material/colors";
import { useCookies } from "react-cookie";
import { reviewApi } from "../../api/reviewApi";

const ReviewDialog = () => {
  const dialogRef = useRef();
  const [before, setBefore] = useState(3);
  const [after, setAfter] = useState(3);
  const [cookies, setCookies] = useCookies(["reviewed", "infoUser"]);

  useEffect(() => {
    const timeout = showReview();
    console.log("open");
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  const showReview = () => {
    if (
      !cookies.reviewed ||
      (cookies.infoUser && cookies.infoUser.user.id !== cookies.reviewed)
    ) {
      return setTimeout(() => {
        dialogRef.current.Open();
      }, [300000]);
    }
    return null;
  };

  const reviewHandler = async () => {
    await reviewApi.create(after - before);
    const expires = new Date();
    expires.setMonth(new Date().getMonth() + 1);
    setCookies(
      "reviewed",
      cookies.infoUser ? cookies.infoUser.user.id : "unlogin",
      { expires }
    );
    dialogRef.current.Lose();
  };

  return (
    <DefaultDialog ref={dialogRef} title="Review">
      <DialogContent>
        <p className="text-gray-500 text-xl">
          Choose your mood before the experience
        </p>
        <Grid container spacing={2} columns={5}>
          <Grid item xs>
            <IconButton
              sx={{ color: before === 1 ? red[700] : "gray" }}
              onClick={() => {
                setBefore(1);
              }}
            >
              <MoodBadIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: before === 2 ? red[600] : "gray" }}
              onClick={() => {
                setBefore(2);
              }}
            >
              <SentimentDissatisfiedIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: before === 3 ? yellow[800] : "gray" }}
              onClick={() => {
                setBefore(3);
              }}
            >
              <SentimentNeutralIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: before === 4 ? yellow[700] : "gray" }}
              onClick={() => {
                setBefore(4);
              }}
            >
              <SentimentSatisfiedIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: before === 5 ? yellow[600] : "gray" }}
              onClick={() => {
                setBefore(5);
              }}
            >
              <TagFacesIcon />
            </IconButton>
          </Grid>
        </Grid>
        <p className="text-gray-500 text-xl">
          Choose your mood after the experience
        </p>
        <Grid container spacing={2} columns={5}>
          <Grid item xs>
            <IconButton
              sx={{ color: after === 1 ? red[700] : "gray" }}
              onClick={() => {
                setAfter(1);
              }}
            >
              <MoodBadIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: after === 2 ? red[600] : "gray" }}
              onClick={() => {
                setAfter(2);
              }}
            >
              <SentimentDissatisfiedIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: after === 3 ? yellow[800] : "gray" }}
              onClick={() => {
                setAfter(3);
              }}
            >
              <SentimentNeutralIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: after === 4 ? yellow[700] : "gray" }}
              onClick={() => {
                setAfter(4);
              }}
            >
              <SentimentSatisfiedIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton
              sx={{ color: after === 5 ? yellow[600] : "gray" }}
              onClick={() => {
                setAfter(5);
              }}
            >
              <TagFacesIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={reviewHandler}>
          review
        </Button>
        <Button variant="outlined" onClick={() => dialogRef.current.Lose()}>
          later
        </Button>
      </DialogActions>
    </DefaultDialog>
  );
};

export default ReviewDialog;
