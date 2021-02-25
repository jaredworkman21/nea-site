import React from "react";
// import CalendarPicker from 'react-native-calendar-picker';
import {connect} from 'react-redux';
import { ADD_DATE_TO_CARWASH, ADD_WASHERS_DATA, SET_CASH } from '../actions/types';
import {getAllWashers} from '../services/firebaseServices';
import Moment from 'moment';
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';


class DateSelect extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        time: null,
        selectedStartDate: null,
        isDatePickerVisible: false,
        setDatePickerVisibility: false,
        dateString: null,
        errorMessage: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
    }
    updateDate= async (payType) => {
      if(this.state.time == null){
        this.setState({errorMessage: "Por favor agregar una hora"});
        return;
      }
      else if(this.state.dateString == null){
        this.setState({errorMessage: "Por favor agregar una fecha"});
        return
      }
      this.props.dispatch({
        type: ADD_DATE_TO_CARWASH,
        payload: {
              time: this.state.time,
              selectedDate: this.state.selectedStartDate,
              dateString: this.state.dateString
        }
      });
      const washers = await getAllWashers();
      this.props.dispatch({
        type: ADD_WASHERS_DATA,
        payload: {
              washers: washers,
        }
      });
      if(payType == 'efectivo'){
        this.props.dispatch({
          type: SET_CASH,
          payload: {
            cash: true,
          }
        });
        this.props.history.push("/submit-carwash");
      }
      else {
        if(this.props.user.paymentMethod != null){
          this.props.history.push("/submit-carwash");
        }
        else{
          this.props.history.push("/card-form-screen");
        }
      }
    }
    onDateChange(date) {
      // Moment.locale('es');
      let newdato = Moment(date).format('L');

      this.setState({
          selectedStartDate: date,
          dateString: newdato.toString(),
      });
    }
     
    showDatePicker = () => {
        this.setState({
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
        this.setState({
            time: datePM,
        });
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
        {/* <div>
            <div>SELECTED DATE:{ startDate }</div>
        </div> */}
        <div style={{textAlign: 'center'}}>
            {/* <div style={styles.container}>
                <CalendarPicker
                defaultBackgroundColor='white'
                selectedDayColor='#286AEC'
                selectedDayTextColor='white'
                previousTitle="Anterior"
                nextTitle="Próximo"
                weekdays={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']}
                onDateChange={this.onDateChange}
                />
            </div> */}
            <div>
            <div style={{ flexDirection:"row"}}>
                    <div style={{flex: 1, alignItems: 'center'}}>
                        <Button title="Show Date Picker" onClick={this.showDatePicker} 
                                    color="#286AEC"
                                    style={{marginTop: 20, marginright: 20, width: 120}}> Select a Time</Button>
                    </div>
                    <div style={{flex: 1, alignItems: 'center'}}>
                        <div style={{backgroundColor: 'white', marginTop: 20, marginLeft: 50, padding: 10, height: 45, width: 100 }}>
                                <div p>{ time }</div>
                        </div>
                    </div>
            </div>
            <div style={{color:'red'}}>{this.state.errorMessage}</div>
            <Button
                        color="#000000"
                        style={{marginTop: 20}}
                        onClick={() => this.updateDate('efectivo')}
                        >
                        Pagar en efectivo
                        </Button>
            <Button
            color="#000000"
            style={{marginTop: 20}}
            onClick={() => this.updateDate('aqui')}
            >
            Pagar aquí
            </Button>
            {/* <DateTimePickerModal
                headerTextIOS=""
                isVisible={this.state.isDatePickerVisible}
                mode="time"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
            /> */}
            </div>

        </div>
        </div>
      </div>
    );
  }
}

const styles = {
    container: {
        backgroundColor: 'white',
      padding: 40
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
      user: state.user.user,
      carwash: state.carwash
    }
  };
  
  export default withRouter(connect(mapStateToProps)(DateSelect));