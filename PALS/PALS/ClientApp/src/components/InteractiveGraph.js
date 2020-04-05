import React, { Component } from 'react';
import { connect } from "react-redux";
import { ResponsiveBar } from '@nivo/bar';

import Grid from '@material-ui/core/Grid';
import { setMlaSummaryDateFilter } from '../actions/mlaSummaryActions';

import GraphLogo from "../shared/GraphLogo.png"

const mapStateToProps = state => {
    return {
        mlaParticipation: state.mlaParticipation,
        mlaSummaryDateFilter: state.mlaSummaryDateFilter,
        mlaParticipationLoading: state.mlaParticipationLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMlaSummaryDateFilter: mlaSummaryDateFilter => dispatch(setMlaSummaryDateFilter(mlaSummaryDateFilter))
    }
}

const barColor = 'steelblue';
const hoveredBarColor = '#386890';
const selectedColor = '#F88017';
const hoveredSelectedColor = '#E46C03';

class InteractiveGraph extends Component {
    constructor(props) {
        super(props);
    }

    getYScale() {
        if (this.props.mlaParticipation.length == 0) 
        {
            return { type: 'linear', min: 0, max: 50 }
        }
        else
        {
            return { type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }
        }
    }

    formatDate(date) {
        const options = {
            year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
        }
        return new Intl.DateTimeFormat('en-US', options).format(date)
    }

    data() {
        return this.props.mlaParticipation.map(p => {
            const dDate = new Date(p.documentDate);
            return {
                documentDate: this.formatDate(dDate),
                'Meaningful Contributions': p.quantity,
            };
        });
    }

    onClick = (data, event) => {
        var dDate = new Date(data.data.documentDate).getTime();
        if (this.props.mlaSummaryDateFilter.includes(dDate))
        {
            // Remove legislative session from filter
            event.target.style.fill = hoveredBarColor;
            const selectedDates = this.props.mlaSummaryDateFilter.filter(
                d => {return dDate !== d;}
            );
            this.props.setMlaSummaryDateFilter(selectedDates);
        }
        else 
        {
            // Add legislative session to filter
            event.target.style.fill = hoveredSelectedColor;
            var selectedDates = this.props.mlaSummaryDateFilter.concat(dDate);
            this.props.setMlaSummaryDateFilter(selectedDates);
        }
    }

    onMouseEnter = (data, event) => {
        var dDate = new Date(data.data.documentDate).getTime();
        if (this.props.mlaSummaryDateFilter.includes(dDate))
        {
            event.target.style.fill = hoveredSelectedColor;
        }
        else 
        {
            event.target.style.fill = hoveredBarColor;
        }
    }

    onMouseLeave = (data, event) => { 
        var dDate = new Date(data.data.documentDate).getTime();
        if (this.props.mlaSummaryDateFilter.includes(dDate))
        {
            event.target.style.fill = selectedColor;
        }
        else 
        {
            event.target.style.fill = barColor;
        }
    }

    render() {
        return (
            this.props.mlaParticipationLoading ?

            <Grid container
                spacing={3}
                justify="center"
                alignItems="center"
                className={"fillHeight"}
            >

                <Grid item xs={12}>
                    <img
                        src={GraphLogo}
                        alt="Graph Loading..."
                        width="300px" height="200px"
                        className={"centerImage"}
                    />
                </Grid>

            </Grid>
            
                :

            <ResponsiveBar
                data={this.data()}
                keys={[ 'Meaningful Contributions' ]}
                indexBy='documentDate'
                colors= {barColor}
                margin={{ top: 30, right: 60, bottom: 40, left: 60 }}
                padding={0.3}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                xScale={{
                    type: 'time',
                }}
                axisBottom={{
                    legend: 'Legislative Session',
                    legendPosition: 'middle',
                    legendOffset: 20,
                    format: () => null
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Contributions to Debate',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                animate={true}
                motionStiffness={45}
                motionDamping={15}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveGraph);

