import React, { Component } from 'react';
import { connect } from "react-redux";
import mapboxgl from 'mapbox-gl';

import { fetchMlaSummaries } from '../actions/mlaSummaryActions';
import { fetchMlaParticipation } from '../actions/mlaParticipationActions';
import { mlaSelected, similarMla, differentMla } from '../actions/mlaListActions';

mapboxgl.accessToken = 'pk.eyJ1IjoidnBwYXRlbDExMSIsImEiOiJjazhmMXJmdWgwMjd6M21wZHc1bWFxeWRtIn0.ptbqpiRLFxgKwJO_NIsvxg';

const mapStateToProps = state => {
    return {
        mlas: state.mlas,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMlaSummaries: mlaId => dispatch(fetchMlaSummaries(mlaId)),
        fetchMlaParticipation: mlaId => dispatch(fetchMlaParticipation(mlaId)),
        mlaSelected: mla => dispatch(mlaSelected(mla))
    }
}

class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -115.8155,
            lat: 55.3337,
            zoom: 4.08,
        };
        this.hoveredStateId = null;
    }

    componentDidMount() {

        var bounds = [
            [-125.48164075084577, 47.461008199748875], // Southwest coordinates
            [-106.14935924915302, 61.90289294926896] // Northeast coordinates
        ];

        const self = this;
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            maxBounds: bounds
        });

        // disable map rotation using right click + drag
        map.dragRotate.disable();

        // disable map rotation using touch rotation gesture
        map.touchZoomRotate.disableRotation();

        map.on('load', () => {
            map.addSource('states', {
                type: 'vector',
                url: 'mapbox://vppatel111.0ooesvor'
            });
            // The feature-state dependent fill-opacity expression will render the hover effect
            // when a feature's hover state is set to true.
            map.addLayer({
                'id': 'state-fills',
                'type': 'fill',
                'source': 'states',
                'source-layer': '2019Boundaries_ED-Shapefiles-2nzdq4',
                'layout': {},
                'paint': {
                    'fill-color': '#0D3692',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.8,
                        0.3
                    ]
                }
            });

            map.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'states',
                'source-layer': '2019Boundaries_ED-Shapefiles-2nzdq4',
                'layout': {},
                'paint': {
                    'line-color': '#FEBA35',
                    'line-width': 1
                }
            });

            // When the user moves their mouse over the state-fill layer, we'll update the
            // feature state for the feature under the mouse.
            map.on('mousemove', 'state-fills', function (e) {
                if (e.features.length > 0) {
                    if (this.hoveredStateId) {
                        map.setFeatureState(
                            { source: 'states', sourceLayer: '2019Boundaries_ED-Shapefiles-2nzdq4', id: this.hoveredStateId },
                            { hover: false }
                        );
                    }
                    this.hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: 'states', sourceLayer: '2019Boundaries_ED-Shapefiles-2nzdq4', id: this.hoveredStateId },
                        { hover: true }
                    );
                }
            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', 'state-fills', function () {
                if (this.hoveredStateId) {
                    map.setFeatureState(
                        { source: 'states', sourceLayer: '2019Boundaries_ED-Shapefiles-2nzdq4', id: this.hoveredStateId },
                        { hover: false }
                    );
                }
                this.hoveredStateId = null;
            });

            map.on('click', 'state-fills', function (e) {
                if (this.hoveredStateId) {
                    const ridingNumber = e.features[0].properties.EDNumber20;
                    const mla = self.props.mlas.find(mla => mla.ridingNumber === ridingNumber);
                    self.props.fetchMlaSummaries(mla.id);
                    self.props.fetchMlaParticipation(mla.id);
                    self.props.mlaSelected(mla);
                }

            });

        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapBox);
