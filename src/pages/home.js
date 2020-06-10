import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/scream";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";

//Redux stuff
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";
class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let renderScreamsMarkup = !loading ? (
      screams.length > 0 ? (
        screams.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))
      ) : (
        <p>No Screams posted yet. Signup and post one now!!</p>
      )
    ) : null;
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {renderScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
