import React, { Component } from 'react';

export class Search extends Component {
    static displayName = Search.name;

    render() {
    return (
        <div>
        <h1>Search</h1>

            <div className="container">
                <div className="row">

                    <div className="col-sm">

                        <div className="container">
                            <div className="row">

                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary">UDP</button>
                                    <button type="button" class="btn btn-secondary">NDP</button>
                                    <button type="button" class="btn btn-secondary">AB</button>
                                    <button type="button" class="btn btn-secondary">All</button>
                                </div>

                            </div>
                            <div className="row">
                            </div>
                        </div>

                    </div>

                    <div className="col-sm">
                        
                    </div>

                </div>
            </div>

        </div>
    );
    }
}
