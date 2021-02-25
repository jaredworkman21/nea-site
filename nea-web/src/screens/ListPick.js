import React from "react";
import {
  Platform, StyleSheet, Dimensions, Text,
   Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { View } from 'react-native';
import {connect} from 'react-redux';
import {getAllWashers} from '../services/firebaseServices';


class ListPick extends React.Component {
  state = {
    washers: null,
    location: null,
    loading: false,
    locationFound: false,
    markers: null
  }


  getWashers = async () => {
    const washers = await getAllWashers();
    this.setState({washers: washers});
}


    loadWasher = ()=>{
      this.props.navigation.navigate("WasherProfile")
    }

    render() {
      return (
      <div style={styles.container}>
        <div style={styles.cardblock}>
              <Button
                disabled={this.state.loading}
                onClick={this.getWashers}
              >Search by Map</Button>
                {this.state.washers.map(washer => (
                            <div >
                                <img src={{uri: this.props.washer.profileUrl}} style={{height: 35, width:35 }} />

                                </div>
                        ))}
        </div>
      </div>
      );
    }
  }

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });

  const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      carwash: state.carwash,
    }
  };
  
  export default connect(mapStateToProps)(ListPick);