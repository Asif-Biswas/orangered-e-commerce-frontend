import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItemMini from './CartItemMini';
import SkltnCartItem from './SkltnCartItem';

class OrderSummary extends Component {
    constructor() {
        super()
        this.state={
            items: [],
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            let store = JSON.parse(localStorage.getItem('login'))
            var url2 = 'https://orangered-backend2.herokuapp.com/myAllCartItems/'
            fetch(url2,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+store.token
                }
            }).then(res=>res.json().then(result=>{
                this.setState({items: result})
            }))
        },2000)
        
    }
    render() {
        if(this.state.items.length){
            var items = this.state.items
            const s = items.map((l,i)=>{
                var priceNow = l['price'] - l['price']*l['discount']/100
                return(
                    <CartItemMini key={i} img={l['image_url']} id={l['id']}
                        name={l['name']} companyName={l['company']['name']} price={l['price']}
                        discount={l['discount']} priceNow={priceNow} quantity={l['quantity']}
                    />
                )
            })
            return(
                <div>
                    <div className='conatiner card padding round5' style={{color:'orangered'}}>
                        <h1>Order summary</h1>
                        <div style={{paddingLeft:'16px'}}>
                            <h2 className='text-orange'>Billing address:</h2>
                            <div style={{paddingLeft:'16px', color:'red'}}>
                                <p>Name: {this.props.fullName}</p>
                                <p>Full Address: {this.props.fullAddress}</p>
                                <p>Email: {this.props.email}</p>
                                <p>Phone number: {this.props.phone}</p>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <h2>Your Order</h2>
                            {s}
                            <div>
                                <h2 style={{textAlign:'right'}}>Total: {Math.ceil(this.props.totalPriceNow)} $.</h2>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div className='conatiner card padding round5' style={{color:'orangered'}}>
                        <SkltnCartItem/>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        fullName: state.fullName,
        fullAddress: state.fullAddress,
        email: state.email,
        phone: state.phone,
        totalPriceNow: state.totalPriceNow,
    }
}

export default connect(mapStateToProps)(OrderSummary);