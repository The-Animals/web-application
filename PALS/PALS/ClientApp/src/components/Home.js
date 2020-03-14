import React, { Component } from 'react';
import { connect } from "react-redux";

import { Summary } from './Summary';
import { viewMLA } from "../actions/index";

import mapboxgl from 'mapbox-gl';

const mapDispatchToProps = dispatch => {
    return {
        viewMLA: mlaId => dispatch(viewMLA(mlaId))
    }
}

class MapBox extends Component {
    constructor(props) {

        super(props);
        this.state = {
            lng: -115.8155,
            lat: 55.3337,
            zoom: 4.08,
            props: props
        };
        this.hoveredStateId = null;        
    }

    componentDidMount() {

        const self = this;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

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
                    'fill-color': '#627BC1',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
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
                    'line-color': '#627BC1',
                    'line-width': 2
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

                    const mlaId = e.features[0].properties.EDNumber20;
                    self.props.viewMLA({ mlaId });     
                    
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

export class Home extends Component {
    static displayName = Home.name;

    render() {
    return (
        <div>
            <div className="container">
                <div className="row">

                    <div className="col-sm">

                    </div>

                    <div className="col-sm">
                        <Summary></Summary>
                    </div>

                </div>
            </div>
        </div>
    );
    }
}

const Map = connect(
    null,
    mapDispatchToProps
)(MapBox);
export default Map;

