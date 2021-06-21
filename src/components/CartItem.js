import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';

class CartItem extends Component {
    constructor(props){
        super(props)
        this.state={
            delete: false,
            remove: false,
            undo: false,

            quantity: this.props.quantity,
            price: Math.ceil(this.props.price),
            priceNow: Math.ceil(this.props.priceNow),

            newPrice: 0,
            newPriceNow: 0,
        }
    }

    increaseQuantity=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url3 = 'https://orangered-backend2.herokuapp.com/increaseQuantity/'+this.props.id+'/'
        fetch(url3, {
            method: 'GET',
            //credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        }).then(res=>res.json().then(result=>{
        }))

        if(this.state.quantity === 0){
            var quantity = 1
            //var price = Math.ceil(this.props.price)
            //var priceNow = Math.ceil(this.props.priceNow)
        }else{
            quantity = this.state.quantity + 1
            //price = this.state.price / this.state.quantity *(quantity)
            //priceNow = this.state.priceNow / this.state.quantity * (quantity)
        }
        this.setState({quantity: quantity})
        var saving = this.props.price - this.props.priceNow
        this.props.dispatch({
            type: 'priceChanged',
            payload: {'price': this.props.price, 'priceNow': this.props.priceNow, 'value': 'increased', 'saving': saving}
        })
    }

    decreaseQuantity=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url3 = 'https://orangered-backend2.herokuapp.com/decreaseQuantity/'+this.props.id+'/'
        fetch(url3, {
            method: 'GET',
            //credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        }).then(res=>res.json().then(result=>{
        }))
        if(this.state.quantity !== 0){
            var quantity = this.state.quantity - 1
            //var price = this.state.price / this.state.quantity * quantity
            //var priceNow = this.state.priceNow / this.state.quantity * quantity

            var saving = this.props.price - this.props.priceNow
            this.setState({quantity: quantity})
            this.props.dispatch({
                type: 'priceChanged',
                payload: {'price': this.props.price, 'priceNow': this.props.priceNow, 'value': 'decreased', 'saving': saving}
            })
        }
        
    }

    handleDelete=()=>{
        //var quantity = this.state.quantity
        var price = this.state.price
        var priceNow = this.state.priceNow * this.state.quantity
        var saving = (price - this.state.priceNow) * this.state.quantity
        //console.log(quantity, priceNow);
        //var totalPriceNow = quantity * priceNow
        //console.log(totalPriceNow);
        //var totalSaving = quantity * saving
        var id = this.props.id
        let store = JSON.parse(localStorage.getItem('login'))
        if(this.state.delete){
            var url3 = 'https://orangered-backend2.herokuapp.com/undoDeletedCartItem/'+id+'/'
            fetch(url3, {
                method: 'GET',
                //credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+store.token
                }
            }).then(res=>res.json().then(result=>{
                    
            }))
            this.props.dispatch({
                type: 'cartItemDeleted',
                payload: {'priceNow': priceNow, 'value': 'increase', 'saving': saving}
            })
        }else{
            var url4 = 'https://orangered-backend2.herokuapp.com/deleteCartItem/'+id+'/'
            fetch(url4, {
                method: 'GET',
                //credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+store.token
                }
            }).then(res=>res.json().then(result=>{
                    
            }))
            this.props.dispatch({
                type: 'cartItemDeleted',
                payload: {'priceNow': priceNow, 'value': 'decrease', 'saving': saving}
            })
        }
        this.setState({delete: !this.state.delete, quantity: 1})
    }

    HandleRemove=()=>{
        this.setState({remove: true})
    }
    componentDidUpdate(newProps) {
        if( newProps.keyForNewCartItem !== this.props.keyForNewCartItem ) {
          this.setState({delete: false, remove: false})
        }
      }
    render() {
        return (
            <div className='white round5'>
            {this.state.remove?(
                null
            ):(
                <div style={{maxWidth:'1000px', margin:'auto', padding:'16px 4px'}}>
                    <div className='cart-item relative'>
                        <div className='cart-item-first-div' style={{display:'flex', justifyContent:'space-around'}}>
                            <div className='cifdfc' style={{margin:'8px'}}>
                                <img
                                    src={this.props.img} alt='item'
                                    style={{width:'100%', maxWidth:'200px', padding:'4px'}}
                                />
                            </div>
                            <div className='cifdls' style={{margin:'8px'}}>
                                <h2 style={{color:'orangered', fontSize:'min(5vw,28px)'}}>{this.props.name}</h2>
                                <p style={{color:'orangered'}}>by <span style={{fontWeight:'bold', fontSize:'min(4vw,20px)'}}>{this.props.companyName}</span></p>
                            </div>
                        </div>

                        <div className='cart-item-second-div' style={{display:'flex', justifyContent:'space-between'}}>
                            <div style={{display:'flex', justifyContent:'left', alignItems:'center', width:'40%', margin:'4px 4px 4px 4%'}}>
                                <button onClick={this.decreaseQuantity} className='deep-orange hover-grey' style={{border:'1px solid white', fontWeight:'bold', color:'white', padding:'8px 16px', borderRight:'none', marginRight:'-2px', fontSize:'min(3vw,20px)'}}>-</button>
                                <button className='deep-orange' style={{border:'1px solid white', fontWeight:'bold', color:'white', padding:'8px 26px', zIndex:'1', fontSize:'min(3vw,20px)'}}>{this.state.quantity}</button>
                                <button onClick={this.increaseQuantity} className='deep-orange hover-green' style={{border:'1px solid white', fontWeight:'bold', color:'white', padding:'8px 16px', borderLeft:'none', marginLeft:'-2px', fontSize:'min(3vw,20px)'}}>+</button>
                            </div>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'40%', margin:'4px'}}>
                                <div>
                                    <h1 style={{color:'orangered', fontSize:'min(5.5vw,30px)'}}>{Math.round(this.state.priceNow)} $</h1>
                                    <span><del style={{color:'orangered', opacity:'.6'}}>{Math.round(this.state.price)} $</del> <span style={{color:'green'}}>({this.props.discount}% off)</span></span>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'20%'}}>
                                <FaTrashAlt onClick={this.handleDelete} className='hover-text-red pointer' style={{fontSize:'min(6vw,28px)', color:'grey'}}/>
                            </div>
                        </div>
                        {this.state.delete?(
                            <div style={{position:'absolute', top:'0', left:'0', width:'100%', height:'100%', zIndex:'2', display:'flex', justifyContent:'center', alignItems:'center', background:'rgba(255,255,255,.9)'}}>
                                <button onClick={this.HandleRemove} className='button red effect' style={{maxWidth:'160px', minWidth:'100', width:'50%', margin:'8px'}}>Remove</button>
                                <button onClick={this.handleDelete} className='button orange text-white effect' style={{maxWidth:'160px', minWidth:'100', width:'50%', margin:'8px'}}>Undo</button>
                            </div>
                        ):null}
                        
                    </div>
                    <div style={{padding:'0 12px'}}><hr/></div>
                </div>
            )}
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        keyForNewCartItem: state.keyForNewCartItem
    }
}

export default connect(mapStateToProps)(CartItem);