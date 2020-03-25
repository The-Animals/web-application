import React, { Component } from 'react';
import { connect } from "react-redux";

import { Summary } from './Summary';
import { Map } from './Map';
import { fetchMlas } from "../actions/mlaListActions";

const mapStateToProps = state => {
    return {
        mlas: state.mlas
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMlas: () => dispatch(fetchMlas())
    };
}

class Home extends Component {
    static displayName = Home.name;

    async componentDidMount() {        
        this.props.fetchMlas();  
    }

    render() {
    return (
        <div style={{height: '100%'}}>
            <div className="container" style={{height: '100%'}}>
                <div className="row" style={{height: '100%'}}>

                    <div className="col-sm" style={{height: '100%'}}>

                    </div>

                    <div className="col-sm" style={{height: '100%'}}>
                        <Summary></Summary>
                    </div>

                </div>
            </div>
        </div>
    );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
