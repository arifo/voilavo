import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  PlatformIOS
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import * as actions from '../redux/actions';

const deviceWidth = Dimensions.get('window').width;

class ImageContainer extends Component {
  state = {
    selectedImages: []
  };

  addImage() {
    console.log('add image pressed');
    //this.props.uploadImagesToAWSS3(this.props.user.images);
    this.props.uploadImagesToFirebaseStorage(this.props.user.images);
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
          if (key === 0) {
            return;
          }
          if (uri !== undefined) {
            return (
              <TouchableOpacity
                key={key}
                style={styles.imageContainer}
                activeOpacity={0.9}
                onPress={() => {
                  this.props.changeImageIndex(user.images, key);
                }}
              >
                {loading && isLastElement ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <View>
                    <Image
                      source={{ uri }}
                      indicator={prog => (
                        <Progress.Circle
                          style={styles.progress}
                          progress={prog.progress}
                          indeterminate={prog.indeterminate}
                          borderWidth={2}
                        />
                      )}
                      resizeMethod="resize"
                      style={styles.imageStyle}
                    />

                    <TouchableOpacity
                      style={styles.iconContainer}
                      // onPress={this.deleteImage.bind({ self: this, key })}
                      onPress={() => this.props.deleteImages(user.images, key)}
                    >
                      <MaterialCommunityIcons
                        name="close-box-outline"
                        size={17}
                        style={{ color: '#ef0b57' }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            );
          }
          return console.log('uri undefined');
        })}
        {user.images.length <= 6 ? (
          <TouchableOpacity style={styles.imageContainer} onPress={this.addImage.bind(this)}>
            <Ionicons
              name={PlatformIOS ? 'ios-photos' : 'md-photos'}
              size={50}
              style={{ color: '#b7bbbf' }}
            />
            <Text style={styles.text}>Add photo</Text>
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
  actions
)(ImageContainer);

const styles = {
  container: {
    width: deviceWidth,
    //height: deviceWidth * 0.7,
    padding: 3,
    //borderWidth: 1,
    backgroundColor: '#F0F0F0',
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
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#d4d5d6'
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: -25,
    right: -25,
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    padding: 7,
    backgroundColor: '#d4d5d6'
  },
  text: {
    fontSize: 12,
    color: '#b7bbbf'
  }
};
