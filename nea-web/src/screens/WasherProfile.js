import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
// import Stars from 'react-native-stars';
import {ADD_WASHER_TO_CARWASH} from '../actions/types';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const image = { uri: "https://images.unsplash.com/photo-1462143338528-eca9936a4d09?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" };
import {connect} from 'react-redux';



class WasherProfile extends React.Component {


  washerPick () {
    this.props.dispatch({
      type: ADD_WASHER_TO_CARWASH,
      payload: {
            washer: this.props.carwash.currentCarwash.washer,
      }
    });
    this.props.navigation.navigate('CardFormScreen')
  }
  render() {
    const numReviews = this.props.carwash.currentCarwash.washer.reviews.length
    return (
      <div  style={styles.profile}>
        <div >
          <img
            src={{uri: this.props.carwash.currentCarwash.washer.profileUrl}}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: "25%" }}
            >
              <div  style={styles.profileCard}>
                <div  style={styles.avatarContainer}>
                  <img
                    src={{uri: this.props.carwash.currentCarwash.washer.profileUrl}}
                    style={styles.avatar}
                  />
                </div>
                <div style={styles.info}>
                <div style={{alignItems:'center', marginTop: 20}}>
                        {/* <Stars
                            half={true}
                            default={this.props.carwash.currentCarwash.washer.rating}
                            update={(val)=>{this.setState({stars: val})}}
                            spacing={4}
                            starSize={25}
                            count={5}/> */}
                        </div>
                  <div
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      onClick={this.washerPick.bind(this)}
                      style={{ backgroundColor: 'black', shadowColor: 'black', width: 100 }}
                    >
                      CONTRATAR
                    </Button>
                    <Button
                      style={{ backgroundColor: 'black', shadowColor: 'black', width: 100  }}
                      onClick={() => this.props.navigation.navigate("Chat")}
                    >
                      CONTACTAR
                    </Button>
                  </div>
                  <div  space="between">
                    <div >
                      <div
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        {this.props.carwash.currentCarwash.washer.washes}
                      </div>
                      <div  size={12} color='black'>Lavados</div>
                    </div>
                    <div >
                        <img
                        src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcertified.png?alt=media&token=a5dad646-1b99-4414-996f-372e87727a04'}}
                        style={{height: 50, width: 50}}
                      />

                      <div  size={12} color='black'>Certificado</div>
                    </div>
                    <div >
                      <div
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4}}
                      >
                        {numReviews}
                      </div>
                      <div  size={12} color='black'>Resenas</div>
                    </div>
                  </div>
                </div>
                <div >
                  <div  style={styles.nameInfo}>
                    <div  size={28} color="#32325D">
                      {this.props.carwash.currentCarwash.washer.names}
                    </div>
                    <div size={16} color="#32325D" style={{ marginTop: 10 }}>
                      {this.props.carwash.currentCarwash.washer.address.city}
                    </div>
                  </div>
                  <div  style={{ marginTop: 30, marginBottom: 16 }}>
                    <div style={styles.divider} />
                  </div>
                  
                 
                </div>
              </div>
              <div style={{ marginBottom: 25 }}/>
            </div>
          </ImageBackground>
        </div>
      </div>
    );
  }
}

const styles = {
  profile: {
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding:  10,
    marginHorizontal:  10,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    carwash: state.carwash,
  }
};

export default connect(mapStateToProps)(WasherProfile);