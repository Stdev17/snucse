import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Menu from './Menu.js';
import Others from './Others.js';
import Message from './Message.js';
import Profiles from './Profile.js';
import Main from './Main.js';
import Post_Write from './Post_Write.js';
import Edit from './Post_Edit.js';
import Post from './Post.js';
import ClassManager from './ClassManager.js';

import reducers from './reducers'

const rootElement = document.getElementById('content');

var Test = React.createClass({
  render: function() {
    return (
      <div>
        main
      </div>
    );
  }
});

var url = "http://snucse.snucse.org:32123/api/v1/";
//var url = "http://aws.izz.kr:3000/api/v1/";

const store = createStore(combineReducers(reducers))

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Menu} pollInterval={2000} url={url}>
        <IndexRoute component={Main} url={url+"articles"} pollInterval={2000} />
        <Route path="/message" component={Message} />
        <Route path="/others" component={Others} />
        <Route path="/:post_id/edit" component={Edit} url={url+"articles"} />
        <Route path="/groups" component={Group} url={url+"profiles"} />
        <Route path="/:id" component={ClassManager} url={url} />
        <Route path="/group/:id/write" component={Post_Write} url={url+"articles"} />
      </Route>
    </Router>
  </Provider>
  , rootElement);