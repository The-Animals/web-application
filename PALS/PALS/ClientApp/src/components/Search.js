import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { fetchMlas } from '../actions/mlaListActions.js';
import { fetchSummaries } from '../actions/summaryTableActions';


const mapStateToProps = state => {
    return {
        mlas: state.mlas,
        summaryOffset: state.summaryOffset,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMlas: () => dispatch(fetchMlas()),
        fetchSummaries: () => dispatch(fetchSummaries())
    };
}

class Search extends Component {
    static displayName = Search.name;

    async componentDidMount() {
        if (this.props.mlas.length == 0) {
            this.props.fetchMlas();
        }
    }

    async componentDidUpdate() {
        this.props.fetchSummaries();
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
