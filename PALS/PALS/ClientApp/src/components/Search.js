import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { updateSummaries } from '../actions/index.js';
import { updateMlas } from '../actions/index.js';

const mapStateToProps = state => {
    return {
        mlas: state.mlas,
        summaryOffset: state.summaryOffset
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSummaries: results => dispatch(updateSummaries(results)),
        updateMlas: mlas => dispatch(updateMlas(mlas))
    }
}

function mapMlasToObject(mlas) {

    return mlas.reduce(function (map, obj) {
        map[obj.id] = obj;
        return map;
    }, {});

}

function mapMlaPartyToSummaries(mlas, summaries) {

    return summaries.map(function (summary) {
        var newSummary = Object.assign({}, summary);
        newSummary.caucus = mlas[summary.mlaId].party;
        return newSummary;
    });

}

async function fetchSummaries(props, summaryOffset) {
    const responseSummaries = await fetch('api/Summary/all/1000/' + summaryOffset);
    var resultsSummaries = await responseSummaries.json();

    // Fetch mlas if not already loaded.
    if (props.mlas.length == 0) {
        const responseMlas = await fetch('api/mla/all');
        const resultMlas = await responseMlas.json();
        props.updateMlas(resultMlas);
        return;
    }

    var mlas = mapMlasToObject(props.mlas);
    resultsSummaries = mapMlaPartyToSummaries(mlas, resultsSummaries)

    props.updateSummaries(resultsSummaries);
}

class Search extends Component {
    static displayName = Search.name;

    async componentDidMount() {
        await fetchSummaries(this.props, 0);
    }

    async componentDidUpdate() {
        await fetchSummaries(this.props, this.props.summaryOffset);
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
