import { Ionicons } from "@expo/vector-icons";
import { CameraMode } from "expo-camera";
import { Image } from "expo-image";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { SymbolView } from "expo-symbols";
import * as React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface MainRowActionsProps {
  handleToggle: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  setVideo: React.Dispatch<React.SetStateAction<string>>;
}

export default function MainRowActions({
  cameraMode,
  handleToggle,
  isRecording,
  setPicture,
  setVideo,
}: MainRowActionsProps) {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      // album: fetchedAlbums[0],
      mediaType: ["photo", "video"],
      sortBy: "creationTime",
      first: 100,
    });

    setAssets(albumAssets.assets);
  }

  React.useEffect(() => {
    getAlbums();
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: 173 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 2 }}
        data={assets}
        inverted
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              item.mediaType === "photo"
                ? setPicture(item.uri)
                : setVideo(item.uri)
            }
          >
            <Image
              key={item.id}
              source={{ uri: item.uri }}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
          </Pressable>
        )}
        horizontal
      />
      <TouchableOpacity onPress={handleToggle}>
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
          tintColor={isRecording ? "red" : "white"}
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
                  : isRecording
                    ? "stop-circle-outline"
                    : "radio-button-on-outline"
              }
              size={90}
              color={isRecording ? "red" : "white"}
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
