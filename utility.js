import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

let photo = null;
let asset = null;
let album = null;

const save_on_devive = async () => {
  try {
    asset = await MediaLibrary.createAssetAsync(photo.uri);
    album = await MediaLibrary.getAlbumAsync("Gate Manager/Visitors ID Card");
    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
    } else {
      album = await MediaLibrary.createAlbumAsync(
        "Gate Manager/Visitors ID Card",
        asset,
        false
      );
    }
  } catch (error) {
    console.log("media access error", error);
  }
};

const image_process = async () => {
  console.log("asset befor getAssetInfoAsync ", asset);
  asset = await MediaLibrary.getAssetInfoAsync(asset.id);
  console.log("asset after getAssetInfoAsync", asset);
};

const get_camera_permission = async () => {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  return granted;
};

const get_media_permission = async () => {
  const { granted } = await MediaLibrary.requestPermissionsAsync();
  return granted;
};

export const lauch_camera = async () => {
  if ((await get_camera_permission()) && (await get_media_permission())) {
    photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.6,
      aspect: [4, 3],
      base64: false,
      exif: false,
    });

    let uri = photo.uri;
    uri = uri.slice(0, 6) + "//" + uri.substr(6);
    photo.uri = uri;

    await save_on_devive();
    await image_process();

    return photo;
  }
};
