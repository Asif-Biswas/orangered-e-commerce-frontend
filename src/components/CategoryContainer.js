import React, { Component } from 'react';
import CategoryNameContainer from './CategoryNameContainer';

class CategoryContainer extends Component {
    render() {
        if(Object.keys(this.props.category).length){
            var allPropsCategory = this.props.category
            var category = allPropsCategory['category']
            var company = allPropsCategory['company']

            var myCategory = [...company, ...category]
            var line1 = myCategory.slice(0, Math.ceil(myCategory.length/2))
            var line2 = myCategory.slice(Math.trunc(myCategory.length/2))//+1 for equal line
            //console.log(line1, line2);

            
            return(
                <div className='white' style={{paddingBottom:'8px'}}>
                    <h2 className='border-left border-deep-orange padding'>
                        <span className='text-deep-orange'>search By Category</span>
                    </h2>
                    <div className='scrollx hide-scrollbar'>
                        <CategoryNameContainer data={line1} />
                        <CategoryNameContainer data={line2} />
                    </div>
                </div>
            )
        }else{
            return (
                <div className='scrollx hide-scrollbar'>
                    <div className='flex '>
                        
                    </div>
                    <div className='flex'>

                    </div>
                </div>
            );
        } 
    }
}

export default CategoryContainer;