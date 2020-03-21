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
