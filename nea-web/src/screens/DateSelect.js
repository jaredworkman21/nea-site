import React from "react";
// import CalendarPicker from 'react-native-calendar-picker';
import {connect} from 'react-redux';
import { ADD_DATE_TO_CARWASH, ADD_WASHERS_DATA, SET_CASH } from '../actions/types';
import {getAllWashers} from '../services/firebaseServices';
import Moment from 'moment';
import {Button, TextField} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Header from "../components/Header";
import lighter from '../assets/imgs/lighter_background_wet.png'


class DateSelect extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        time: null,
        selectedDate: new Date(),
        selectedTime: null,
        selectedStartDate: null,
        isDatePickerVisible: false,
        setDatePickerVisibility: false,
        dateString: null,
        value: null,
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
      console.log(date)
        console.warn("A time has been picked: ", date);
        this.setState({
            time: date,
        });
    };

  render() {

    const handleDateChange = (event) => {
      const {value} = event.currentTarget;
      this.onDateChange(value);
    };
    const handleTimeChange = (event) => {
      const {value} = event.currentTarget;
      this.setState({time: value});
    };

    const { selectedStartDate, time } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <div >
                <Header/>

          <div  style={{textAlign: 'center'}}>
            <div style={{ backgroundImage: `url(${lighter})`, paddingTop: 100}} className="new-banner1">
              <div  style={{textAlign: 'center'}}>
                <div style={styles.registerContainer} className="register-container">
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
                        <h3 style={{marginTop: 30}}> Select a Time</h3>
                    </div>
                    <div style={{flex: 1, alignItems: 'center'}}>
                        <div style={{backgroundColor: 'white', marginTop: 20, marginLeft: 50, padding: 10, height: 45, width: 100 }}>
                        </div>
                    </div>
            </div>
            <Grid container justify="space-around" style={{marginBottom: 50}}>
              <TextField
                id="date"
                label="Fecha"
                type="date"
                style={{marginTop: 20}}
                defaultValue={new Date()}
                value={this.state.selectedStartDate}
                onChange={event => handleDateChange(event)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time"
                label="Alarm clock"
                type="time"
                style={{marginTop: 20}}
                value={this.state.time}
                onChange={handleTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <div style={{color:'red'}}>{this.state.errorMessage}</div>
            <Button
                        style={{marginTop: 20, backgroundColor:'#000000', color: 'white'}}
                        onClick={() => this.updateDate('efectivo')}
                        >
                        Revisar
                        </Button>
            {/* <Button
            style={{marginTop: 20, backgroundColor:'#000000',  marginLeft: 20, color: 'white'}}
            onClick={() => this.updateDate('aqui')}
            >
            Pagar aquí
            </Button> */}
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
    registerContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 50,
      shadowColor: "black",
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: "hidden"
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