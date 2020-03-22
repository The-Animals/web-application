import React, { Component } from 'react';
import { connect } from "react-redux";

import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { getData } from '../services/AjaxService.js';
import { updateSearchResults } from '../actions/index.js';

// TODO: Use update all summaries action instead.
const mapDispatchToProps = dispatch => {
    return {
        updateSearchResults: results => dispatch(updateSearchResults(results))
    }
}

class Search extends Component {
    static displayName = Search.name;

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const response = await fetch('api/Summary/all/10');
        const results = await response.json();
        this.props.updateSearchResults(results);               
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
