import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { updateSummaries } from '../actions/index.js';
import { updateMlas } from '../actions/index.js';

const mapStateToProps = state => {
    return {
        mlas: state.mlas
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSummaries: results => dispatch(updateSummaries(results)),
        updateMlas: mlas => dispatch(updateMlas(mlas))
    }
}

class Search extends Component {
    static displayName = Search.name;

    // TODO: Increase limit before creating PR.
    async componentDidMount() {
        const responseSummaries = await fetch('api/Summary/all/10');
        const resultsSummaries = await responseSummaries.json();
        this.props.updateSummaries(resultsSummaries);

        // Fetch mlas if not already loaded.
        if (this.props.mlas.length == 0) {
            const responseMlas = await fetch('api/mla/all');
            const resultMlas = await responseMlas.json();
            this.props.updateMlas(resultMlas);   
        }
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
