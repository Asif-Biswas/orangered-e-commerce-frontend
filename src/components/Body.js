import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import Home from './Home';
import ItemDetailsContainer from './ItemDetailsContainer';
import MyCart from './MyCart';
import Navigation from './Navigation';
import Purchase from './Purchase';
import SearchProductContainer from './SearchProductContainer';

class Body extends Component {
    constructor() {
        super()
        this.state={
            height: null,
            youArePermited: true,
        }
    }
    

    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        
        
        if(bottom){
            var currentHeight = event.target.scrollHeight
            this.setState({height: currentHeight})
            
            if(currentHeight !== this.state.height){
                this.props.dispatch({
                    type: 'keyValue',
                })
                this.props.dispatch({
                    type: 'canLoadMore',
                })
            }
            
        }
    }


    render() {
        return (
            <div onScroll={this.handleScroll} style={{height:'100vh', width:'100vw'}} className='background-color scrolly'>
                <Navigation/>
                
                <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route path='/details'>
                    <ItemDetailsContainer/>
                </Route>
                <Route path='/mycart'>
                    <MyCart/>
                </Route>
                <Route path='/purchase'>
                    <Purchase/>
                </Route>
                <Route path='/search'>
                    <SearchProductContainer/>
                </Route>
                <Route component={Home}/>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        canLoadMore: state.canLoadMore,
        firstTwoCategoryDone: state.firstTwoCategoryDone,
        keyValue: state.keyValue
    }
}

export default connect(mapStateToProps)(Body);