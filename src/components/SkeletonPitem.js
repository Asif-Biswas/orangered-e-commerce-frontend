import React, { Component } from 'react';

class SkeletonPitem extends Component {
    render() {
        return (
            <div style={{height:'230px', marginRight:'6px'}}>
                <div className='product-item' style={{backgroundColor:'lightgrey', height:'140px'}}>
                    <div className='animate-fading' style={{width:'100%', height:'140px', backgroundColor:'gray'}}></div>
                </div>
                <div>
                    <p style={{width:'150px', height:'22px', backgroundColor:'silver'}}></p>
                    <p style={{width:'120px', height:'18px', backgroundColor:'lightgrey'}}></p>
                </div>
            </div>
        );
    }
}

export default SkeletonPitem;