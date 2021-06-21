import React, { Component } from 'react';
import { connect } from 'react-redux';

class Information extends Component {
    constructor() {
        super()
        this.state={
            fullName: '',
            fullAddress: '',
            email: '',
            phone: '',
        }
    }

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url3 = 'https://orangered-backend2.herokuapp.com/myDetails/'
        fetch(url3, {
            method: 'GET',
            //credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        }).then(res=>res.json().then(result=>{
            this.props.dispatch({
                type: 'emailChanged',
                payload: result.email,
            })
            this.setState({fullName: result.fullName, fullAddress: result.fullAddress, email: result.email, phone: result.phone})
        }))
    }

    fullName=(e)=>{
        this.setState({fullName: e.target.value})
        this.props.dispatch({
            type: 'fullNameChanged',
            payload: e.target.value,
        })
    }
    fullAddress=(e)=>{
        this.setState({fullAddress: e.target.value})
        this.props.dispatch({
            type: 'fullAddressChanged',
            payload: e.target.value,
        })
    }
    email=(e)=>{
        this.setState({email: e.target.value})
        this.props.dispatch({
            type: 'emailChanged',
            payload: e.target.value,
        })
    }
    phone=(e)=>{
        this.setState({phone: e.target.value})
        this.props.dispatch({
            type: 'phoneChanged',
            payload: e.target.value,
        })
    }
    render() {
        return (
            <div className='card padding round5 white'>
                <h1 style={{color:'orangered'}}>Information</h1>
                
                <input value={this.state.fullName} onChange={this.fullName} className='information-placeholder-color' placeholder='Full name' style={{borderBottom:'3px solid orangered', width:'100%', height:'40px', borderTop:'none', borderLeft:'none', borderRight:'none', fontSize:'24px', color:'orangered', paddingLeft:'8px'}} type='text'/>
                <br/><br/>
                
                <input value={this.state.fullAddress} onChange={this.fullAddress} className='information-placeholder-color' placeholder='Full address' style={{borderBottom:'3px solid orangered', width:'100%', height:'40px', borderTop:'none', borderLeft:'none', borderRight:'none', fontSize:'24px', color:'orangered', paddingLeft:'8px'}} type='text'/>
                <br/><br/>
                
                <input value={this.state.email} onChange={this.email} className='information-placeholder-color' placeholder='Email' style={{borderBottom:'3px solid orangered', width:'100%', height:'40px', borderTop:'none', borderLeft:'none', borderRight:'none', fontSize:'24px', color:'orangered', paddingLeft:'8px'}} type='email'/>
                <br/><br/>
                
                <input value={this.state.phone} onChange={this.phone} className='information-placeholder-color' placeholder='Phone number' style={{borderBottom:'3px solid orangered', width:'100%', height:'40px', borderTop:'none', borderLeft:'none', borderRight:'none', fontSize:'24px', color:'orangered', paddingLeft:'8px'}} type='number'/>
                <br/><br/><br/>

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
    }
}

export default connect(mapStateToProps)(Information);