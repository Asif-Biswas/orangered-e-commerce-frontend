import React, { Component } from 'react';
import Category from './Category';

class CategoryNameContainer extends Component {
    render() {
        if (this.props.data.length) {
            var data = this.props.data
            const s = data.map((l,i)=>{
                return(
                    <Category key={i}
                        name={l['name']}
                    />
                )
            })
            return (
                <div style={{display:'flex'}}>
                    {s}
                </div>
            );
        }else{
            return(
                <div></div>
            )
        }
        
    }
}

export default CategoryNameContainer;