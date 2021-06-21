import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductContainer from './ProductContainer';
import SkeletonProductContainer from './SkeletonProductContainer';

class RestOfHome extends Component {
    constructor() {
        super()
        this.state={
            getMoreProduct: true,
            product: []
        }
    }

    getProduct=()=>{
        var categoryList = JSON.stringify(this.props.categoryList)
        var companyList = JSON.stringify(this.props.companyList)

        var url = 'https://orangered-backend2.herokuapp.com/getProduct/'
        fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'categoryList': categoryList,
                'companyList': companyList,
            })
        }).then(res=>res.json().then(result=>{
            var prevProduct = this.state.product
            var newProduct = result
            
            if(Object.keys(result[1]['data']).length && Object.keys(result[0]['data']).length){
                
                let product = [...prevProduct, ...newProduct]
                this.setState({product: product})
            }else{
                this.setState({getMoreProduct: false})
            }
            

            if(Object.keys(result[1]['data']).length){
                var companyId = result[1]['data'][0]['company']['id']
                var companyList = [...this.props.companyList, ...[companyId]]
                this.props.dispatch({
                    type: 'companyList',
                    payload: companyList
                })
            }

            if(Object.keys(result[0]['data']).length){
                var categoryId = result[0]['data'][0]['category'][0]['id']
                var categoryList = [...this.props.categoryList, ...[categoryId]]
                this.props.dispatch({
                    type: 'categoryList',
                    payload: categoryList
                })
            }
            
        }))
    }

    componentDidUpdate(){

        if(this.props.firstTwoCategoryDone && this.props.canLoadMore){
            this.getProduct()
            this.props.dispatch({
                type: 'canLoadMore',
            })
        }
    }

    render() {
        if(Object.keys(this.state.product).length){
            var allProduct = this.state.product
            var myArray = Object.keys(allProduct)
            const s = myArray.map((l,i)=>{
                var x = allProduct[l]
                var name = x['name']
                var data = x['data']
                return(
                    <ProductContainer key={i} categoryName={name} data={data} />
                )
            })
            return (
                <div key={this.props.keyValue}>
                    {s}
                    {this.state.getMoreProduct?(
                        <SkeletonProductContainer/>
                    ):null}
                    
                </div>
            );
        }
        return (
            <div key={this.props.keyValue}>
                <SkeletonProductContainer/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        canLoadMore : state.canLoadMore,
        firstTwoCategoryDone: state.firstTwoCategoryDone,
        keyValue: state.keyValue,
        companyList: state.companyList,
        categoryList: state.categoryList,
    }
}

export default connect(mapStateToProps)(RestOfHome);