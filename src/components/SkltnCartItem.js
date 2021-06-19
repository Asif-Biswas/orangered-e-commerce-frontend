import React, { Component } from 'react';

class SkltnCartItem extends Component {
    render() {
        return (
            <div className='white round5'>
                <div style={{maxWidth:'1000px', margin:'auto', padding:'16px 4px'}}>
                    <div style={{display:'flex', width:'100%'}}>
                        <div style={{height:'150px', width:'30%', backgroundColor:'lightgrey', maxWidth:'250px', minWidth:'150px'}}></div>
                        <div style={{width:'65%', marginLeft:'16px', marginTop:'-16px'}}>
                            <h3 style={{width:'100%', maxWidth:'400px', backgroundColor:'silver', height:'40px'}}><span style={{opacity:'0'}}>b</span></h3>
                            <p style={{width:'90%', maxWidth:'300px', backgroundColor:'silver'}}><span style={{opacity:'0'}}>b</span></p>
                            <br/>
                            <p style={{width:'80%', maxWidth:'250px', backgroundColor:'silver'}}><span style={{opacity:'0'}}>b</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SkltnCartItem;