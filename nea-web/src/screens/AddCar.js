import React from "react";
import {connect} from 'react-redux';
import {storage} from '../services/firebaseServices';
import {updateUser} from '../services/firebaseServices';
import {ADD_CAR_TO_USER, CURRENT_IMAGE, ADD_LATLANG_USER} from '../actions/types';
import {Button, Input} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
// import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
// import Geocoder from 'react-native-geocoding';



class AddCar extends React.Component {

    state = {
        make: '',
        model: '',
        year: '',
        carUrl: null,
        image: '',
        street: '',
        city: '',
        state: '',
        latlang: '',
        loading: false,
        visible: true,
        country: '',
        zip: '',
        size: '',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fno-car.png?alt=media&token=cacc3ac9-ebb5-4f97-9c1a-b37aa83c93f1',
        errorMessage: ''
      }

      setCountry (itemValue) {
        this.setState({selectedValue: itemValue})
      }
      render() {
        const saveImage = async (image) => {
          this.setState({image: image});
          this.setState({imageUrl: image.sourceURL})
          var path = 'images/' + uuidv4()
          let reference = storage.ref(path);   
          const response = await fetch(image.path);
          const blob = await response.blob();
          let task = reference.put(blob);
          await task.then(() => {     
            uploadStep(path);
          }).catch((e) => console.log('uploading image error => ', e));
        }
        const handleErrors = () =>{
          if(this.state.make == '' || this.state.model == '' 
           || this.state.street == ''
          || this.state.country == '' || this.state.zip == ''
          || this.state.city == '' || this.state.size == ''
          || this.state.state == '' ){
            this.setState({errorMessage: "Por favor agregar todos los datos"})
            return false
          }
          return true;
        }
        const findImage = async () =>{
          // ImagePicker.openPicker({
          //   width: 200,
          //   height: 100,
          //   cropping: true
          // }).then(async (image) => {
          //   saveImage(image)
          // });
        }

        const savePhoto = async (url) => {
          this.setState({carUrl: url})
        }

        const uploadStep = async (path) => {
          let reference =  storage.ref(path);  
          reference.getDownloadURL().then(function(url) {
            savePhoto(url);
          }).catch(function(error) {
            console.log('this:', error);
          }); 
        }
        const nextStep = async () => {
          const currentAdrress = {
              street: this.state.street,
              city: this.state.city,
              state: this.state.state,
              country: this.state.country,
              zip: this.state.zip
            
          }
          try{
            await getLatLang(currentAdrress);
          } catch (error) {
            this.setState({errorMessage: 'Este direccion esta mal formado'});
            console.log(error)
            this.setState({loading: false});
          }

        }

        const getLatLang = async (address) => {
          if(address.street == ''){
            this.setState({visible: true});
            this.setState({errorMessage: 'Por favor agregar la calle'});
            this.setState({loading: false});
            return;
          }
          else if(address.city == ''){
            this.setState({visible: true});
            this.setState({errorMessage: 'Por favor agregar la ciudad'});
            this.setState({loading: false});
            return;
          }
          else if(address.state == ''){
            this.setState({visible: true});
            this.setState({errorMessage: 'Por favor agregar la estado'});
            this.setState({loading: false});
            return;
          }
          else if(address.country == ''){
            this.setState({visible: true});
            this.setState({errorMessage: 'Por favor agregar la pais'});
            this.setState({loading: false});
            return;
          }
          else if(address.zip == ''){
            this.setState({visible: true});
            this.setState({errorMessage: 'Por favor agregar la codigo'});
            this.setState({loading: false});
            return;
          }
          try{
                // Geocoder.init("AIzaSyAw2mvgrIWLrWnw6ah3EHswJjABlFPbpGI");
                // let stringAddress = '';
                // stringAddress = stringAddress + address.street + ", " + address.city + ", " + address.state + ", " + address.country + " " + address.zip;
                // return Geocoder.from(stringAddress)
                //   .then(json => {
                //     var location = json.results[0].geometry.location;
                //     console.log('l', location);
                //     setLatLang(location)
                //   })
                //   // .catch(error => console.warn(error));
                }catch (e) {
                  this.setState({visible: true});
                  this.setState({loading: false});
                  this.setState({errorMessage: 'Este direccion esta mal formado'});
                  return;
                }
        }

        const setLatLang = async (location) =>{
          this.setState({latlang: location})
          finishSubmit();
        }

        const finishSubmit = async ()=> {
          const currentAdrress = {
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zip: this.state.zip
          
        }
          const car = {
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            carUrl: this.state.carUrl,
            address: currentAdrress,
            latlang: this.state.latlang,
            id: uuidv4(),
            carwash: {},
            size: this.state.size,
          }

          if(handleErrors()) {

            this.props.dispatch({
              type: ADD_CAR_TO_USER,
              payload: {
                car: car
              }
          });

            await updateUser(this.props.user, 'cars');
            this.setState({visible: true});
            this.setState({loading: false});
            this.props.history.push("/dashboard");
          }
          else {
            this.setState({loading: false});
          }
          this.setState({loading: false});
        }

        const addCarToUser = async () => {
          this.setState({visible: false});
          if(this.state.loading){
            return;
          }
          this.setState({loading: true});
          nextStep()
        }

    return (
      <div  style={{backgroundColor: 'white', textAlign: 'center'}}>
                <Header/>

        {this.state.loading && <div style={styles.spinner} pointerEvents={'none'}>
          <div>Cargando </div>
            <img 
                      style={{ width: 130, height: 90 }}
                      src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fspinner.gif?alt=media&token=8dea1edd-8fdc-4287-a9b6-74b963559d5e'}}
                    />
          </div>
        }
        {(!this.state.loading) && <div
        >
        <div style={{textAlign: 'center'}}>
            <h4 
                style={{ marginBottom:  10 / 2, marginTop:  10 *2 }}
                color='black'
            >
                Agregar Su Carro
            </h4>
        </div>
        <div style={{textAlign: 'center'}}>
            <div 
                p
                style={{ fontWeight: 'bold', marginBottom:  10 / 2, marginTop:  10 *2 }}
                color='black'
            >
                Detalles del carro
            </div>
        </div>
        <div style={{marginTop:  10 *1}}>
            <div style={{ paddingHorizontal:  10 }}>
                <div
                    p
                    style={{  marginBottom:  10 / 2 }}
                    color='black'
                >
                    Marca
                </div>
            </div>
            <div style={{ paddingHorizontal:  10 }}>
                <Input
                    right
                    placeholder="ejemplo: Nissan"
                    style={{
                    color:'black',
                    borderRadius: 4,
                    backgroundColor: "#fff"
                    }}
                    iconContent={<div/>}
                    onChangeText={text => this.setState({make: text})} 
                    value={this.state.make}
                />
            </div>
        </div>
        <div>
            <div style={{ paddingHorizontal:  10 }}>
                <div
                    p
                    style={{  marginBottom:  10 / 2 }}
                    color='black'
                >
                    Modelo
                </div>
            </div>
            <div style={{ paddingHorizontal:  10 }}>
                <Input
                    right
                    placeholder="ejemplo: Altima"
                    style={{
                    color: 'black',
                    borderRadius: 4,
                    backgroundColor: "#fff"
                    }}
                    iconContent={<div/>}
                    onChangeText={text => this.setState({model: text})} 
                    value={this.state.model}
                />
            </div>
        </div>
        <div>
              <div style={{ paddingHorizontal:  10 }}>
                  <div
                      p
                      style={{  marginBottom:  10 / 2 }}
                      color='black'
                  >
                      Temaño
                  </div>
              </div>
              <div style={{ paddingHorizontal:  10 }}>
                  {/* <RNPickerSelect
                        placeholder={{        
                          label: 'Temaño',
                          value: null,
                          color: 'black',}}
                        style={pickerSelectStyles}
                        onValueChange={(value) => this.setState({size: value})}
                        items={this.sizes}
                    /> */}
              </div>
            </div>
        <div>
            <div style={{ paddingHorizontal:  10 }}>
                <div
                    p
                    style={{  marginBottom:  10 / 2 }}
                    color='black'
                >
                    Year (opcional)
                </div>
            </div>
            <div style={{ paddingHorizontal:  10 }}>
                {/* <RNPickerSelect
                      placeholder={{        
                        label: 'Seleccionar Año',
                        value: null,
                        color: 'black',}}
                      style={pickerSelectStyles}
                      onValueChange={(value) => this.setState({year: value})}
                      items={this.year}
                  /> */}
            </div>
            <div style={{flexDirection:"row"}}>
              <div style={{ flex:1, paddingHorizontal:  10 }}>
                  <div
                          p
                          style={{  marginBottom:  10 / 2, marginTop:  10 }}
                          color='black'
                      >
                          Foto (opcional)
                      </div>
                    <Button
                    shadowless
                     style={{backgroundColor: 'black', marginLeft: -2}}
                     onClick={findImage}
                    >
                      Cargar
                    </Button>
                </div>
                <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10 }}>
                  <div style={{backgroundColor:'white', height: 90, width: 130, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                    <img 
                      style={{ width: 130, height: 90 }}
                      src={{uri: this.state.carUrl}}
                    />
                  </div>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
            <div 
                p
                style={{ fontWeight: 'bold', marginBottom:  10 / 2, marginTop:  10 *2 }}
                color='black'
            >
                Direccion
            </div>
          </div>
            <div style={{ paddingHorizontal:  10 }}>
                <div
                    p
                    style={{  marginBottom:  10 / 2 }}
                    color='black'
                >
                    Calle
                </div>
            </div>
            <div style={{ paddingHorizontal:  10 }}>
                <Input
                    right
                    placeholder="Calle"
                    style={{
                      color:'black',
                    borderRadius: 4,
                    backgroundColor: "#fff"
                    }}
                    iconContent={<div/>}
                    onChangeText={text => this.setState({street: text})} 
                    value={this.state.street}
                />
            </div>

            <div style={{flexDirection:"row"}}>
              <div style={{flex: 1}}>
                  <div style={{ paddingHorizontal:  10 }}>
                    <div
                        p
                        style={{  marginBottom:  10 / 2 }}
                        color='black'
                    >
                        Ciudad
                    </div>
                </div>
                <div style={{ paddingHorizontal:  10 }}>
                    <Input
                        right
                        placeholder="ejemplo: Ciudad de Mexico"
                        style={{
                          color:'black',
                        borderRadius: 4,
                        backgroundColor: "#fff"
                        }}
                        iconContent={<div/>}
                        onChangeText={text => this.setState({city: text})} 
                        value={this.state.city}
                    />
                  </div>
              </div>
              <div style={{flex: 1}}>
                  <div style={{ paddingHorizontal:  10 }}>
                      <div
                          p
                          style={{  marginBottom:  10 / 2 }}
                          color='black'
                      >
                          Estado
                      </div>
                  </div>
                  <div style={{ paddingHorizontal:  10 }}>
                    {/* <RNPickerSelect
                        placeholder={{        
                          label: 'Estado',
                          value: null,
                          color: 'black',}}
                        style={pickerSelectStyles}
                        onValueChange={(value) => this.setState({state: value})}
                        items={this.mexicoStates}
                    /> */}
                  </div>
              </div>
            </div>

            <div style={{flexDirection:"row"}}>
              <div style={{flex: 1}}>
                  <div style={{ paddingHorizontal:  10 }}>
                    <div
                        p
                        style={{  marginBottom:  10 / 2 }}
                        color='black'
                    >
                        Pais
                    </div>
                </div>
                
                <div style={{ paddingHorizontal:  10 }}>
                    {/* <RNPickerSelect
                      placeholder={{        
                        label: 'Pais',
                        value: null,
                        color: 'black',}}
                      style={pickerSelectStyles}
                      onValueChange={(value) => this.setState({country: value})}
                      items={this.countries}
                  /> */}
                </div>
              </div>
              <div style={{flex: 1}}>
                  <div style={{ paddingHorizontal:  10 }}>
                      <div
                          p
                          style={{  marginBottom:  10 / 2 }}
                          color='black'
                      >
                        Código postal
                      </div>
                  </div>
                  <div style={{ paddingHorizontal:  10 }}>
                      <Input
                          right
                          placeholder="Código postal"
                          style={{
                            color:'black',
                          borderRadius: 4,
                          backgroundColor: "#fff"
                          }}
                          iconContent={<div/>}
                          onChangeText={text => this.setState({zip: text})} 
                          value={this.state.zip}
                      />
                  </div>
              </div>
            </div>

            <div style={{alignItems: "center", marginTop:  10 * 2,  marginBottom:  10 * 2}}>
              <div style={{color: 'red'}}>{this.state.errorMessage}</div>

              <Button
                shadowless
                style={styles.button}
                onClick={addCarToUser}
                color='black'
              >
                <div style={{  fontSize: 16 }} color="white">
                  Agregar
                </div>
              </Button>
            </div>
        </div>
        </div>}
      </div>
    );
  }

  countries = [
    { label: 'Mexico', value: 'mexico' },
  ]
  sizes = [
    { label: 'Chico', value: 'chico' },
    { label: 'Mediano', value: 'mediano' },
    { label: 'Grande', value: 'grande' },

  ]
  mexicoStates = [
    { label: 'Aguascalientes', value: 'aguascalientes' },
    { label: 'Baja California', value: 'united states' },
    { label: 'Baja California Sur	', value: 'Baja California Sur	' },
    { label: 'Campeche', value: 'Campeche' },
    { label: 'Chiapas', value: 'Chiapas' },
    { label: 'Ciudad de México', value: 'Ciudad de México' },
    { label: 'Chihuahua', value: 'Chihuahua' },
    { label: 'Coahuila de Zaragoza', value: 'Coahuila de Zaragoza' },
    { label: 'Colima', value: 'Colima' },
    { label: 'Durango', value: 'Durango' },
    { label: 'Guanajuato', value: 'Guanajuato' },
    { label: 'Guerrero', value: 'Guerrero' },
    { label: 'Hidalgo', value: 'Hidalgo' },
    { label: 'Jalisco', value: 'Jalisco' },
    { label: 'México', value: 'México' },
    { label: 'Michoacán de Ocampo', value: 'Michoacán de Ocampo' },
    { label: 'Morelos', value: 'Morelos' },
    { label: 'Nayarit', value: 'Nayarit' },
    { label: 'Nuevo León', value: 'Nuevo León' },
    { label: 'Querétaro de Arteaga', value: 'Querétaro de Arteaga' },
    { label: 'Quintana Roo', value: 'Quintana Roo' },
    { label: 'San Luis Potosí', value: 'San Luis Potosí' },
    { label: 'Sinaloa', value: 'Sinaloa' },
    { label: 'Tabasco', value: 'Tabasco' },
    { label: 'Tamaulipas', value: 'Tamaulipas' },
    { label: 'Tlaxcala', value: 'Tlaxcala' },
    { label: 'Veracruz ', value: 'Veracruz ' },
    { label: 'Yucatán', value: 'Yucatán' },
    { label: 'Zacatecas', value: 'Zacatecas' },


  ]
  year = [
    { label: 'pre-1980', value: 'pre-1980' },
    { label: '1981', value: '1981' },
    { label: '1982', value: '1982' },
    { label: '1983', value: '1983' },
    { label: '1984', value: '1984' },
    { label: '1985', value: '1985' },
    { label: '1986', value: '1986' },
    { label: '1987', value: '1987' },
    { label: '1986', value: '1986' },
    { label: '1987', value: '1987' },
    { label: '1988', value: '1988' },
    { label: '1989', value: '1989' },
    { label: '1990', value: '1990' },
    { label: '1991', value: '1991' },
    { label: '1992', value: '1992' },
    { label: '1993', value: '1993' },
    { label: '1994', value: '1994' },
    { label: '1995', value: '1995' },
    { label: '1996', value: '1996' },
    { label: '1997', value: '1997' },
    { label: '1998', value: '1998' },
    { label: '1999', value: '1999' },
    { label: '2000', value: '2000' },
    { label: '2001', value: '2001' },
    { label: '2002', value: '2002' },
    { label: '2003', value: '2003' },
    { label: '2004', value: '2004' },
    { label: '2005', value: '2005' },
    { label: '2006', value: '2006' },
    { label: '2007', value: '2007' },
    { label: '2008', value: '2008' },
    { label: '2009', value: '2009' },
    { label: '2010', value: '2010' },
    { label: '2011', value: '2011' },
    { label: '2012', value: '2012' },
    { label: '2013', value: '2013' },
    { label: '2014', value: '2014' },
    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
  ]
}

const styles = {
    container: {
      backgroundColor: "black",
    },
    spinner: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
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

  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      width:  10 * 10,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  };
  

  const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      staticData: state.staticData
    }
  };



  
  
  export default connect(mapStateToProps)(AddCar);