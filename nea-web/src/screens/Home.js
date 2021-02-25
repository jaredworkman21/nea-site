import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import {connect} from 'react-redux';

const { width } = Dimensions.get("screen");

class Home extends React.Component {


  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <div style={{textAlign: 'center'}}>
          <Button
            shadowless
            onClick={() => this.props.navigation.navigate("Agenda")}
          >
            <div style={{  fontSize: 14 }} color="white">
              Agenda
            </div>
          </Button>
        </div>
        <div style={{textAlign: 'center'}}>
          <Button
            shadowless
            onClick={() => this.props.navigation.navigate("AddCar")}>
            <div style={{  fontSize: 14 }} color="white">
              Agregar Carro
            </div>
          </Button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div  center style={styles.home}>
        {this.renderArticles()}
      </div>
    );
  }
}

const styles = {
  home: {
    width: width
  },
  articles: {
    width: width -  10 * 2,
    paddingVertical:  10,
    paddingHorizontal: 2
  }
});

export default Home;
