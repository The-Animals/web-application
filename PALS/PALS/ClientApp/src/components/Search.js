import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { updateSummaries } from '../actions/index.js';

const mapDispatchToProps = dispatch => {
    return {
        updateSummaries: results => dispatch(updateSummaries(results))
    }
}

class Search extends Component {
    static displayName = Search.name;

    constructor(props) {
        super(props);
    }

    // TODO: Increase limit before creating PR.
    async componentDidMount() {
        const response = await fetch('api/Summary/all/10');
        const results = await response.json();
        this.props.updateSummaries(results);               
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
    null,
    mapDispatchToProps
)(Search);
