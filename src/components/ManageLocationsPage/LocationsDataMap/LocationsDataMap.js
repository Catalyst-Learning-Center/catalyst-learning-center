import React, { Component } from 'react'

class LocationsDataMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationToEdit: {
                location_name: '',
                location_address: '',
                location_city: '',
                location_state: '',
                location_zipcode: '',
                location_phone: ''
            }//end locationToEdit
        }//end state
    }//end constructor



  render() {

    return (
      <div>
          {/* {this.state.locations.map((location, i)=>{
            console.log(location);
                        
            return (
                <React.Fragment key={location.id}> 
                <LocationExpansionPanel key={i} location={location} handleEditDialogOpen={this.handleEditDialogOpen}/>
                <EditLocationsDialog location = {location}
                    open={this.state.editDialogOpen}
                    handleEditDialogClose={this.handleEditDialogClose}
                    handleEditChange={this.handleEditChange}/>
                </React.Fragment>
            )
        })} */}
      </div>
    )
  }//end render
}//end Component
export default LocationsDataMap;