import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { updateSummaries } from '../actions/index.js';
import { fetchMlas } from '../actions/mlaListActions.js';
import { fetchSummaries } from '../actions/fetchActions';


const mapStateToProps = state => {
    return {
        mlas: state.mlas
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSummaries: results => dispatch(updateSummaries(results)),
        fetchMlas: () => dispatch(fetchMlas()),
        fetchSummaries: () => dispatch(fetchSummaries())
    };
}

class Search extends Component {
    static displayName = Search.name;

    async componentDidMount() {        
        this.props.fetchMlas();       
        this.props.updateSummaries(resultsSummaries);
    }

    render() {
    return (
        <div>
        <h1>Search</h1>

            <div className="container">

                <div className="row">
                    <SearchWithFilters></SearchWithFilters>
                </div>

                <div className="row">
                    <SearchTable></SearchTable>
                </div>

            </div>

        </div>
    );
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
