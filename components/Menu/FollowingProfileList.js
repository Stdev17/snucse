import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const FollowingProfileList = React.createClass({
  render() {
    const profiles = this.props.me.following.map(profile => {
      return (
        <li key={`${profile.id}${profile.name}`}><Link to={`/${profile.id}`}>{profile.name}</Link></li>
      );
    });

    return (
      <ul id="following-profiles-list">
        {profiles}
      </ul>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    me: state.me
  };
};

export default connect(mapStateToProps)(FollowingProfileList);
