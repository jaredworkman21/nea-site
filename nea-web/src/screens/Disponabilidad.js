import React from "react";
import { ScrollView, StyleSheet, Dimensions, View, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {connect} from 'react-redux';
import { updateWasher } from "../services/firebaseServices";
import {ADD_AVAILABILITY_TO_WASHER, UPDATE_WASHER_STATUS} from '../actions/types';

class Disponabilidad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: null,
            selectedStartDate: null,
            whichTimer: '',
            isDatePickerVisible: false,
            setDatePickerVisibility: false,
            timeMondayMorning: null,
            timeTuesdayMorning: null,
            timeWednesdayMorning: null,
            timeThursdayMorning: null,
            timeFridayMorning: null,
            timeSaturdayMorning: null,
            timeSundayMorning: null,
            timeMondayNight: null,
            timeTuesdayNight: null,
            timeWednesdayNight: null,
            timeThursdayNight: null,
            timeFridayNight: null,
            timeSaturdayNight: null,
            timeSundayNight: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
        }
        submitAvailability (props) {
            props.dispatch({
                type: ADD_AVAILABILITY_TO_WASHER,
                payload: {
                    availability: {
                        timeMondayMorning: this.state.timeMondayMorning,
                        timeTuesdayMorning: this.state.timeTuesdayMorning,
                        timeWednesdayMorning: this.state.timeWednesdayMorning,
                        timeThursdayMorning: this.state.timeThursdayMorning,
                        timeFridayMorning: this.state.timeFridayMorning,
                        timeSaturdayMorning: this.state.timeSaturdayMorning,
                        timeSundayMorning: this.state.timeSundayMorning,
                        timeMondayNight: this.state.timeMondayNight,
                        timeTuesdayNight: this.state.timeTuesdayNight,
                        timeWednesdayNight: this.state.timeWednesdayNight,
                        timeThursdayNight: this.state.timeThursdayNight,
                        timeFridayNight: this.state.timeFridayNight,
                        timeSaturdayNight: this.state.timeSaturdayNight,
                        timeSundayNight: this.state.timeSundayNight,
                    }
                }
            });
            this.props.dispatch({
                type: UPDATE_WASHER_STATUS,
                payload: {
                status: 'available',
                }
              });
            updateWasher(props.washer, 'availability');
            props.navigation.navigate("Capacitacion");
        }

        onDateChange(date) {
            this.setState({
                selectedStartDate: date,
            });
        }
         
        showDatePicker = (whichTimer) => {
            this.setState({
                whichTimer: whichTimer,
                isDatePickerVisible: true,
            });
        };
        
        hideDatePicker = () => {
            this.setState({
                isDatePickerVisible: false,
            });
        };
        
        handleConfirm = (date) => {
            const datePM = this.formatAMPM(date);
            console.warn("A time has been picked: ", datePM);
            if(this.state.whichTimer == 'timeMondayMorning') {this.setState({timeMondayMorning: datePM});}
            else if(this.state.whichTimer == 'timeMondayNight') {this.setState({timeMondayNight: datePM});}
            else if(this.state.whichTimer == 'timeTuesdayMorning') {this.setState({timeTuesdayMorning: datePM});}
            else if(this.state.whichTimer == 'timeTuesdayNight') {this.setState({timeTuesdayNight: datePM});}
            else if(this.state.whichTimer == 'timeWednesdayMorning') {this.setState({timeWednesdayMorning: datePM});}
            else if(this.state.whichTimer == 'timeWednesdayNight') {this.setState({timeWednesdayNight: datePM});}
            else if(this.state.whichTimer == 'timeThursdayMorning') {this.setState({timeThursdayMorning: datePM});}
            else if(this.state.whichTimer == 'timeThursdayNight') {this.setState({timeThursdayNight: datePM});}
            else if(this.state.whichTimer == 'timeFridayMorning') {this.setState({timeFridayMorning: datePM});}
            else if(this.state.whichTimer == 'timeFridayNight') {this.setState({timeFridayNight: datePM});}
            else if(this.state.whichTimer == 'timeSaturdayMorning') {this.setState({timeSaturdayMorning: datePM});}
            else if(this.state.whichTimer == 'timeSaturdayNight') {this.setState({timeSaturdayNight: datePM});}
            else if(this.state.whichTimer == 'timeSundayMorning') {this.setState({timeSundayMorning: datePM});}
            else if(this.state.whichTimer == 'timeSundayNight') {this.setState({timeSundayNight: datePM});}
            this.hideDatePicker();
        };
        formatAMPM = (date) => {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
          }
  render() {
    const { selectedStartDate, time } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <div >
<div>
        <div>
            <div p style={{paddingLeft: 10, paddingTop: 10}}>Monday</div>
            <div style={{ flexDirection:"row", marginRight: 30}}>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeMondayMorning')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, marginRight: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeMondayMorning }</div>
                            </div>
                        </div>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={() => this.showDatePicker('timeMondayNight')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, width: 80}}>Finish</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeMondayNight }</div>
                            </div>
                        </div>
            </div>
            
            <DateTimePickerModal
                    headerTextIOS=""
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
        </div>
        <div>
            <div p style={{paddingLeft: 10, paddingTop: 10}}>Tuesday</div>
            <div style={{ flexDirection:"row", marginRight: 30}}>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeTuesdayMorning')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, marginRight: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeTuesdayMorning }</div>
                            </div>
                        </div>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeTuesdayNight')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeTuesdayNight }</div>
                            </div>
                        </div>
            </div>
            
            <DateTimePickerModal
                    headerTextIOS=""
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
        </div>
        <div>
            <div p style={{paddingLeft: 10, paddingTop: 10}}>Wednesday</div>
            <div style={{ flexDirection:"row", marginRight: 30}}>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeWednesdayMorning')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, marginRight: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeWednesdayMorning }</div>
                            </div>
                        </div>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeWednesdayNight')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, width: 80}}>Finish</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeWednesdayNight }</div>
                            </div>
                        </div>
            </div>
            
            <DateTimePickerModal
                    headerTextIOS=""
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
        </div>
        <div>
            <div p style={{paddingLeft: 10, paddingTop: 10}}>Thursday</div>
            <div style={{ flexDirection:"row", marginRight: 30}}>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeThursdayMorning')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, marginRight: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeThursdayMorning }</div>
                            </div>
                        </div>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeThursdayNight')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, width: 80}}>Finish</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeThursdayNight }</div>
                            </div>
                        </div>
            </div>
            
            <DateTimePickerModal
                    headerTextIOS=""
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
        </div>
        <div>
            <div p style={{paddingLeft: 10, paddingTop: 10}}>Friday</div>
            <div style={{ flexDirection:"row", marginRight: 30}}>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeFridayMorning')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, marginRight: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeFridayMorning }</div>
                            </div>
                        </div>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeFridayNight')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, width: 80}}>Finish</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeFridayNight }</div>
                            </div>
                        </div>
            </div>
            
            <DateTimePickerModal
                    headerTextIOS=""
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
        </div>
        <div>
            <div p style={{paddingLeft: 10, paddingTop: 10}}>Saturday</div>
            <div style={{ flexDirection:"row", marginRight: 30}}>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeSaturdayMorning')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, marginRight: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeSaturdayMorning }</div>
                            </div>
                        </div>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeSaturdayNight')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, width: 80}}>Finish</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeSaturdayNight }</div>
                            </div>
                        </div>
            </div>
            
            <DateTimePickerModal
                    headerTextIOS=""
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
        </div>
        <div>
            <div p style={{paddingLeft: 10, paddingTop: 10}}>Sunday</div>
            <div style={{ flexDirection:"row", marginRight: 30}}>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeSundayMorning')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, marginRight: 10, width: 80}}>Start</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeSundayMorning }</div>
                            </div>
                        </div>
                        <div style={{flex: 1, }}>
                            <Button title="Show Date Picker" onClick={ () => this.showDatePicker('timeSundayNight')} 
                                        color="#286AEC"
                                        style={{marginTop: 10, width: 80}}>Finish</Button>
                        </div>
                        <div style={{flex: 1, }}>
                            <div style={{backgroundColor: 'white', marginTop: 10, marginLeft: 10, padding: 10, height: 45, width: 80 }}>
                                    <div p>{ this.state.timeSundayNight }</div>
                            </div>
                        </div>
            </div>
            
            <DateTimePickerModal
                    headerTextIOS=""
                    isVisible={this.state.isDatePickerVisible}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
        </div>
        <div style={{alignItems: 'center'}}>
            <Button title="Show Date Picker" onClick={() => this.submitAvailability(this.props)} 
                                        color="#286AEC"
                                        style={{marginTop: 30, marginRight: 10, width: 170}}>Submit</Button>
        </div>
        </div>
      </div>
    );
  }
}

const styles = {
    container: {
      backgroundColor: "black",
    },
    cardblock: {
        width: 10 * 20 ,
        height:120,
        backgroundColor: "white",
        borderRadius: 4,
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
        flex: 1,
        flexDirection: 'row'
    },
    padded: {
      paddingHorizontal:  10 * 2,
      zIndex: 3,
      position: "absolute",

    },
    button: {
width:  100,
      height:  10 * 3,
      shadowRadius: 0,
      shadowOpacity: 0
    },
    pro: {
      backgroundColor: 'black',
      paddingHorizontal: 8,
      marginLeft: 3,
      borderRadius: 4,
      height: 22,
      marginTop: 15
    },
    gradient: {
      zIndex: 1,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 66
    }
  }


  const mapStateToProps = (state) => {
    return {
      washer: state.washer.washer,
    }
  };
  
  export default connect(mapStateToProps)(Disponabilidad);