import React, { Component } from 'react';
import CategoryContainer from './CategoryContainer';
import ProductContainer from './ProductContainer';
import { connect } from 'react-redux';
import SkeletonProductContainer from './SkeletonProductContainer';
import RestOfHome from './RestOfHome';

class Home extends Component {
    constructor(){
        super()
        this.state={
            forYou: [],
            category: [],
            forYouAndCategoryDone: false,
            
            product: {},
            
        }
    }

    componentDidMount(){
        if(this.props.reloadPage){
            window.location.reload()
        }
        //alert(99)
        var url = 'https://orangered-backend2.herokuapp.com/forYou/'
        fetch(url, {
            method: 'GET',
            //credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            }
        }).then(res=>res.json().then(result=>{
            this.setState({forYou: result})
            if(this.state.forYou.length && Object.keys(this.state.category).length){
                this.props.dispatch({
                    type: 'forYouAndCategoryDone'
                })
            }
        }))

        var url2 = 'https://orangered-backend2.herokuapp.com/getCategoryName/'
        fetch(url2, {
            method: 'GET',
            //credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            }
        }).then(res=>res.json().then(result=>{
            this.setState({category: result})
            if(this.state.forYou.length && Object.keys(this.state.category).length){
                this.props.dispatch({
                    type: 'forYouAndCategoryDone'
                })
            }
        }))

        try {
            let store = JSON.parse(localStorage.getItem('login'))
            var url3 = 'https://orangered-backend2.herokuapp.com/totalItemInCart/'
            fetch(url3, {
                method: 'GET',
                //credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+store.token
                }
            }).then(res=>res.json().then(result=>{
                    this.props.dispatch({
                        type: 'totalItemInCart',
                        payload: result.totalItemInCart
                    })
            }))
        } catch  {
            
        }
        
        setTimeout(()=>{
            this.getProduct()
        },3000)
        setTimeout(()=>{
            this.props.dispatch({
                type: 'canLoadMore',
            })
        },15000)
        setTimeout(()=>{
            this.props.dispatch({
                type: 'canLoadMore',
            })
        },35000)
        setTimeout(()=>{
            this.props.dispatch({
                type: 'canLoadMore',
            })
        },55000)
    }

    getProduct=()=>{
        var companyList = JSON.stringify(this.props.companyList)
        var categoryList = JSON.stringify(this.props.categoryList)

        var url = 'https://orangered-backend2.herokuapp.com/getProduct/'
        fetch(url, {
            method: 'POST',
            //credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'categoryList': categoryList,
                'companyList': companyList,
            })
        }).then(res=>res.json().then(result=>{
            var product = {...this.state.product, ...result}
            //console.log(result);

            //var test = result[0]['data']
            //console.log(test);
            try {
                var companyId = result[1]['data'][0]['company']['id']
                var categoryId = result[0]['data'][0]['category'][0]['id']
                var companyList = [...this.props.companyList, ...[companyId]]
                var categoryList = [...this.props.categoryList, ...[categoryId]]
            } catch {
                window.location.href = '/'
            }
            
            this.setState({product: product})
            
            this.props.dispatch({
                type: 'categoryList',
                payload: categoryList
            })
            this.props.dispatch({
                type: 'companyList',
                payload: companyList
            })

            this.props.dispatch({
                type: 'firstTwoCategoryDone'
            })
            
        }))
    }
    
    render() {
        if (this.state.forYou.length && !Object.keys(this.state.category).length) {

            var data = this.state.forYou
            
            return (
                <div className='container'>
                    <ProductContainer categoryName={'For You'} data={data}/>
                    <RestOfHome/>
                </div>
            );
        }
        else if (this.state.forYou.length && Object.keys(this.state.category).length && !Object.keys(this.state.product).length) {
            var category = this.state.category
            var forYou = this.state.forYou
            return (
                <div  className='container'>
                    <ProductContainer categoryName={'For You'} data={forYou} />
                    <CategoryContainer category={category} />
                    <RestOfHome/>
                </div>
            );
        }else if(this.state.forYou.length && Object.keys(this.state.category).length && Object.keys(this.state.product).length){
            category = this.state.category
            forYou = this.state.forYou
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
            return(
                <div className='hide-scrollbar container'>
                    <ProductContainer categoryName={'For You'} data={forYou} />
                    <CategoryContainer category={category} />
                    {s}

                    <RestOfHome/>
                </div>
            )
        }
        else{
            return(
                <div className='container'>
                    <SkeletonProductContainer/>
                    <SkeletonProductContainer/>
                    <RestOfHome/>
                </div>
            )
        }
    }
}


function mapStateToProps(state){
    return{
        forYouAndCategoryDone: state.forYouAndCategoryDone,
        firstTwoCategoryDone: state.firstTwoCategoryDone,
        companyList: state.companyList,
        categoryList: state.categoryList,
        reloadPage: state.reloadPage,
    }
}

export default connect(mapStateToProps)(Home);

/**
 * if(Object.keys(this.props.forYou).length){
            console.log(99);
            var data = this.props.forYou
            const s = data.map((data, i)=>{
                return(
                    <ProductContainer
                        key={i} 
                    />
                )
            })
            return(
                {s}
            )
        }else{
 */