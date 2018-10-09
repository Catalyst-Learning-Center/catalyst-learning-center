import React, { Component } from 'react'
import Select from 'react-select';

class StateSelect extends Component {
    constructor(props){
        super(props);
        this.state = {
            states: [
                'AL', 
                'AK', 
                'AZ', 
                'AR',
                'CA',
                'CO',
                'CT',
                'DE',
                'FL',
                'GA',
                'HI',
                'ID',
                'IL',
                'IN',
                'IA',
                'KS',
                'KY',
                'LA',
                'ME',
                'MD',
                'MA',
                'MI',
                'MN',
                'MS',
                'MO',
                'MT',
                'NE',
                'NV',
                'NH',
                'NJ',
                'NM',
                'NY',
                'NC',
                'ND',
                'OH',
                'OK',
                'OR',
                'PA',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VT',
                'VA',
                'WA',
                'WV',
                'WI',
                'WY'
            ],
            selectedState: '',
        }
    }

  render() {
    return (
        <Select
            textFieldProps={{
                label: 'State',
                InputLabelProps: {
                    shrink: true,
                },
            }}
            options = {
                this.state.states.map((state) => ({
                    value: state,
                    label: state,
                }))
            }
            value={this.state.selectedState}
            onChange={this.handleChange('multi')}
            placeholder="Select multiple countries"
            isMulti
        />
    )
  }
}


export default StateSelect