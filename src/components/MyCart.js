import React, { Component } from 'react';
//import CartItem from './CartItem';
import TotalMoneyCard from './TotalMoneyCard';
import SkltnTotalMoney from './SkltnTotalMoney';
import { BiPurchaseTag } from 'react-icons/bi';
//import ProductContainer from './ProductContainer';
//import SkltnCartItem from './SkltnCartItem';
//import { NavLink } from 'react-router-dom';
//import SkeletonProductContainer from './SkeletonProductContainer';
import YouMayLike from './YouMayLike';
import MyAllCartItems from './MyAllCartItems';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MyCart extends Component {

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://orangered-backend.herokuapp.com/myCartDetails/'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        }).then(res=>res.json().then(result=>{
            if(result.response === undefined){
                var l = result
                this.props.dispatch({
                    type: 'setAllprice',
                    payload: {'total': l[0]['total'], 'saving': l[0]['saving'], noItem: false}
                })
            }else{
                this.setState({noItem: true})
            }
        }))
    }

    
    render() {
        if(!this.props.noItem){
        var total = Math.round(this.props.totalPriceNow)
        if (total<5){
            total = 0
        }
            return(
                <div className='container'>
                    <TotalMoneyCard  key={this.props.keyForPrice} />
                        <br/>
                    <div className='white'>
                        
                        <MyAllCartItems/>
                        {total===0?(
                            null
                        ):(
                            <div style={{textAlign:'right', maxWidth:'1000px', margin:'auto', padding:'8px'}}>
                                <h1 style={{color:'red', margin:'0 18px'}}>Total: {total}$</h1>
                                <Link to='/purchase'><button className='button deep-orange hover-green effect' style={{margin:'8px 18px', maxWidth:'300px', minWidth:'220px', width:'50%', fontSize:'20px'}}><BiPurchaseTag style={{margin:'0 4px -4px 4px', fontSize:'24px'}}/>Purchase Now</button></Link>
                            </div>
                        )}
                        
                        <br/><br/>
                    </div>
                    <YouMayLike/>
                </div>
            )
        }else{
            return(
                <div>
                    <SkltnTotalMoney/>
                    <YouMayLike/>
                </div>
            )
        }




        
    }
}

function mapStateToProps(state){
    return{
        totalPriceNow: state.totalPriceNow,
        
    }
}

export default connect(mapStateToProps)(MyCart);

/**
 * if(this.state.noItem && !this.state.youMayLike.length){
            return(
                <div className='container'>
                    <div style={{textAlign:'center', padding:'16px', backgroundColor:'white'}}>
                        <h1 style={{color:'orangered'}}>No Item in Cart.</h1>
                        <NavLink to='/'><button style={{fontSize:'18px'}} className='button effect deep-orange text-white'>Continue Shopping</button></NavLink>
                    </div>
                    <SkeletonProductContainer/>
                    <SkeletonProductContainer/>
                </div>
            )
        }else if(this.state.noItem && this.state.youMayLike.length){
            
            return(
                <div className='container'>
                    <div style={{textAlign:'center', padding:'16px', backgroundColor:'white'}}>
                        <h1 style={{color:'orangered'}}>No Item in Cart.</h1>
                        <NavLink to='/'><button style={{fontSize:'18px'}} className='button effect deep-orange text-white'>Continue Shopping</button></NavLink>
                    </div>
                    {s}
                </div>
            )
        }else if(this.state.myCart.data.length && !this.state.youMayLike.length){

            
        }else if(this.state.items.length){
            totalItem = this.state.totalItem
            allItems = this.state.items
            total = this.state.total
            saving = this.state.saving
            
            const s = allItems.map((l,i)=>{
                var priceNow = l['price'] - l['price']*l['discount']/100
                return(
                    <CartItem key={i}
                        name={l['name']} companyName={l['company']} price={l['price']}
                        discount={l['discount']} priceNow={priceNow} quantity={1}
                    />
                )
            })

            var youMayLike = this.state.youMayLike
            const s2 = youMayLike.map((l,i)=>{
                return(
                    <ProductContainer
                        categoryName={l['name']} data={l['data']}
                    />
                )
            })
            return(
                <div className='container'>
                    <TotalMoneyCard totalItem={totalItem} total={total}  
                        saving={saving}
                    />
                        <br/>
                    <div className='white'>
                        
                        {s}

                        <div style={{textAlign:'right', maxWidth:'1000px', margin:'auto', padding:'8px'}}>
                            <h1 style={{color:'red', margin:'0 18px'}}>Total: {total}$</h1>
                            <button className='button deep-orange hover-green effect' style={{margin:'8px 18px', maxWidth:'300px', minWidth:'220px', width:'50%', fontSize:'20px'}}><BiPurchaseTag style={{margin:'0 4px -4px 4px', fontSize:'24px'}}/>Purchase Now</button>
                        </div>

                        <br/><br/>
                    </div>
                    {s2}
                    <br/><br/>
                </div>
            )
        }
        
        return (
            <div className='container'>
                <SkltnTotalMoney/>
                    <br/>
                <div className='white'>
                    <SkltnCartItem/>
                    <SkltnCartItem/>
                    <div style={{textAlign:'right', maxWidth:'1000px', margin:'auto', padding:'8px'}}>
                        <h1 style={{color:'red', margin:'0 18px'}}>Total: - $</h1>
                        <button className='button deep-orange hover-green effect' style={{margin:'8px 18px', maxWidth:'300px', minWidth:'220px', width:'50%', fontSize:'20px'}}><BiPurchaseTag style={{margin:'0 4px -4px 4px', fontSize:'24px'}}/>Purchase Now</button>
                    </div>
                    <br/><br/>
                </div>
                <YouMayLike/>
                <br/><br/><br/>
            </div>
        );
 */