import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import SkltnCartItem from './SkltnCartItem';

class MyAllCartItems extends Component {
    constructor() {
        super()
        this.state={
            items:[],
            hide: false,
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url2 = 'https://orangered-backend.herokuapp.com/myAllCartItems/'
        fetch(url2,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        }).then(res=>res.json().then(result=>{
            this.setState({items: result})
        }))

        setTimeout(()=>{
            this.setState({hide: true})
        },2000)
    }
    componentDidUpdate(newProps) {
        if( newProps.keyForNewCartItem !== this.props.keyForNewCartItem ) {
          this.componentDidMount()
        }
      }
    render() {
        if(this.state.items.length){
            var items = this.state.items
            const s = items.map((l,i)=>{
                var priceNow = l['price'] - l['price']*l['discount']/100
                return(
                    <CartItem key={i} img={l['image_url']} id={l['id']}
                        name={l['name']} companyName={l['company']['name']} price={l['price']}
                        discount={l['discount']} priceNow={priceNow} quantity={l['quantity']}
                    />
                )
            })
            return(
                <div key={this.props.keyForNewCartItem}>
                    {s}
                </div>
            )
        }else{
            return(
                <div>
                {this.state.hide?(
                    null
                ):(
                    <div>
                        <SkltnCartItem/>
                        <SkltnCartItem/>
                    </div>
                )}
                    
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        keyForNewCartItem: state.keyForNewCartItem,
    }
}

export default connect(mapStateToProps)(MyAllCartItems);