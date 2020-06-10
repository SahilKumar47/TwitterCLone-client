import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../utils/myButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
//MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

//Redux Stuff
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../../redux/actions/dataAction";
import LikeButton from "./LikeButton";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    ["@media (max-width: 600px)"]: {
      height: 100,
      width: 100,
      borderRadius: "50%",
      margin: "0 auto",
    },
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        userImage,
        body,
        createdAt,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <CardMedia
              image={userImage}
              className={classes.image}
              title="Profile Image"
            />
          </Grid>

          <Grid item sm={8} xs={12}>
            <CardContent className={classes.content}>
              <Typography
                variant="h5"
                color="primary"
                component={Link}
                to={`/users/${userHandle}`}
              >
                {userHandle}
              </Typography>
              {deleteButton}
              <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography variant="body1">{body}</Typography>
              <LikeButton screamId={screamId} />
              <span>{likeCount} Likes</span>
              <MyButton tip="comments">
                <ChatIcon color="primary" />
              </MyButton>
              <span>{commentCount} comments</span>
              <ScreamDialog
                screamId={screamId}
                userHandle={userHandle}
                openDialog={this.props.openDialog}
              />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
