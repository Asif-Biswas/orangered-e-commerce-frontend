import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
//import { useHistory } from "react-router-dom";
//import images3 from '../images/images-2.jpeg'
import { Redirect } from "react-router-dom";

class ProductItem extends Component {

    constructor() {
        super()
        this.state={
            addedToCart: false,
            store:'',
            redirect: null
        }
    }
    getCookie=(name)=> {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
    csrftoken = this.getCookie('csrftoken');

    addToCart=()=>{
        var id = this.props.id
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
                    var saving = this.props.price - this.props.priceNow
                    this.props.dispatch({
                        type: 'priceChanged',
                        payload: {'price': this.props.price, 'priceNow': this.props.priceNow, 'value': 'increased', 'saving': saving}
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
        var id = this.props.id
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

    clickedForDetails=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        this.setState({store: store})
        if(store && store.login){
            //var history = useHistory()
            this.props.dispatch({
                type: 'productIdChanged',
                payload: this.props.id
            })
            this.setState({ redirect: "/details" });
        }else{
            this.props.dispatch({
                type: 'registrationContainer',
            })
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div style={{marginRight:'6px', position:'relative'}}>
                <div onClick={this.clickedForDetails} style={{}} className='card-2 hover-opacity pointer border-deep-orange product-item'>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className='pi-img-container'>
                        <img src={this.props.img} alt='ProductImage'/>
                    </div>
                    <div style={{margin:'-12px 3px 0 3px', position:'absolute', bottom:'30px'}} className='margin-lr'>
                        <p style={{maxHeight:'64px', overflow:'hidden', verticalAlign:'textBottom'}}>{this.props.name}</p>
                    </div>
                </div>
                <div style={{position:'absolute', bottom:'2px', width:'97%', paddingTop:'2px', zIndex:'2',}} className='space-between white'>
                {this.state.addedToCart?(
                    <button onClick={this.deleteCartItem} style={{marginLeft:'2px', whiteSpace:'nowrap', maxWidth:'120px'}} className='add-to-cart border border-deep-orange deep-orange'>Added to Cart</button>
                ):(
                    <button onClick={this.addToCart} style={{marginLeft:'2px', whiteSpace:'nowrap', maxWidth:'120px'}} className='add-to-cart border border-deep-orange white'>Add to Cart</button>
                )}
                    
                    <div style={{margin:'auto'}}>
                        <span style={{fontSize:'17', color:'orangered'}}>{this.props.priceNow} $</span><br/>
                        <del style={{opacity:'.6', fontSize:'13px'}}>{this.props.price} $</del>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        itemInCart: state.itemInCart
    }
}

export default connect(mapStateToProps)(ProductItem);

/**
 * console.log(this.csrftoken);
            
             * var xhr = new XMLHttpRequest();
                xhr.open('GET', url2, true); 
                xhr.withCredentials = true; 
                xhr.send(null);
             
            
                var url2 = 'https://orangered-backend2.herokuapp.com/addToCartForSession/'+id+'/'
                fetch(url2,{
                    method:'GET',
                    
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrftoken,
                        //csrfHeaderName: "X-CSRFTOKEN",
                        //csrfToken: 
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
                    },
    
                    credentials: "include",
    
                    'Access-Control-Allow-Credentials': true,
                }).then(res=>res.json().then(result=>{
                    if(result.response === 'ok'){
                        this.props.dispatch({
                            type: 'itemInCart',
                        })
                        this.setState({addedToCart: true})
                    }
                }))
 */