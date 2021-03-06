import React, { Component } from 'react';
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import { Summary } from './Summary';
import MapBox from './Map';
import InteractiveGraph from './InteractiveGraph';
import { fetchMlas, mlaSelected } from "../actions/mlaListActions";
import { fetchMlaSummaries } from '../actions/mlaSummaryActions';
import { fetchMlaParticipation } from '../actions/mlaParticipationActions';

/**
 * **SRS_REFERENCE**
 * 
 * Contains the MLA profile card, summaries table and comparisons as well as
 * the interactive involvement overtime graph and interactive map. Handles
 * prefetching of MLAs, MLA summaries and MLA participation data.
 * 
 * Interactive map: (REQ12), 
 * View individual MLA's metadata and summaries: (REQ7, REQ11, REQ15),
 * Involvement overtime graph: (REQ8, REQ10)
 * 
 */

const mapStateToProps = state => {
    return {
        mlas: state.mlas,
        mla: state.mla
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMlas: () => dispatch(fetchMlas()),
        fetchMlaSummaries: mlaId => dispatch(fetchMlaSummaries(mlaId)),
        fetchMlaParticipation: mlaId => dispatch(fetchMlaParticipation(mlaId)),
        mlaSelected: mla => dispatch(mlaSelected(mla))
    };
}

class Home extends Component {
    
    static displayName = Home.name;

    componentDidMount() {

        this.props.fetchMlas();
    }

    componentWillReceiveProps(props) {

        if (Object.keys(props.mla).length === 0) {
            const mla = props.mlas.slice(1, props.mlas.length)[Math.floor(Math.random() * props.mlas.length)];
            this.props.fetchMlaSummaries(mla.id);
            this.props.fetchMlaParticipation(mla.id);
            this.props.mlaSelected(mla);
        }
    }

    render() {
        return (
        <div style={{ flexGrow: 1, height: '100%' }}>
            <Grid 
                container
                spacing={2}
                alignItems="stretch"
                style={{ height: '100%' }}>

                <Grid item xs={6} style={{ height: 'calc(100vh - 350px)'}}>
                    <MapBox />
                </Grid>
                <Grid item xs={6} style={{ height: 'calc(100vh - 350px)' }}>
                    <Summary />
                </Grid>
                <Grid item xs={12}>
                    <div style={{height: '300px'}}>
                        <InteractiveGraph />
                    </div>
                </Grid>
    
            </Grid>
        </div>
    );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
