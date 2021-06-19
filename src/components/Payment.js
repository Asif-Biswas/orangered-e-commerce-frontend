import React, { Component } from 'react';
import {AiFillCreditCard} from 'react-icons/ai'
import { connect } from 'react-redux';

class Payment extends Component {

    paymentDone=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url3 = 'https://orangered-backend.herokuapp.com/purchase/'
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
            type: 'paymentDone'
        })
        this.props.dispatch({
            type: 'reloadPage'
        })
    }
    render() {
        return (
            <div className='card padding white round5' style={{marginTop:'8px'}}>
                <h1 className='text-blue'>Payment</h1>
                <div style={{display:'flex'}}>
                    <input className='check' type='checkbox' style={{transform:'scale(1.5)',margin:'20px 24px 0 24px'}}/>
                    <p style={{color:'grey'}}>I hereby confirm that the information that I have provided is correct and I accept the 
                    <span style={{fontSize:'20px', color:'orange'}}> Terms and Conditions.</span></p>
                </div>

                <button onClick={this.paymentDone} className='button blue effect' style={{width:'100%', fontSize:'20px'}}><AiFillCreditCard style={{fontSize:'22px', marginBottom:'-4px'}}/> Pay With Credit Card</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
    }
}

export default connect(mapStateToProps)(Payment);