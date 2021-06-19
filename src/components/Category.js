import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Category extends Component {
    clicked=()=>{
        this.props.dispatch({
            type: 'searchInput',
            payload: this.props.name
        })
    }
    render() {
        return (
            <Link to='/search'>
                <div onClick={this.clicked} className=''>
                    <div className='card-4 category-item effect round5' style={{height:'50px', margin:'4px 8px', float:'left'}}>
                        <p style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{this.props.name}</p>
                        
                    </div>
                    
                </div>
            </Link>
        );
    }
}

function mapStateToProps(state){
    return{
        
    }
}

export default connect(mapStateToProps)(Category);