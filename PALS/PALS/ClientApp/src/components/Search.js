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

                    <div className="col-sm">

                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary">UDP</button>
                            <button type="button" class="btn btn-secondary">NDP</button>
                            <button type="button" class="btn btn-secondary">AB</button>
                            <button type="button" class="btn btn-secondary">All</button>
                        </div>

                    </div>

                    <div className="col-sm">
                        <SearchWithFilters></SearchWithFilters>
                    </div>

                </div>

                <div className="row">

                    <div className="col-sm">
                        <SearchTable></SearchTable>
                    </div>

                    <div className="col-sm" className="search-result-container">
                        <Summary></Summary>
                    </div>

                </div>

            </div>

        </div>
    );
    }


}
