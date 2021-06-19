import React, { Component } from 'react';
import SkeletonPitem from './SkeletonPitem';

class SkeletonProductContainer extends Component {
    render() {
        return (
            <div>
                <div style={{marginBottom:'8px'}} className='white'>
                <h2 className='border-left border-deep-orange padding'>
                    <span style={{width:'300px', height:'60px', backgroundColor:'silver'}} className='text-deep-orange'><span style={{opacity:'0'}}>whh hff f f f</span> </span>
                </h2>
                <div style={{marginLeft:'6px'}} className='flex scrollx hide-scrollbar'>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                </div>
            </div>
            </div>
        );
    }
}

export default SkeletonProductContainer;