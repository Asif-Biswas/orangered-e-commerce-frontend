import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
//import images3 from '../images/images-3.jpeg'

class CartItemMini extends Component {
    constructor(props){
        super(props)
        this.state={
            delete: false,
            remove: false,
            undo: false,

            quantity: this.props.quantity,
            price: Math.ceil(this.props.price),
            priceNow: Math.ceil(this.props.priceNow),

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
            var quantity = Math.ceil(this.props.quantity)
            var price = Math.ceil(this.props.price)
            var priceNow = Math.ceil(this.props.priceNow)
        }else{
            quantity = this.state.quantity + 1
            price = this.state.price / this.state.quantity *(quantity)
            priceNow = this.state.priceNow / this.state.quantity * (quantity)
        }
        this.setState({quantity: quantity, price: price, priceNow: priceNow})
        this.props.dispatch({
            type: 'priceChanged',
            payload: {'price': this.props.price, 'priceNow': this.props.priceNow, 'value': 'increased'}
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
            var price = this.state.price / this.state.quantity * quantity
            var priceNow = this.state.priceNow / this.state.quantity * quantity

            this.setState({quantity: quantity, price: price, priceNow: priceNow})
            this.props.dispatch({
                type: 'priceChanged',
                payload: {'price': this.props.price, 'priceNow': this.props.priceNow, 'value': 'decreased'}
            })
        }
        
    }

    handleDelete=()=>{
        //var quantity = this.state.quantity
        var price = this.state.price
        var priceNow = this.state.priceNow
        var saving = price - priceNow
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
        this.setState({delete: !this.state.delete})
    }

    HandleRemove=()=>{
        this.setState({remove: true})
    }


    render() {
        return (
            <div>
            {this.state.remove?(
                null
            ):(
                <div>
                    <div style={{display:'flex', justifyContent:'space-between', maxWidth:'500px', position:'relative'}}>
                        <div style={{width:'30%'}}>
                            <img
                                src={this.props.img} alt=''
                                style={{width:'100%'}}
                            />
                        </div>
                        <div style={{width:'40%', margin:'4px 8px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div>
                                <p style={{fontSize:'min(4vw,20px)', marginTop:'-4px', lineHeight:'96%'}}>{this.props.name}</p>
                                <p style={{marginTop:'-8px', marginBottom:'8px', color:'orange'}}>Price: {this.props.priceNow} $</p>
                            </div>
                        </div>
                        <div style={{width:'30%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', margin:'4px'}}>
                                    <button onClick={this.decreaseQuantity} className='deep-orange hover-grey' style={{border:'1px solid white', fontWeight:'bold', color:'white', padding:'4px 10px', borderRight:'none', marginRight:'-2px', fontSize:'min(3vw,20px)'}}>-</button>
                                    <button className='deep-orange' style={{border:'1px solid white', fontWeight:'bold', color:'white', padding:'4px 14px', zIndex:'1', fontSize:'min(3vw,20px)'}}>{this.state.quantity}</button>
                                    <button onClick={this.increaseQuantity} className='deep-orange hover-green' style={{border:'1px solid white', fontWeight:'bold', color:'white', padding:'4px 10px', borderLeft:'none', marginLeft:'-2px', fontSize:'min(3vw,20px)'}}>+</button>
                                </div>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <FaTrashAlt onClick={this.handleDelete} className='hover-text-red pointer' style={{fontSize:'min(5vw,24px)', color:'grey'}}/>
                                </div>
                            </div>
                        </div>
                        {this.state.delete?(
                            <div style={{position:'absolute', top:'0', left:'0', width:'100%', height:'100%', zIndex:'2', display:'flex', justifyContent:'center', alignItems:'center', background:'rgba(255,255,255,.9)'}}>
                                <button onClick={this.HandleRemove} className='button red effect' style={{maxWidth:'160px', minWidth:'100', width:'50%', margin:'8px'}}>Remove</button>
                                <button onClick={this.handleDelete} className='button orange text-white effect' style={{maxWidth:'160px', minWidth:'100', width:'50%', margin:'8px'}}>Undo</button>
                            </div>
                        ):null}
                    </div>
                    
                    <hr/>
                </div>
            )}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
    }
}

export default connect(mapStateToProps)(CartItemMini);