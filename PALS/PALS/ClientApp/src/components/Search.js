import React, { Component } from 'react';
import SearchTable from './SearchTable';
import SearchWithFilters from './SearchWithFilters';

import { Summary } from './Summary';

export class Search extends Component {
    static displayName = Search.name;

    render() {
    return (
        <div>
        <h1>Search</h1>

            <div className="container">

                <div className="row">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary">UCP</button>
                        <button type="button" className="btn btn-secondary">NDP</button>
                        <button type="button" className="btn btn-secondary">AB</button>
                        <button type="button" className="btn btn-secondary">All</button>
                    </div>
                </div>

                <div className="row">
                    <SearchWithFilters></SearchWithFilters>
                </div>

                <div className="row">

                    <div className="col-7">
                        <SearchTable></SearchTable>
                    </div>

                    <div className="col-5">
                        <Summary></Summary>
                    </div>

                </div>

            </div>

        </div>
    );
    }


}
