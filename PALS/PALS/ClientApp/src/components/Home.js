import React, { Component } from 'react';
import { connect } from "react-redux";

import { Summary } from './Summary';
import MapBox from './Map';
import InteractiveGraph from './InteractiveGraph';
import { fetchMlas, mlaSelected } from "../actions/mlaListActions";
import { fetchMlaSummaries } from '../actions/mlaSummaryActions';
import { fetchMlaParticipation } from '../actions/mlaParticipationActions';

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
        <div style={{height: '100%'}}>
            <div className="container" style={{height: '100%'}}>
                <div className="row" style={{height: '65%'}}>
                    <div className="col-sm" style={{height: '100%'}}>
                        <MapBox />
                    </div>

                    <div className="col-sm" style={{height: '100%'}}>
                        <Summary />
                    </div>
                </div>
                <div className="row" style={{height: '35%'}}>
                    <div className="col-sm" style={{height: '100%'}}>
                        <InteractiveGraph/>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
