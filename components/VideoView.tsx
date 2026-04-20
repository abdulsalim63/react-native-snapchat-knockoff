import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Alert, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "./IconButton";

interface VideoViewComponentProps {
  video: string;
  saveButton: boolean;
  setVideo: React.Dispatch<React.SetStateAction<string>>;
  setSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoViewComponent({
  video,
  saveButton,
  setVideo,
  setSaveButton,
}: VideoViewComponentProps) {
  const videoViewRef = React.useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const player = useVideoPlayer(video, (player) => {
    // player.loop = true;
    player.play();
  });

  React.useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying.isPlaying);
    });
    return () => subscription.remove();
  }, [player]);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === "android" ? 10 : 0 }}
      edges={["top"]}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          right: 6,
          paddingTop: 50,
          gap: 10,
        }}
      >
        <IconButton
          iosName="x.circle"
          androidName="close-circle-outline"
          onPress={() => {
            setVideo("");
            setSaveButton(false);
          }}
        />
        {saveButton && (
          <IconButton
            iosName="arrow.down"
            androidName="download-outline"
            onPress={() => {
              saveToLibraryAsync(video);
              Alert.alert("Video saved to library");
              setVideo("");
              setSaveButton(false);
            }}
          />
        )}
        <IconButton
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
          iosName={isPlaying ? "pause" : "play"}
          androidName={isPlaying ? "pause" : "play"}
        />
        <IconButton
          iosName="square.and.arrow.up"
          androidName="share-outline"
          onPress={async () => await shareAsync(video)}
        />
      </View>
      <VideoView
        player={player}
        ref={videoViewRef}
        style={{ width: "100%", height: "100%" }}
        allowsFullscreen
        nativeControls
      />
    </SafeAreaView>
  );
}
