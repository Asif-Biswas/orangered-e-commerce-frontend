import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SkltnCartItem from './SkltnCartItem';

class ItemDetails extends Component {
    constructor() {
        super()
        this.state={
            item: [],
            addedToCart: false,
        }
    }

    addToCart=()=>{
        var id = this.props.productId
        try {
            let store = JSON.parse(localStorage.getItem('login'))
            var url = 'https://orangered-backend2.herokuapp.com/addToCart/'+id+'/'
            fetch(url,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+store.token
                }
            }).then(res=>res.json().then(result=>{
                if(result.response === 'ok'){
                    this.props.dispatch({
                        type: 'itemInCart',
                    })
                    this.setState({addedToCart: true})
                    this.props.dispatch({
                        type: 'keyForNewCartItem',
                    })
                    var priceNow = this.state.item.price - this.state.item.price * this.state.item.discount / 100
                    this.props.dispatch({
                        type: 'priceChanged',
                        payload: {'price': this.state.item.price, 'priceNow': priceNow, 'value': 'increased'}
                    })
                }
            }))
        } catch {
            this.props.dispatch({
                type: 'registrationContainer',
            })
        }
    }

    deleteCartItem=()=>{
        var id = this.props.productId
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://orangered-backend2.herokuapp.com/deleteCartItem/'+id+'/'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        }).then(res=>res.json().then(result=>{
            if(result.response === 'deleted'){
                this.props.dispatch({
                    type: 'deleteCartItem',
                })
                this.setState({addedToCart: false})
            }
        }))
        this.props.dispatch({
            type: 'deleteFromCart',
        })
        
    }


    componentDidMount(){
        //let store = JSON.parse(localStorage.getItem('login'))
        var id = this.props.productId
        var url4 = 'https://orangered-backend2.herokuapp.com/productDetails/'+id+'/'
            fetch(url4, {
                method: 'GET',
                //credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    //'Authorization': 'Token '+store.token
                }
            }).then(res=>res.json().then(result=>{
                this.setState({item: result})
            }))
    }
    componentDidUpdate(newProps){
        if(newProps.keyValue2 !== this.props.keyValue2){
            this.componentDidMount()
        }
    }
    render() {
        if(Object.keys(this.state.item).length){
            var l = this.state.item
            var discount = l['discount']
            var price = l['price']
            var priceNow = price - price * discount / 100
            return(
                <div key={this.props.keyValue} className='white'>
                    <div className='item-details padding white' style={{maxWidth:'1000px', margin:'auto'}}>
                        <div className='l7 m7'>
                            <img
                                src={l['image_url']} alt=''
                                style={{maxWidth:'480px', maxHeight:'700px', width:'100%', border:'3px solid orangered'}}
                            />
                        </div>
                        
                        <div style={{display:'flex', alignItems:'center'}} className='l5 m5'>
                            <div style={{width:'100%', marginLeft:'16px'}}>
                                <h1 style={{color:'orangered'}}>{l['name']}</h1>
                                <div style={{marginLeft:'36px'}}>
                                    <h3 style={{color:'orange'}}>by <span style={{fontSize:'24px'}}>{l['company']['name']}</span></h3>
                                    <h3 style={{color:'orange'}}>Category: {l['category'][0]['name']}</h3>
                                    <h3><del style={{opacity:'.6', color:'orangered'}}>Price: {l['price']} $</del><span className='text-light-green'> ({l['discount']}% off)</span></h3>
                                    <h2 style={{color:'orangered'}}>Price: {priceNow} $</h2>
                                </div>
                                <div style={{display:'flex'}}>
                                {this.state.addedToCart?(
                                    <button onClick={this.deleteCartItem} className='button deep-orange effect text-white' style={{width:'50%', margin:'4px', fontSize:'20px'}}>Added to Cart</button>
                                ):(
                                    <button onClick={this.addToCart} className='button light-green effect text-white' style={{width:'50%', margin:'4px', fontSize:'20px'}}>Add to Cart</button>
                                )}
                                    
                                    <div style={{width:'50%'}}><Link to='/purchase'><button onClick={this.addToCart} className='button orange effect text-white' style={{width:'100%', margin:'4px', fontSize:'20px'}}>Buy Now</button></Link></div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            )
        }else{
            return (
                <SkltnCartItem/>
            );
        }
        
    }
}

function mapStateToProps(state){
    return{
        productId: state.productId,
        keyValue2: state.keyValue2,
    }
}

export default connect(mapStateToProps)(ItemDetails);