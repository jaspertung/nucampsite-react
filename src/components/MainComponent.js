import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { addComment, fetchCampsites } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    }
}

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites())
}
// makes action creators available to MainComponent as props

class Main extends Component {

    //fetchCampsites as soon as MainComponent rendered to the DOM
    componentDidMount() {
        this.props.fetchCampsites()
    }
    // built in React method part of lifecycle methods (created, added, updated, and removed from DOM) (ex. render(), componentDidUpdate(), componentWillUnmount(), componentDidMount())

    render() {

        const HomePage = () => {
            return (
                <Home 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    // call only campsites data array from campsites.js campsites object
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            )
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}
                />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites}/>}/>
                    <Route path='/directory/:campsiteId' component={CampsiteWithId}/>
                    <Route exact path='/contactus' component={Contact}/>
                    <Route exact path='/about' render={() => <About partners={this.props.partners}/>}/>
                    <Redirect to='/home'/>
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
