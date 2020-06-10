import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI stuff
import theme from "../../utils/theme";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataAction";
const styles = {
  ...theme,
};

class CommentForm extends Component {
  state = {
    body: "",
    errors: "",
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
    this.setState({ body: "" });
  };

  render() {
    const {
      classes,
      authenticated,
      user: {
        credentials: { handle },
      },
      userHandle,
    } = this.props;
    const { errors } = this.state;
    const commentFormMarkup =
      authenticated && userHandle !== handle ? (
        <Grid item sm={12} style={{ textAlign: "center" }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Your Comment"
              variant="outlined"
              error={errors.comment ? true : false}
              helperText={errors.comment}
              value={this.state.body}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
          <hr className={classes.visibleSeparator} />
        </Grid>
      ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
