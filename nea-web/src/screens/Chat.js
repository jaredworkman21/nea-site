import React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView
} from "react-native";
import {connect} from 'react-redux';

import { updateChat } from "../services/firebaseServices";
import uuid from 'react-native-uuid';


class Chat extends React.Component {
  state = {
    messages: this.props.chat.currentChat.messages,
    washerUrl: this.props.chat.currentChat.washerUrl,
    userUrl: this.props.chat.currentChat.userUrl,
    height: 0
  };

  messagesScroll = React.createRef();

  itemLayout = (data, index) => ({
    length: this.state.messages.length - 1,
    offset: 32 * index,
    index
  });

  handleScroll = () => {
    // const totalIndex = this.state.messages.length - 1;
    // const insetBottom = this.state.messages.length * ( 10 * 6.5) + 64; // total messages x message height
    setTimeout(() => {
      this.messagesScroll.current.scrollToOffset({ offset: this.state.height });
    }, 1);
  };

  onContentSizeChange = (width, height) => {
    this.setState({
      height
    });
  };

  componentDidMount() {
    // this.handleScroll();
  }

  renderMessage = msg => {
    if (msg.lavador) {
      return (
        <div key={msg.id}>
          <div  space={null}>
            <img
              src={{uri: this.state.washerUrl} }
              style={[styles.avatar, styles.shadow]}
            />
            <div style={styles.messageCardWrapper}>
              <div style={[styles.messageCard, styles.shadow]}>
                <div  color='black'>{msg.message}</div>
              </div>
              <div >
                <div style={styles.time}>{msg.time}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
    return (
      <div key={msg.id} right>
        <div >
          <div style={styles.messageCardWrapper}>
            <div style={[styles.messageCardPersonal, styles.shadow]}>
              <div  color='white'>{msg.message}</div>
            </div>
            <div >
              <div style={[styles.time, { marginRight: 8 }]}>{msg.time}</div>
            </div>
          </div>
          <img
            src={{uri: this.state.userUrl} }
            style={[styles.avatar, styles.shadow]}
          />
        </div>
      </div>
    );
    }
  };

  renderMessages = () => {
    const insetBottom =
      this.state.messages.length * ( 10 * 6.5) + 64; // total messages x message height
    return (
      <FlatList
        ref={this.messagesScroll}
        data={this.state.messages}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        getItemLayout={this.itemLayout}
        contentContainerStyle={[styles.messagesWrapper]}
        renderItem={({ item }) => this.renderMessage(item)}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  };

  handleMessageChange = (type, text) => {
    this.setState({ message: text });
  };
  sendMessage = async (entireChat) =>{
    const messageId = uuid.v1();
      const date = new Date()
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
    const message = {
      id: messageId,
      lavador: false,
      message: this.state.message,
      time: strTime
    }
    const messages = entireChat.currentChat.chatId.messages.push(message)
    await updateChat(entireChat, 'messages')
    this.state.message
  }
  handleMessage = () => {
    const { messages, message } = this.state;
    const date = new Date();

    messages.push({
      id: messages.length + 1,
      message: message,
      time: date.toLocaleString("en-US", { hour: "2-digit", minute: "numeric" })
    });

    this.setState({ messages, message: "" });
    this.handleScroll();
  };

  messageForm = () => {
    const { navigation, chat } = this.props; 

    return (
      <div style={styles.messageFormContainer}>
        <div>
          <Input
            borderless
            color="#9fa5aa"
            multiline
            blurOnSubmit
            style={styles.input}
            placeholder="Message"
            autoCapitalize="none"
            returnKeyType="send"
            textContentType="none"
            placeholderTextColor="#9fa5aa"
            color='black'
            defaultValue={this.state.message}
            onSubmitEditing={this.handleMessage}
            onChangeText={text => this.handleMessageChange("message", text)}
          />
        </div>
        <div style={{backgroundColor: 'white', margin: 8, height:  10 * 3, width:  10 * 3, alignItems: 'center', justifyContent: 'center', borderRadius: 50}}>
            <Button
              onClick={()=> this.sendMessage(chat)}
            >
              <img
                    style={{height: 20, width: 40}}
                    src={{uri: "https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fsend.png?alt=media&token=aa48f0b9-6823-4295-91f2-dd84e8476889"}}
                    />
            </Button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div  space="between" style={styles.container}>
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={ 10 * 3.2}
        >
          {this.renderMessages()}
          {this.messageForm()}
        </KeyboardAvoidingView>
      </div>
    );
  }
}

const styles = {
  container: {
      marginTop: 30
  },
  messageFormContainer: {
    height: 96,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    width: 600,
    flexDirection: 'row',
  },
  input: {
    // width: width * 0.93,
    height:  10 * 3,
    color: 'black',
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.7 },
    shadowRadius: 3,
    shadowOpacity: 0.07,
    elevation: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "transparent"
  },
  messagesWrapper: {
    flexGrow: 1,
    top: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 16,
    paddingBottom: 56
  },
  messageCardWrapper: {
    maxWidth: "85%",
    marginLeft: 8,
    marginBottom: 32
  },
  messageCard: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE
  },
  messageCardPersonal: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: 'black'
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 1
  },
  time: {
    fontSize: 11,
    opacity: 0.5,
    marginTop: 8
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom:  10
  }
});


const mapStateToProps = (state) => {
  return {
    chat: state.currentChat,
    user: state.user.user,
  }
};

export default connect(mapStateToProps)(Chat);