import React from "react";
import { ScrollView, StyleSheet, Dimensions,
  View,
  Image
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import uuid from 'react-native-uuid';
import {storage} from '../services/firebaseServices';
import { updateWasher, getLatLang} from '../services/firebaseServices';
import {ADD_A_DOCUMENT_TO_WASHER, UPDATE_WASHER_STATUS, ADD_ADDRESS_TO_WASHER, ADD_LATLANG_WASHER} from '../actions/types';
// import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Geocoder from 'react-native-geocoding';

class AddDocuments extends React.Component {
  state = {
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    loading: false,
    profileUrl: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fno-profile.png?alt=media&token=80097535-6a6b-4283-aa17-7927338d2d1f',
    errorMessage: '',
    imageType: '',
  }
  
  
  setTheState(imageType) {
    this.setState({imageType: imageType})
  }
  render() {
    const uploadDocuments = async () => {
      this.props.dispatch({
        type: ADD_ADDRESS_TO_WASHER,
        payload: {
          address: {
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zip: this.state.zip
          }
        }
      })
      const currentAdrress = {
          street: this.state.street,
          city: this.state.city,
          state: this.state.state,
          country: this.state.country,
          zip: this.state.zip
        
      }
      await getLatLang(currentAdrress);
    }
    const getLatLang = async (address) => {
      if(address.street == ''){
        this.setState({errorMessage: 'Por favor agregar la calle'});
        return;
      }
      else if(address.city == ''){
        this.setState({errorMessage: 'Por favor agregar la ciudad'});
        return;
      }
      else if(address.state == ''){
        this.setState({errorMessage: 'Por favor agregar la estado'});
        return;
      }
      else if(address.country == ''){
        this.setState({errorMessage: 'Por favor agregar la pais'});
        return;
      }
      else if(address.zip == ''){
        this.setState({errorMessage: 'Por favor agregar la codigo'});
        return;
      }
      if(!handleErrors()) {
        return
      }
      this.props.dispatch({
        type: UPDATE_WASHER_STATUS,
        payload: {
        status: 'documented',
        }
      });
      try{

        Geocoder.init("AIzaSyAw2mvgrIWLrWnw6ah3EHswJjABlFPbpGI");
        let stringAddress = '';
        stringAddress = stringAddress + address.street + ", " + address.city + ", " + address.state + ", " + address.country + " " + address.zip;
        return Geocoder.from(stringAddress)
          .then(json => {
            var location = json.results[0].geometry.location;
            setLatLang(location)
          })
          .catch(error => console.warn(error));
        }catch (e) {
          this.setState({errorMessage: 'Este direccion esta mal formado'});
          return;
      }
    }

    const setLatLang = (location) =>{
      this.props.dispatch({
        type: ADD_LATLANG_WASHER,
        payload: {
          latlang: location
        }
      });
      this.props.washer.status = 'documented';
      updateWasher(this.props.washer, 'uploadDocuments');
      this.props.navigation.navigate("Capacitacion");
    }
    const findImage = async (imageType) =>{
      this.setState({loading: true});
      this.setTheState(imageType);
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(async (image) => {
        saveImage(image)
      });
    }
    const handleErrors = () =>{
      if(this.props.washer.documents.antecedentesNoPenales == 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224'  ){
        this.setState({errorMessage: "Por favor agregar todos los documentos"})
        return false
      }
      // else if(this.props.washer.documents.antidoping == 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224'  ){
      //   this.setState({errorMessage: "Por favor agregar todos los documentos"})
      //   return false
      // }
      else if(this.props.washer.documents.coprobanteDeDomicilio == 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224'  ){
        this.setState({errorMessage: "Por favor agregar todos los documentos"})
        return false
      }
      else if(this.props.washer.documents.identificacionOficial == 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224'  ){
        this.setState({errorMessage: "Por favor agregar todos los documentos"})
        return false
      }
      else if(this.props.washer.documents.registroDatosFiscales == 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224'  ){
        this.setState({errorMessage: "Por favor agregar todos los documentos"})
        return false
      }
      return true;
    }
    const savePhoto = async (url) => {
      if(this.state.imageType == 'antecedentesNoPenales'){
        this.props.dispatch({
          type: ADD_A_DOCUMENT_TO_WASHER,
          payload: {
          imageType: 'antecedentesNoPenales',
          document: url
          }
        });
      }
      else if (this.state.imageType == 'antidoping'){
        this.props.dispatch({
          type: ADD_A_DOCUMENT_TO_WASHER,
          payload: {
          imageType: 'antidoping',
          document: url
          }
        });
      }
      else if (this.state.imageType == 'coprobanteDeDomicilio'){
        this.props.dispatch({
          type: ADD_A_DOCUMENT_TO_WASHER,
          payload: {
          imageType: 'coprobanteDeDomicilio',
          document: url
          }
        });
      }    
      else if (this.state.imageType == 'identificacionOficial'){
        this.props.dispatch({
          type: ADD_A_DOCUMENT_TO_WASHER,
          payload: {
          imageType: 'identificacionOficial',
          document: url
          }
        });
      }
      else if (this.state.imageType == 'registroDatosFiscales'){
        this.props.dispatch({
          type: ADD_A_DOCUMENT_TO_WASHER,
          payload: {
          imageType: 'registroDatosFiscales',
          document: url
          }
        });
      }
      else if (this.state.imageType == 'profile'){
        this.props.dispatch({
          type: ADD_A_DOCUMENT_TO_WASHER,
          payload: {
          imageType: 'profile',
          document: url
          }
        });
        this.setState({profileUrl: url});
      }
      this.setState({loading: false});
    }

    const uploadStep = async (path) => {
      let reference =  storage.ref(path);  
      reference.getDownloadURL().then(function(url) {
        savePhoto(url);
      }).catch(function(error) {
        console.log('this:', error);
      }); 
    }

    const saveImage = async (image) => {
      var path = 'images/' + uuid.v1()
      let reference =  storage.ref(path);   
      const response = await fetch(image.path);
      const blob = await response.blob();
      let task = reference.put(blob);
      await task.then(() => {     
        uploadStep(path);
      }).catch((e) => console.log('uploading image error => ', e));
    }
    return (
      <div >
        {this.state.loading && <div style={styles.spinner} pointerEvents={'none'}>
          <div>Cargando Foto</div>
            <img 
                      style={{ width: 130, height: 90 }}
                      src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fspinner.gif?alt=media&token=8dea1edd-8fdc-4287-a9b6-74b963559d5e'}}
                    />
          </div>
        }
        {(!this.state.loading) && <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.about}
          overScrollMode="always"
        >
        <div style={{textAlign: 'center'}}>
            <div 
                h4
                style={{ marginBottom:  10 / 2, marginTop:  10 *2 }}
                color='black'
            >
                Documentos
            </div>
        </div>
            <div style={{flexDirection:"row"}}>
                <div style={{ flex:1, paddingHorizontal:  10, marginTop: 30}}>
                      <Button
                      shadowless
                      style={{backgroundColor: 'black', marginLeft: -2}}
                      onClick={async () => await findImage('profile')}
                      >
                        Profile
                      </Button>
                  </div>
                  <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10, marginLeft:  10 * 3 }}>
                    <div style={{backgroundColor:'white', height: 90, width: 90, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                      <img 
                        style={{ width: 90, height: 90 }}
                        src={{uri: this.state.profileUrl}}
                      />
                    </div>
                  </div>
              </div>
            <div>
              <div style={{alignItems: 'center'}}>
                <div 
                  p
                  style={{ fontWeight: 'bold', marginBottom:  10 / 2, marginTop:  10 *2 }}
                  color='black'
              >
                  Documentos Officiales
              </div>
              </div>
                <div style={{ paddingHorizontal:  10 }}>
                    <div
                        p
                        style={{  marginTop:  10 / 2 }}
                        color='black'
                    >
                        Antecedentes No Penales
                    </div>
                </div>
                <div style={{flexDirection:"row"}}>
                  <div style={{  paddingHorizontal:  10 }}>
                      <Button
                      shadowless
                      style={{backgroundColor: 'black', height: 30, width: 70}}
                      onClick={async () => await findImage('antecedentesNoPenales')}
                      >
                        Cargar
                      </Button>
                  </div>
                  <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10 /2, marginLeft:  10 * 3 }}>
                    <div style={{backgroundColor:'white', height: 32, width: 32, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                      <img 
                        style={{ width: 30, height: 30 }}
                        src={{uri: this.props.washer.documents.antecedentesNoPenales}}
                      />
                    </div>
                  </div>
                </div>
            </div>
            {/* <div>
                <div style={{ paddingHorizontal:  10 }}>
                    <div
                        p
                        style={{  marginTop:  10 / 2 }}
                        color='black'
                    >
                        Antidoping
                    </div>
                </div>
                <div style={{flexDirection:"row"}}>
                <div style={{ paddingHorizontal:  10 }}>
                    <Button
                    shadowless
                     style={{backgroundColor: 'black', height: 30, width: 70}}
                     onClick={async () => await findImage('antidoping')}
                    >
                      Cargar
                    </Button>
                </div>
                <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10 /2, marginLeft:  10 * 3 }}>
                    <div style={{backgroundColor:'white', height: 32, width: 32, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                      <img 
                        style={{ width: 30, height: 30 }}
                        src={{uri: this.props.washer.documents.antidoping}}
                      />
                    </div>
                  </div>
                </div>
            </div> */}
            <div>
                <div style={{ paddingHorizontal:  10 }}>
                    <div
                        p
                        style={{  marginTop:  10 / 2 }}
                        color='black'
                    >
                        Coprobante de Domicilio
                    </div>
                </div>
                <div style={{flexDirection:"row"}}>
                  <div style={{ paddingHorizontal:  10 }}>
                      <Button
                      shadowless
                      style={{backgroundColor: 'black', height: 30, width: 70}}
                      onClick={async () => await findImage('coprobanteDeDomicilio')}
                      >
                        Cargar
                      </Button>
                  </div>
                  <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10 /2, marginLeft:  10 * 3 }}>
                      <div style={{backgroundColor:'white', height: 32, width: 32, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                        <img 
                          style={{ width: 30, height: 30 }}
                          src={{uri: this.props.washer.documents.coprobanteDeDomicilio}}
                        />
                      </div>
                    </div>
                </div>
              </div>
            <div>
                <div style={{ paddingHorizontal:  10 }}>
                    <div
                        p
                        style={{  marginTop:  10 / 2 }}
                        color='black'
                    >
                        Identificacion oficial 
                    </div>
                </div>
                <div style={{flexDirection:"row"}}>

                  <div style={{ paddingHorizontal:  10 }}>
                      <Button
                      shadowless
                      style={{backgroundColor: 'black', height: 30, width: 70}}
                      onClick={async () => await findImage('identificacionOficial')}
                      >
                        Cargar
                      </Button>
                  </div>
                  <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10 /2, marginLeft:  10 * 3 }}>
                      <div style={{backgroundColor:'white', height: 32, width: 32, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                        <img 
                          style={{ width: 30, height: 30 }}
                          src={{uri: this.props.washer.documents.identificacionOficial}}
                        />
                      </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ paddingHorizontal:  10 }}>
                    <div
                        p
                        style={{  marginTop:  10 / 2 }}
                        color='black'
                    >
                        Registro y datos fiscales
                    </div>
                </div>
                <div style={{flexDirection:"row"}}>

                  <div style={{ paddingHorizontal:  10 }}>
                      <Button
                      shadowless
                      style={{backgroundColor: 'black', height: 30, width: 70}}
                      onClick={async () => await findImage('registroDatosFiscales')}
                      >
                        upload
                      </Button>
                  </div>
                  <div style={{ flex:1, paddingHorizontal:  10, marginTop:  10 /2, marginLeft:  10 * 3 }}>
                      <div style={{backgroundColor:'white', height: 32, width: 32, borderColor: 'grey', borderWidth: 1, borderRadius: 5}}>
                        <img 
                          style={{ width: 30, height: 30 }}
                          src={{uri: this.props.washer.documents.registroDatosFiscales}}
                        />
                      </div>
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
                    placeholder="ejemplo: Altima"
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
                    <RNPickerSelect
                      placeholder={{        
                        label: 'Pais',
                        value: null,
                        color: 'black',}}
                      style={pickerSelectStyles}
                      onValueChange={(value) => this.setState({country: value})}
                      items={this.countries}
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
                        código postal
                      </div>
                  </div>
                  <div style={{ paddingHorizontal:  10 }}>
                      <Input
                          right
                          placeholder="ejemplo: Altima"
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

            <div style={{alignItems: "center", marginTop:  10 * 3, marginBottom: 20}}>
              <div style={{color: 'red'}}>{this.state.errorMessage}</div>

              <Button
                shadowless
                style={styles.button}
                onClick={() => uploadDocuments()}
                color='black'
              >
                <div style={{  fontSize: 16 }} color="white">
                  Agregar
                </div>
              </Button>
            </div>
        </div>}
      </div>
    );
  }

  countries = [
    { label: 'Mexico', value: 'mexico' },
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
});

const styles = {
    container: {
      backgroundColor: "black",
    },
    padded: {
      paddingHorizontal:  10 * 2,
      zIndex: 3,
      position: "absolute",

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
  
  export default connect(mapStateToProps)(AddDocuments);