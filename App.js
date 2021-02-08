import React from "react";
import { Image, Dimensions } from "react-native";
import { Block, Button, Text } from "expo-ui-kit";
import { lauch_camera } from "./utility";

const { width, height } = Dimensions.get("screen");

export default class App extends React.Component {
  state = { is_ready: false, img_path: null };

  on_press = async () => {
    const image = await lauch_camera();
    if (!image.cancelled) {
      this.setState({
        img_path: image,
        is_ready: true,
      });
    }
  };

  render() {
    const { is_ready, img_path } = this.state;
    return (
      <Block safe flex center middle>
        {!is_ready && (
          <Button padding onPress={this.on_press}>
            <Text>OPEN CAMERA</Text>
          </Button>
        )}
        {is_ready && (
          <Image
            source={{
              uri: img_path.uri,
              width: width,
              height: height,
            }}
            resizeMethod={"resize"}
            resizeMode={"contain"}
          />
        )}
      </Block>
    );
  }
}
