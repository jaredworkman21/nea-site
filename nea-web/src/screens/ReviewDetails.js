import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {LOAD_CARWASH, LOAD_WASHER} from '../actions/types'
import { createUserWithEmailAndPasswordHandler, getWasherDocument } from "../services/firebaseServices"
import {connect} from 'react-redux';
import {auth} from '../services/firebaseServices';
import {firestore} from '../services/firebaseServices';
// import Stars from 'react-native-stars';
import { getUserDocument, getCarwashesForWasher} from '../services/firebaseServices'
import axios from 'axios';
const { width, height } = Dimensions.get("screen");
const image = { uri: "https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b" };

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onClick={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class ReviewDetails extends React.Component {
    constructor(props) {
        super(props);
    }


  render() {

    console.log(this.props.staticData.review);
    console.log(this.props.staticData);

    return (
      <DismissKeyboard>
        <div  middle>
          <StatusBar hidden/>
          <img
            src={image}
            style={{ width, height, zIndex: 1 }}
          >
            <div  middle>
              <div style={styles.registerContainer}>
                <div  space="between">
                  <div middle space="between" style={{paddingTop: 50}}>
                    <div center flex={0.9}>
                      <div  space="between">
                        <div>
                          <div style={{alignItems: 'center', marginBottom: 70}}>
                              <div h5 >
                                  Tu Reseña
                              </div>
                          </div>

                          <div
                            
                            style={{ marginBottom: 5 }}
                          >
                            {/* <Stars
                            half={true}
                            default={this.props.staticData.review.rating}
                            // update={(val)=>{this.setState({stars: val})}}
                            spacing={4}
                            starSize={25}
                            count={5}/> */}
                          </div>
                          <div >
                              <div h5 style={{textAlign: 'center', marginTop: 30}}>
                              "{this.props.staticData.review.message}"
                              </div>
                          </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ImageBackground>
        </div>
      </DismissKeyboard>
    );
  }
}

const styles = {
  registerContainer: {
    width: width * 0.9,
    
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: "white",
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  }
});


const mapStateToProps = (state) => {
  return {
    washer: state.washer,
    staticData: state.staticData,
  }
};

export default connect(mapStateToProps)(ReviewDetails);