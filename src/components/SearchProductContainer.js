import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchProductItem from './SearchProductItem';
import SkeletonProductContainer from './SkeletonProductContainer';

class SearchProductContainer extends Component {
    constructor() {
        super()
        this.state={
            result: [],
        }
    }

    componentDidMount(){
        var str = this.props.searchInput
        var x = str.indexOf(' ')
        str = str.slice(0,x)
        if(x===0){
            str = 'apple'
        }
        var url = 'https://orangered-backend.herokuapp.com/search/'+str+'/'
        fetch(url, {
            method: 'GET',
            //credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            }
        }).then(res=>res.json().then(result=>{
            this.setState({result: result})
            /*if(this.state.forYou.length && Object.keys(this.state.category).length){
                this.props.dispatch({
                    type: 'forYouAndCategoryDone'
                })
            }*/
        }))
    }

    componentDidUpdate(prevProps){
        if(prevProps.keyValue2 !== this.props.keyValue2){
            this.componentDidMount()
        }
    }
    render() {
        if(this.state.result.length){
            var result = this.state.result
            const s = result.map((l,i)=>{
                var priceNow = Math.ceil(l['price']-l['price']*l['discount']/100)
                return(
                    <SearchProductItem
                        key={i} id={l['id']} name={l['name']} img={l['image_url']}
                        price={l['price']} priceNow={priceNow}
                    />
                )
            })
            return (
                <div>
                    <div className='test-c container'>
                        {s}
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <SkeletonProductContainer/>
                    <SkeletonProductContainer/>
                    <SkeletonProductContainer/>
                </div>
            );
        }
        
    }
}

function mapStateToProps(state){
    return{
        searchInput: state.searchInput,
        keyValue2: state.keyValue2,
    }
}

export default connect(mapStateToProps)(SearchProductContainer);

/**
 * 

                <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
                    <div className='test-c-div' style={{height:'280px', backgroundColor:'honeydew', border:'2px solid yellow'}}></div>
 */