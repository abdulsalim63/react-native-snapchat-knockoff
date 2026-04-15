import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { CameraMode } from "expo-camera";
import { Image } from "expo-image";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { SymbolView } from "expo-symbols";
import * as React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}

export default function MainRowActions({
  cameraMode,
  handleTakePicture,
  isRecording,
}: MainRowActionsProps) {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      album: fetchedAlbums[0],
      mediaType: "photo",
      sortBy: "creationTime",
      first: 10,
    });

    setAssets(albumAssets.assets);
  }

  React.useEffect(() => {
    getAlbums();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: 173 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 2 }}
        data={assets}
        inverted
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={{ uri: item.uri }}
            style={{ width: 40, height: 40, borderRadius: 5 }}
          />
        )}
        horizontal
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <SymbolView
          name={
            cameraMode === "picture"
              ? "circle"
              : isRecording
                ? "record.circle"
                : "circle.circle"
          }
          size={90}
          type="hierarchical"
          tintColor={isRecording ? Colors.light.snapPrimary : "white"}
          animationSpec={{
            effect: {
              type: isRecording ? "pulse" : "bounce",
            },
            repeating: isRecording,
          }}
          fallback={
            <Ionicons
              name={
                cameraMode === "picture"
                  ? "ellipse-outline"
                  : "radio-button-on-outline"
              }
              size={90}
              color={isRecording ? Colors.light.snapPrimary : "white"}
            />
          }
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {[0, 1, 2, 3].map((i) => (
          <SymbolView
            key={i}
            name="face.dashed"
            size={40}
            type="hierarchical"
            tintColor={"white"}
            fallback={
              <Ionicons name="happy-outline" size={40} color={"white"} />
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    bottom: 40,
    flexDirection: "row",
    alignItems: "center",
    // gap: 10,
    justifyContent: "space-between",
    position: "absolute",
  },
});
