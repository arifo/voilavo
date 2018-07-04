import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { uploadImages, deleteImages, changeImageIndex } from '../redux/actions';

const deviceWidth = Dimensions.get('window').width;

class ImageContainer extends Component {
  state = {
    selectedImages: []
  };
  addImage() {
    this.props.uploadImages(this.props.user.images);
  }
  deleteImage() {
    this.self.props.deleteImages(this.self.props.user.images, this.key);
  }

  render() {
    const { user, loading } = this.props;

    return (
      <View style={styles.container}>
        {user.images.map((uri, key) => {
          const isLastElement = user.length - 1 === key;

          if (uri !== undefined) {
            return (
              <TouchableOpacity
                key={key}
                style={styles.imageContainer}
                onPress={() => {
                  this.props.changeImageIndex(user.images, key);
                }}
              >
                {loading && isLastElement ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <View>
                    <Image style={styles.imageStyle} source={{ uri }} resizeMethod="resize" />

                    <TouchableOpacity
                      style={styles.iconContainer}
                      // onPress={this.deleteImage.bind({ self: this, key })}
                      onPress={() => this.props.deleteImages(user.images, key)}
                    >
                      <Ionicons name="ios-close-circle" size={25} style={{ color: '#ef0b57' }} />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            );
          }
          return console.log('uri undefined');
        })}
        {user.images.length <= 5 ? (
          <TouchableOpacity style={styles.imageContainer} onPress={this.addImage.bind(this)}>
            <Ionicons name="ios-add-circle" size={50} style={{ color: '#b7bbbf' }} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isUploaded: state.auth.isUploaded
});

export default connect(
  mapStateToProps,
  { uploadImages, deleteImages, changeImageIndex }
)(ImageContainer);

const styles = {
  container: {
    width: deviceWidth,
    height: deviceWidth * 0.7,
    padding: 3,
    //borderWidth: 1,
    // backgroundColor: '#d4f4d4',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderWidth: 3,
    borderColor: '#d4d5d6',
    borderRadius: 5,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e8ea',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  imageStyle: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderRadius: 5
  },
  iconContainer: {
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  separator: {
    width: deviceWidth * 0.65,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d7d8',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  }
};
