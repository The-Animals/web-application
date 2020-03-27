import React, { Component } from 'react';
import { connect } from "react-redux";

import { ResponsiveBar } from '@nivo/bar';

const mapStateToProps = state => {
    return {
        mlaParticipation: state.mlaParticipation,
        mla: state.mla
    };
};

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
            return {
                documentDate: this.formatDate(new Date(p.documentDate)),
                participation: p.quantity
            };
        });
    }

    render() {
        return (
            <ResponsiveBar
                data={this.data()}
                keys={[ 'participation' ]}
                indexBy='documentDate'
                margin={{ top: 30, right: 60, bottom: 10, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'category10' }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                xScale={{
                    type: 'time',
                }}
                axisBottom={{
                    legend: 'Time',
                    format: () => null
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Participation',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        )
    }
}

export default connect(mapStateToProps)(InteractiveGraph);

