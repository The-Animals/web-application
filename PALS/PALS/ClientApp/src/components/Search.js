import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import {
    updateSummaries,
    updateMlas,
    setFirstTimeLoad } from '../actions/index.js';

import { fetchSummaries } from '../actions/fetchActions';

const mapStateToProps = state => {
    return {
        mlas: state.mlas,
        summaryOffset: state.summaryOffset,
        firstTimeLoad: state.firstTimeLoad,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSummaries: results => dispatch(updateSummaries(results)),
        updateMlas: mlas => dispatch(updateMlas(mlas)),
        fetchSummaries: () => dispatch(fetchSummaries()),
        setFirstTimeLoad: () => dispatch(setFirstTimeLoad()),
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
        }

        this.props.setFirstTimeLoad();

    }

    async componentDidUpdate(prevProps, prevState) {

        // Only fetch if summary offset or first time load changes.
        if (prevProps.summaryOffset !== this.props.summaryOffset ||
            prevProps.firstTimeLoad !== this.props.firstTimeLoad)
        {
            this.props.fetchSummaries();
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
