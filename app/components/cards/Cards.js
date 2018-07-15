import React from 'react';
import moment from 'moment';
import {
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet
} from 'react-native';
import * as Progress from 'react-native-progress';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Cards extends React.Component {
  state = {
    num: 0,
    loading: false,
    progress: 0,
    indeterminate: true
  };

  getAge() {
    if (this.props.birthday) {
      return moment().diff(moment(this.props.birthday, 'MM/DD/YYYY'), 'y');
    }
    return '';
  }

  nextPhoto() {
    let num = this.state.num;
    const length = this.props.images.length - 1;
    if (num >= length) {
      this.setState({ num: 0 });
    } else {
      num += 1;
      this.setState({ num });
    }
  }

  splitString(stringToSplit) {
    const arrayOfStrings = stringToSplit.split(' ');
    return arrayOfStrings[0];
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.nextPhoto()}>
        <View style={styles.card}>
          <ImageBackground
            style={styles.imageStyle}
            resizeMode="cover"
            imageStyle={styles.imageBorderRadius}
            source={{ uri: this.props.images[this.state.num] }}
            resizeMethod="resize"
            onLoadStart={() => {
              this.setState({ loading: true });
            }}
            onLoadEnd={() => {
              this.setState({ loading: false });
            }}
          >
            <View style={styles.container}>
              {this.props.images.map((key, val) => {
                const currentPage =
                  this.props.images[this.state.num] === key
                    ? { backgroundColor: '#ededed' }
                    : { backgroundColor: '#484848' };
                return <View style={[styles.line, currentPage]} key={key} />;
              })}
            </View>

            {this.state.loading ? (
              <View style={styles.progressContainer}>
                <Progress.Circle
                  //style={styles.progress}
                  progress={this.state.progress}
                  indeterminate={this.state.indeterminate}
                  borderWidth={3}
                  size={50}
                />
              </View>
            ) : null}
            <Text style={styles.cardText}>
              {this.splitString(this.props.name)}, {this.getAge()}
            </Text>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Cards;

const styles = {
  card: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  imageStyle: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.65,
    flex: 1,
    justifyContent: 'space-between'
  },
  imageBorderRadius: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  cardText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    padding: 20
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: 'transparent',
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'red',
    width: deviceWidth * 0.85,
    height: 8,
    margin: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 1
  },
  line: {
    flexGrow: 1,
    height: 4,
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#484848',
    backgroundColor: '#aaaaa7',
    marginHorizontal: 2
  }
};
