import React, { Component } from 'react';
import ProductItem from './ProductItem';
import SkeletonPitem from './SkeletonPitem';

class ProductContainer extends Component {
    render() {
        if(this.props.data.length || Object.keys(this.props.data).length){
            var propsData = this.props.data
            const s = propsData.map((l, i)=>{
                //var image = 
                var price = parseInt(l['price'])
                var discount = parseInt(l['discount'])
                var priceNow = Math.round(price - price*discount/100)
                return(
                    <ProductItem
                        key={i} img={l['image_url']} name={l['name']}
                        price={price} priceNow={priceNow} id={l['id']}
                    />
                )
            })
            return (
                <div style={{marginBottom:'8px'}} className='white product-container'>
                    <h2 className='border-left border-deep-orange padding'>
                        <span className='text-deep-orange'>{this.props.categoryName}</span>
                    </h2>
                    <div style={{marginLeft:'6px'}} className='flex scrollx hide-scrollbar'>
                        {s}
                    </div>
                </div>
            );
        }else{
            <div style={{marginBottom:'8px'}} className='white product-container'>
                <h2 className='border-left border-deep-orange padding'>
                    <span className='text-deep-orange'>Category Name</span>
                </h2>
                <div style={{marginLeft:'6px'}} className='flex scrollx hide-scrollbar'>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                    <SkeletonPitem/>
                </div>
            </div>
        }

        
    }
}

export default ProductContainer;