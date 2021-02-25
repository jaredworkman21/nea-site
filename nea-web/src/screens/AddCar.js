import React from "react";
import {connect} from 'react-redux';
import {storage} from '../services/firebaseServices';
import {updateUser} from '../services/firebaseServices';
import {ADD_CAR_TO_USER, CURRENT_IMAGE, ADD_LATLANG_USER} from '../actions/types';
import {Button, Input} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import lighter from '../assets/imgs/lighter_background_wet.png'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Geocode from "react-geocode";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



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
        errorMessage: '',
        yearData: [
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
        ],
        mexicoStates: [
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
        ],
          countries: [
            { label: 'Mexico', value: 'mexico' },
          ],
          sizes: [
            { label: 'Chico', value: 'chico' },
            { label: 'Mediano', value: 'mediano' },
            { label: 'Grande', value: 'grande' },
        
          ]
      
        
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
        const findImage = async (event) =>{
          var image = event.target;
          if(image.files[0]){
            var path = 'images/' + uuidv4()
            var imageFile = event.target.files[0];
            await storage.ref(path).put(imageFile);
            var storageRef = storage.ref(path);
            storageRef.getDownloadURL().then(function(url) {
              savePhoto(url);
            }).catch(function(error) {
              console.log('this:', error);
            });
          }
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
          console.log(this.state.carUrl)
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
            console.log('h2');

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
                Geocode.setApiKey("AIzaSyAw2mvgrIWLrWnw6ah3EHswJjABlFPbpGI");
                let stringAddress = '';
                stringAddress = stringAddress + address.street + ", " + address.city + ", " + address.state + ", " + address.country + " " + address.zip;
                // Get latitude & longitude from address.
                Geocode.fromAddress(stringAddress).then(
                  (response) => {
                    const location = response.results[0].geometry.location;
                    setLatLang(location);
                  },
                  (error) => {
                    console.error(error);
                  }
                );
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
          console.log('h');

          nextStep()
        }
        const handleYear = (event) => {
          const value = event.target.value;
          this.setState({year: value});
        };
        const handleState = (event) => {
          const value = event.target.value;
          this.setState({state: value});
        };
        const handleCountry = (event) => {
          const value = event.target.value;
          this.setState({country: value});
        };
        const handleSize = (event) => {
          const value = event.target.value;
          console.log('val', value)
          this.setState({size: value});
          console.log('size: ', this.state.size)
        };

        const onModelChange = (event) => {
          const {value} = event.currentTarget;
          this.setState({model: value});
        };
        const onMakeChange = (event) => {
          const {value} = event.currentTarget;
          this.setState({make: value});
        };
        const onCityChange = (event) => {
          const {value} = event.currentTarget;
          this.setState({city: value});
        };
        const onZipChange = (event) => {
          const {value} = event.currentTarget;
          this.setState({zip: value});
        };
        const onStreetChange = (event) => {
          const {value} = event.currentTarget;
          this.setState({street: value});
        };
      
    return (
      <div  style={{backgroundColor: 'white', textAlign: 'center'}}>
                <Header/>

          <div  style={{textAlign: 'center'}}>
            <div style={{ backgroundImage: `url(${lighter})`, paddingTop: 100}} className="new-banner1">
              <div  style={{textAlign: 'center'}}>
                <div style={styles.registerContainer} className="register-container">
                  <div  space="between">
                      {/* {this.state.loading && <div style={styles.spinner} pointerEvents={'none'}>
                        <div>Cargando </div>
                          <img 
                                    style={{ width: 130, height: 90 }}
                                    src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fspinner.gif?alt=media&token=8dea1edd-8fdc-4287-a9b6-74b963559d5e'}}
                                  />
                        </div>
                      }
                      {(!this.state.loading) &&  */}
                      <div
                      style={{textAlign: 'left', padding: 30}}
                      >

                          <div style={{textAlign: 'center'}}>
                              <h5
                                  style={{ fontWeight: 'bold', marginBottom:  10 / 2, marginTop:  10 *2 }}
                                  color='black'
                              >
                                  Detalles del carro
                              </h5>
                          </div>
                      
                      <div className="row">
                          <div className="col-12 col-md-6">
                          <div style={{marginTop:  20}}>
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
                                    <TextField
                                      className="input-text"
                                      style={{marginBottom: '20px'}}
                                      id="outlined-standard-static"
                                      label=""
                                      value={this.state.model}
                                      defaultValue=""
                                      variant={"outlined"}
                                      style={{width:'96%'}}
                                      placeholder="Modelo"
                                      onChange={event => onModelChange(event)}
                                    />
                                </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                              <div style={{marginTop:  20}}>
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
                                  <TextField
                                      className="input-text"
                                      style={{marginBottom: '20px'}}
                                      id="outlined-standard-static"
                                      label=""
                                      value={this.state.make}
                                      defaultValue=""
                                      variant={"outlined"}
                                      style={{width:'96%'}}
                                      placeholder="Marca"
                                      onChange={event => onMakeChange(event)}
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
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
                                <FormControl variant="outlined" >
                                <Select
                                  id="demo-simple-select-outlined"
                                  value={this.state.size}
                                  style={{width: 150}}
                                  color="black"
                                  onChange={handleSize}
                                >
                                  {this.state.sizes.map((item) => 
                                    <MenuItem value={item.value}>{item.label}</MenuItem>

                                  )}
                                </Select>
                              </FormControl>

                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-6" style={{marginTop: 20}}>
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
                                  <FormControl variant="outlined" >
                                    <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      value={this.state.year}
                                      style={{width: 150}}
                                      onChange={handleYear}
                                      label="Year"
                                    >
                                      {this.state.yearData.map((item) => 
                                        <MenuItem value={item.value}>{item.label}</MenuItem>

                                      )}
                                    </Select>
                                  </FormControl>
                                  </div>
                            </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
                                <div style={{ flex:1, paddingHorizontal:  10 }}>
                                <input
                                  className="hide-input"
                                  id="contained-button-file"
                                  type="file"
                                  onChange={event => findImage(event)}
                                />
                                <label htmlFor="contained-button-file" >
                                  <Button variant="contained" color="primary" component="span"  >
                                  <CloudUploadIcon style={{color: 'white', fontSize: '17px', marginRight: 8}} />
                                    Cargar
                                  </Button>
                                </label>
                                    </div>
                          </div>
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
                              <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10 }}>
                                  <div style={{backgroundColor:'white', height: 90, width: 130, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                                    <img 
                                      style={{ width: 130, height: 90 }}
                                      src={this.state.carUrl}
                                    />
                                  </div>
                                </div>
                          </div>
                        </div>
                      <div>
                          <div style={{flexDirection:"row"}}>

                              
                          </div>
                          <div style={{textAlign: 'center'}}>
                          <h5 
                              style={{ fontWeight: 'bold', marginBottom:  10 / 2, marginTop:  50 }}
                              color='black'
                          >
                              Direccion
                          </h5>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
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
                                <TextField
                                      className="input-text"
                                      style={{marginBottom: '20px'}}
                                      id="outlined-standard-static"
                                      label=""
                                      value={this.state.street}
                                      defaultValue=""
                                      variant={"outlined"}
                                      style={{width:'96%'}}
                                      placeholder="Calle"
                                      onChange={event => onStreetChange(event)}
                                    />
                              </div>
                          </div>
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
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
                                    <TextField
                                      className="input-text"
                                      style={{marginBottom: '20px'}}
                                      id="outlined-standard-static"
                                      label=""
                                      value={this.state.city}
                                      defaultValue=""
                                      variant={"outlined"}
                                      style={{width:'96%'}}
                                      placeholder="Ciudad"
                                      onChange={event => onCityChange(event)}
                                    />
                                      
                                    </div>
                            </div>
                          </div>
                        </div>
                          </div>
                        <div className="row">
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
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
                                    <FormControl variant="outlined" >
                                      <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.state}
                                        style={{width: 150}}
                                        onChange={handleState}
                                        label="Ciudad"
                                      >
                                        {this.state.mexicoStates.map((item) => 
                                          <MenuItem value={item.value}>{item.label}</MenuItem>

                                        )}
                                      </Select>
                                    </FormControl>
                                    </div>
                                </div>
                              </div>
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
                            <div >
                              <div >
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
                                  <FormControl variant="outlined" >
                                        <InputLabel id="demo-simple-select-outlined-label">Pais</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-outlined-label"
                                          id="demo-simple-select-outlined"
                                          value={this.state.country}
                                          style={{width: 150}}
                                          onChange={handleCountry}
                                          label="Pais"
                                        >
                                          {this.state.countries.map((item) => 
                                            <MenuItem value={item.value}>{item.label}</MenuItem>

                                          )}
                                        </Select>
                                    </FormControl>

                                </div>
                              </div>
                          </div>
                        </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-6" style={{marginTop: 20}}>
                          <div >
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
                                    <TextField
                                          className="input-text"
                                          style={{marginBottom: '20px'}}
                                          id="outlined-standard-static"
                                          label=""
                                          value={this.state.zip}
                                          defaultValue=""
                                          variant={"outlined"}
                                          style={{width:'96%'}}
                                          placeholder="Código postal"
                                          onChange={event => onZipChange(event)}
                                        />
                                </div>
                            </div>
                          </div>
                          </div>
                          <div className="col-12 col-md-12" style={{marginTop: 20, textAlign:'center'}}>
                          <div style={{alignItems: "center", marginTop:  10 * 2,  marginBottom:  10 * 2}}>
                            <div style={{color: 'red'}}>{this.state.errorMessage}</div>

                            <Button
                              style={{backgroundColor: 'black', color: 'white', marginTop: 30}}
                              onClick={addCarToUser}  >
                                Agregar
                            </Button>
                          </div>
                        </div>
                            





                      </div>
                      {/* </div>} */}
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
      backgroundColor: "black",
    },
    registerContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "black",
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: "hidden"
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