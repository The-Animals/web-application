import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { updateSummaries } from '../actions/index.js';
import { updateMlas } from '../actions/index.js';
import { fetchSummaries } from '../actions/fetchActions';

const mapStateToProps = state => {
    return {
        mlas: state.mlas,
        summaryOffset: state.summaryOffset,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSummaries: results => dispatch(updateSummaries(results)),
        updateMlas: mlas => dispatch(updateMlas(mlas)),
        fetchSummaries: () => dispatch(fetchSummaries())
    };
}

async function fetchMlas(props) {
    const responseMlas = await fetch('api/mla/all');
    const resultMlas = await responseMlas.json();
    props.updateMlas(resultMlas);
}

class Search extends Component {
    static displayName = Search.name;

    async componentDidMount() {

        // Fetch mlas if not already loaded.
        if (this.props.mlas.length === 0) {
            await fetchMlas(this.props);
        } else {
            this.props.fetchSummaries();
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
