import React, { Component } from 'react';
import Information from './Information';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import { TiTick } from 'react-icons/ti';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Purchase extends Component {
    constructor() {
        super()
        this.state={
            checked: false,
            payment: false,
        }
    }
    paymentDone=()=>{
        this.props.dispatch({
            type: 'paymentDone'
        })
    }
    render() {
        return (
            <div className='relative'>
                <div className='container-for-medium-and-large opacity-maxx'>
                    <div className='purchase-container' style={{paddingTop:'16px'}}>
                        <div className='info-order-flex'>
                            <div className='container'>
                                <div><Information/></div>
                                <div className='hide-ps'><Payment/></div>
                            </div>
                            <div className='container white'>
                                <div><OrderSummary/></div>
                                <div className='hide-pl'><Payment/></div>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                </div>
                {this.props.paymentDone?(
                    <div className='card-4' style={{position:'fixed', top: '50%', left:' 50%', transform: 'translate(-50%, -50%)', zIndex:'6', width:'90%', maxWidth:'600px', backgroundColor:'white'}}>
                        <div style={{position:'relative'}}>
                        <Link to='/'><p onClick={this.paymentDone} className='pointer hover-red text-red' style={{position:'absolute', top:'-36px', right:'12px', border:'1px solid red', padding:'6px 12px', fontSize:'27px'}}>X</p></Link>
            
                            <h1 style={{textAlign:'center'}}><TiTick style={{fontSize:'100px', color:'green', borderRadius:'50%', border:'4px solid orangered'}}/></h1>
                            <h2 style={{textAlign:'center', color:'orangered'}}>Item Successfully Purchased.</h2>
                            <h3 style={{textAlign:'center', color:'orange'}}>Payment receipt.</h3>
                            <h3 style={{textAlign:'center', color:'red'}}>We will never delivery this product.</h3>
                            <hr/>
                            <p style={{textAlign:'center', color:'orange'}}>Go to <Link to='/'><button onClick={this.paymentDone} style={{fontSize:'20px'}} className='green effect button'>Home Page</button></Link> and buy more.</p>
                        </div>
                    </div>
                ):null}
                <br/><br/><br/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        paymentDone: state.paymentDone
    }
}

export default connect(mapStateToProps)(Purchase);