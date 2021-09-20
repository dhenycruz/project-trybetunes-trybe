import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
    };
  }

  loginTrue = () => {
    this.setState({ loggedIn: true });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <main>
        <Switch>
          <Route exact path="/">
            { loggedIn ? <Redirect to="/search" /> : <Login login={ this.loginTrue } />}
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/profile/edit">
            <ProfileEdit />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    );
  }
}

export default Content;
