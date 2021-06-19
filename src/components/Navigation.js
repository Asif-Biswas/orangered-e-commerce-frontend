import React, { Component } from 'react';
import {FaSearch} from 'react-icons/fa'
import {GiShoppingCart} from 'react-icons/gi'
import { connect } from 'react-redux';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import useravater from '../images/useravater.png'

import { Link, NavLink } from 'react-router-dom';

class Navigation extends Component {
    constructor() {
        super()
        this.state={
            registered: false,
            signin: true,
            //nameClicked: false,
            //classNameForNameClicked: 'hide',
            username:'',
            email:'',
            pass1:'',
            pass2:'',

            loginUsername:'',
            loginPass:'',

            non_field_errors:'',
            errorusername:'',
            erroremail:'',
            errorpass1:'',
            loginnon_field_errors:'',
            loginerrorusername:'',
            loginerrorpass:'',


            loading: false,
            store:'',

            realCart: false,

            redirect: null,

            
        }
    }

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        this.setState({store: store})
        if(store && store.login){
            this.setState({registered: true, realCart: true})
        }
    }

    registrationContainerClicked=()=>{
        this.props.dispatch({
            type: 'registrationContainer',
        })
    }

    signin=()=>{
        this.setState({signin: !this.state.signin})
    }

    /*nameClicked=()=>{
        if(this.state.nameClicked===false){
            this.setState({classNameForNameClicked: ''})
        }else{
            this.setState({classNameForNameClicked: 'hide'})
        }
        this.setState({nameClicked: !this.state.nameClicked})
    }*/

    loginHandler=()=>{
        this.setState({loading:true})
        fetch('https://orangered-backend.herokuapp.comkend.herokuapp.com/api/rest-auth/login/', {
            method: 'POST',
            //credentials: 'include',
            headers:{
                'content-type':'application/json',
                //'X-CSRFToken': this.csrftoken
            },
            body:JSON.stringify({
                'username':this.state.loginUsername,
                'password': this.state.loginPass,
            })
        })
        .then((response)=>{
            response.json().then((result)=>{
                if (result.key !== undefined){
                    localStorage.setItem('login', JSON.stringify({login: true,token:result.key}))
                    //var store = {login: true,token:result.key}
                    this.setState({registered: true, realCart: true})
                    this.props.dispatch({
                        type: 'registrationContainer',
                    })
                    window.location.href = '/'
                }else{
                    this.setState({loading:false})
                    if(result.username !== undefined){this.setState({loginerrorusername: result.username})}
                    
                    if(result.password !== undefined){this.setState({loginerrorpass: result.password})}
                    if(result.non_field_errors !== undefined){this.setState({loginnon_field_errors: result.non_field_errors})}
                }
            })
        })
    }

    signupHandler=()=>{
        this.setState({loading:true})
        fetch('https://orangered-backend.herokuapp.comkend.herokuapp.com/api/rest-auth/registration/', {
            method: 'POST',
            //credentials: 'include',
            headers:{
                'content-type':'application/json',
                //'X-CSRFToken': this.csrftoken
            },
            body:JSON.stringify({
                'username':this.state.username,
                'email': this.state.email,
                'password1': this.state.pass1,
                'password2': this.state.pass2
            })
        })
        .then((response)=>{
            response.json().then((result)=>{
                console.log(result);
                if (result.key !== undefined){
                    localStorage.setItem('login', JSON.stringify({login: true,token:result.key}))
                    //var store = {login: true,token:result.key}
                    this.setState({registered: true, realCart: true})
                    this.props.dispatch({
                        type: 'registrationContainer',
                    })
                    window.location.href = '/'
                }else{
                    this.setState({loading:false})
                    if(result.username !== undefined){this.setState({errorusername: result.username})}
                    if(result.email !== undefined){this.setState({erroremail: result.email})}
                    if(result.password1 !== undefined){this.setState({errorpass1: result.password1})}
                    if(result.non_field_errors !== undefined){this.setState({non_field_errors: result.non_field_errors})}
                }
            })
        })
    }

    logoutHandler=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        fetch('https://orangered-backend.herokuapp.comkend.herokuapp.com/api/rest-auth/logout/', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
            //credentials: 'include',
        })
        .then(res=>{
            res.json()
            localStorage.removeItem('login')
            window.location.href = '/'
        })
    }

    searchInput=(e)=>{
        this.props.dispatch({
            type: 'searchInput',
            payload: e.target.value,
        })
    }
    searchClicked=()=>{
        //this.context.router.push('/search')
        this.props.dispatch({
            type: 'keyValue2'
        })
    }
    /*checkKey=(event)=>{
        if(event.keyCode === 13){
            window.location.href = "/search";
        }
    }*/

    render() {
        if(this.props.totalItemInCart>0){
            var item = true
        }else{
            item = false
        }
        return (
            <div>
                <div style={{height:'70px', backgroundColor:'lightgrey', display:'flex', justifyContent:'space-around', alignItems:'center', padding:'0 32px 0 8px'}}>
                    <div className='flex-center l3 m5 margin-left'>
                        <NavLink style={{textDecoration:'none'}} to='/'> <p className='logo-color' style={{fontSize:'min(7vw,36px)', padding:'4px 20px'}}>OrangeRed</p></NavLink>
                    </div>

                    <div className='flex-center l5' style={{display:'flex'}}>
                        <div className='hide-small hide-medium' style={{width:'100%'}}>
                            <div className='flex' style={{width:'100%'}}>
                                <input value={this.props.searchInput} onKeyDown={this.checkKey} onChange={this.searchInput} style={{width:'100%', height:'36px', borderLeft:'3px solid orangered', borderRadius:'50px 0 0 50px', fontSize:'24px', paddingLeft:'8px', borderTop:'3px solid orangered', borderBottom:'3px solid orangered', color:'orangered'}} type='text' placeholder='Search for Produtcs'/>
                                <Link to='/search'><FaSearch onClick={this.searchClicked} className='pointer' style={{fontSize:'28px', color:'white', marginLeft:'-4px', height:'38px', backgroundColor:'orangered', border:'3px solid orangered', borderRadius:'0 50px 50px 0', paddingLeft:'20px', paddingRight:'22px'}}/></Link>
                            </div>
                        </div>
                    </div>

                    <div className='flex space-between l4 m7 s7'>
                        <div className='pc border-bottom hover-border-red' style={{padding:'0 10px', margin:'4px 12px 0 12px'}}>
                            {this.state.realCart?(
                                <div>
                                    {item?(
                                        <span style={{backgroundColor:'orangered', color:'lightgray', borderRadius:'50%', padding:'0 4px', position:'absolute', top:'-4px', right:'8px', fontSize:'min(4vw,18px)'}}>{this.props.totalItemInCart}</span>
                                    ):null}
                                    <NavLink to='/mycart'><GiShoppingCart className='ka pointer' style={{fontSize:'min(9vw,42px)', fontWeight:'bold', color:'orangered'}}/></NavLink>
                                </div>
                            ):(
                                <GiShoppingCart onClick={this.registrationContainerClicked} className='ka pointer' style={{fontSize:'min(9vw,42px)', fontWeight:'bold', color:'orangered'}}/>
                            )}
                            
                        </div>
                        <div>
                            {this.state.registered?(
                                <div>
                                    <div className='dropdown-hover'>
                                        <img
                                            src={useravater} alt='user' style={{height:'40px', width:'40px', borderRadius:'50%'}}
                                        />
                                        <div style={{position:'absolute', right:'12px'}} className='dropdown-content'>
                                            <p onClick={this.logoutHandler} style={{textAlign:'center', minWidth:'100px'}} className="button border border-deep-orange pointer white">Log out</p>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            ):(
                                <button onClick={this.registrationContainerClicked} className='signup-button pointer' style={{fontSize:'min(4vw,22px)', border:'4px solid orangered', backgroundColor:'lightgrey', fontWeight:'bold', color:'orangered', minWidth:'90px'}}>Sign {this.state.signin?(<span>in</span>):(<span>up</span>)}</button>
                            )}
                            
                            {this.props.registrationContainer?(
                                <div className='hiddeny card-4 signup-container' style={{position:'absolute', backgroundColor:'lightgrey', right:'0', marginTop:'4px', zIndex:'5'}}>
                                    <div className='container'>
                                        <p onClick={this.registrationContainerClicked} className='pointer hover-red text-red' style={{position:'absolute', top:'0', right:'12px', border:'1px solid red', padding:'6px 12px', fontSize:'27px'}}>X</p>
                                        <br/><br/>
                                        {this.state.signin?(
                                            <div>
                                                <br/>
                                                <h1 style={{color:'orangered', textAlign:'center'}}>Sign in</h1>
                                                <div className='container'>
                                                    <p style={{color:'red'}}>{this.state.loginerrorusername}</p>
                                                    <p style={{color:'red'}}>{this.state.loginerrorpass}</p>
                                                    <p style={{color:'red'}}>{this.state.loginnon_field_errors}</p>
                                                    <input onChange={(e)=>{this.setState({loginUsername:e.target.value})}} style={{width:'97%', height:'40px', borderRadius:'10px', border:'4px solid orangered', paddingLeft:'8px', color:'orangered', fontSize:'24px'}} type='text' placeholder='Username'/><br/><br/>
                                                    <input onChange={(e)=>{this.setState({loginPass:e.target.value})}} style={{width:'97%', height:'40px', borderRadius:'10px', border:'4px solid orangered', paddingLeft:'8px', color:'orangered', fontSize:'24px'}} type='password' placeholder='Password'/><br/><br/>
                                                    <button onClick={this.loginHandler} style={{width:'100%', fontSize:'20px', paddingLeft:'8px'}} className='button deep-orange hover-grey pointer'>Sign in {this.state.loading?(<AiOutlineLoading3Quarters className='spin' style={{fontSize:'16px'}}/>):null}</button>
                                                    <p style={{textAlign:'center', color:'orangered'}}>or</p>
                                                    <p style={{color:'orangered', fontSize:'18px'}}>Already have an account? <button onClick={this.signin} style={{backgroundColor:'orangered', border:'3px solid orangered', fontSize:'20px'}} className='button pointer hover-light-grey text-white'>Sign up</button> here.</p>
                                                </div>
                                            </div>
                                        ):(
                                            <div>
                                                <h1 style={{color:'orangered', textAlign:'center'}}>Sign up</h1>
                                                <div className='container'>
                                                    <p style={{color:'red'}}>{this.state.errorusername}</p>
                                                    <p style={{color:'red'}}>{this.state.erroremail}</p>
                                                    <p style={{color:'red'}}>{this.state.errorpass1}</p>
                                                    <p style={{color:'red'}}>{this.state.non_field_errors}</p>
                                                    <input onChange={(e)=>{this.setState({username:e.target.value})}} style={{width:'97%', height:'40px', borderRadius:'10px', border:'4px solid orangered', paddingLeft:'8px', color:'orangered', fontSize:'24px'}} type='text' placeholder='Username'/><br/><br/>
                                                    <input onChange={(e)=>{this.setState({email:e.target.value})}} style={{width:'97%', height:'40px', borderRadius:'10px', border:'4px solid orangered', paddingLeft:'8px', color:'orangered', fontSize:'24px'}} type='email' placeholder='Email'/><br/><br/>
                                                    <input onChange={(e)=>{this.setState({pass1:e.target.value})}} style={{width:'97%', height:'40px', borderRadius:'10px', border:'4px solid orangered', paddingLeft:'8px', color:'orangered', fontSize:'24px'}} type='password' placeholder='Password'/><br/><br/>
                                                    <input onChange={(e)=>{this.setState({pass2:e.target.value})}} style={{width:'97%', height:'40px', borderRadius:'10px', border:'4px solid orangered', paddingLeft:'8px', color:'orangered', fontSize:'24px'}} type='password' placeholder='Password (again)'/><br/><br/>
                                                    <button onClick={this.signupHandler} style={{width:'100%', fontSize:'20px', paddingLeft:'8px'}} className='button deep-orange hover-grey pointer'>Sign up</button>
                                                    <p style={{textAlign:'center', color:'orangered'}}>or</p>
                                                    <p style={{color:'orangered', fontSize:'18px'}}>Already have an account? <button onClick={this.signin} style={{backgroundColor:'orangered', border:'3px solid orangered', fontSize:'20px'}} className='button pointer hover-light-grey text-white'>Sign in</button> here.</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        
                                    </div>
                                </div>
                            ):null}
                        </div>
                    </div>
                </div>
                <div className='hide-large'>
                    <div className='flex-center' style={{width:'100%'}}>
                        <div className='flex' style={{width:'100%', padding:'10px 16px'}}>
                            <input value={this.props.searchInput} onKeyDown={this.checkKey} onChange={this.searchInput} style={{width:'100%', height:'36px', borderLeft:'1px solid orangered', borderRadius:'50px 0 0 50px', fontSize:'20px', paddingLeft:'8px', borderTop:'1px solid orangered', borderBottom:'1px solid orangered', color:'orangered'}} type='text' placeholder='Search for Produtcs'/>
                            <Link to='/search'><FaSearch onClick={this.searchClicked} className='pointer' style={{fontSize:'28px', color:'white', marginLeft:'-4px', height:'38px', backgroundColor:'orangered', border:'1px solid orangered', borderRadius:'0 50px 50px 0', paddingLeft:'16px', paddingRight:'18px'}}/></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        totalItemInCart: state.totalItemInCart,
        registrationContainer: state.registrationContainer,
        searchInput: state.searchInput,
        
    }
}

export default connect(mapStateToProps)(Navigation);