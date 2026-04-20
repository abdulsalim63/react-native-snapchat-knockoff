import { CameraMode } from "expo-camera";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import IconButton from "./IconButton";
import { ThemedText } from "./themed-text";

interface BottomRowToolsProps {
  cameraMode: CameraMode;
  setCameraMode: React.Dispatch<React.SetStateAction<CameraMode>>;
}

export default function BottomRowTools({
  cameraMode,
  setCameraMode,
}: BottomRowToolsProps) {
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
      <Link href={"/media-library"} asChild>
        <IconButton
          iosName="photo.stack"
          androidName="image"
          onPress={() => {}}
        />
      </Link>
      <View style={styles.directionRowItemsCenter}>
        <TouchableOpacity onPress={() => setCameraMode("picture")}>
          <ThemedText
            style={{
              color: "white",
              fontWeight: cameraMode === "picture" ? "bold" : "100",
            }}
          >
            Snap
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCameraMode("video")}>
          <ThemedText
            style={{
              color: "white",
              fontWeight: cameraMode === "video" ? "bold" : "100",
            }}
          >
            Video
          </ThemedText>
        </TouchableOpacity>
      </View>
      <IconButton androidName="search-outline" iosName="magnifyingglass" />
    </View>
  );
}

const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    alignSelf: "center",
    bottom: 6,
  },
});
