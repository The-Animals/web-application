import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import MLAProfileCard from './MLAProfileCard.js';


/**
 * **SRS_REFERENCE**
 *
 * Contains the MLA comparisons.
 *
 * View individual MLA's comparisons: (REQ11),
 *
 */

export default function SimilaritiesTable() {

    return (
      <Paper style={{maxHeight: '100%', overflow: 'auto', padding: 10}}>
        <List>
          <div style={{paddingBottom: 10, paddingTop: 10}}>
            <h1>Most Similar</h1>
            <MLAProfileCard type='similar' />
          </div>
          <div style={{paddingBottom: 10, paddingTop: 10}}>
            <h1>Most Different</h1>
            <MLAProfileCard type='different' />
          </div>
        </List>
      </Paper>
    );
}
