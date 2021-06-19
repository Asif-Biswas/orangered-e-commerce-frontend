import React, { Component } from 'react';
import { BiPurchaseTag } from 'react-icons/bi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TotalMoneyCard extends Component {
    render() {
        var totalItem = this.props.totalItemInCart
        var total = Math.round(this.props.totalPriceNow)
        if(total<5){
            total = 0
        }
        var saving = Math.round(this.props.saving)
        if(saving<5){
            saving = 0
        }

        return (
            <div className='white round5'>
                <div style={{maxWidth:'1000px', margin:'auto', padding:'10px'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <h1 style={{fontSize:'min(6vw,28px)', color:'orangered'}}>My Cart ({totalItem} items)</h1>
                        <div>
                            <h2 style={{textAlign:'right', fontSize:'min(5vw,24px)', color:'red'}}>Total: {total} $.</h2>
                            <h3 style={{textAlign:'right', fontSize:'min(3.5vw,18px)', color:'green'}}>You are saving total {saving} $.</h3>
                        </div>
                    </div>
                    <div>
                    {totalItem===0?(
                        <Link to='/'><button className='button deep-orange hover-green effect purchase-now' style={{margin:'8px 0', minWidth:'220px', width:'100%', fontSize:'20px'}}>Continue Shopping</button></Link>
                    ):(
                        <Link to='/purchase'><button className='button deep-orange hover-green effect purchase-now' style={{margin:'8px 0', minWidth:'220px', width:'100%', fontSize:'20px'}}><BiPurchaseTag style={{margin:'0 4px -4px 4px', fontSize:'24px'}}/>Purchase Now</button></Link>
                    )}
                        
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        totalPrice: state.totalPrice,
        totalPriceNow: state.totalPriceNow,
        saving: state.saving,
        keyForPrice: state.keyForPrice,
        totalItemInCart: state.totalItemInCart,
    }
}

export default connect(mapStateToProps)(TotalMoneyCard);