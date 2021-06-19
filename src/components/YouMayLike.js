import React, { Component } from 'react';
import ProductContainer from './ProductContainer';
import SkeletonProductContainer from './SkeletonProductContainer';

class YouMayLike extends Component {
    constructor() {
        super()
        this.state={
            youMayLike: [],
        }
    }

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url2 = 'https://orangered-backend.herokuapp.com/youMayLikeOnCart/'
        fetch(url2,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        }).then(res=>res.json().then(result=>{
            this.setState({youMayLike: result})
        }))
    }
    render() {
        if(this.state.youMayLike.length){
            var allProduct = this.state.youMayLike
            const s  = allProduct.map((l,i)=>{
                var categoryName = l['name']
                var data = l['data']
                return(
                    <ProductContainer
                        key={i} categoryName={categoryName} data={data}
                    />
                )
            })
            return(
                <div>
                    {s}
                </div>
            )
        }else{
            return (
                <div>
                <SkeletonProductContainer/>
                <SkeletonProductContainer/>
                </div>
            );
        }
        
    }
}

export default YouMayLike;