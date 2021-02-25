import React from "react";

import { Image, View, Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class HeaderNotifications extends React.Component  {

    render(){
        return (
            <div style={{flexDirection:"row", alignSelf: 'stretch'}}>
                <div style={{width: width /3}}>
                    <Button
                    onClick={() => this.props.navigation.openDrawer()}
                    >
                        <div></div>
                    </Button>
                </div>
                <div style={{width: width /3, alignItems: 'center'}}>
                    <img 
                        style={{ width: 90, height: 30 }}
                        src={require('../assets/imgs/logo_black.png')}
                    />
                </div>
                <div style={{width: width /3, alignItems: 'flex-end'}}>
                <Button
                        style={{alignSelf: 'stretch', height: 30}}
                        onClick={() => this.props.navigation.navigate("Notifications")}
                        >
                            <div >
                            <img 
                            style={{ width: 30, height: 30, marginRight: 20}}
                            src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotifications.png?alt=media&token=de4db9b4-42d4-4890-ab2b-a61491401556'}}                    />
                            </div>
                        
                    </Button>
                </div>
            </div>
        );
    }
  }
export default HeaderNotifications;
  