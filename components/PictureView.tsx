import { Image } from "expo-image";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import React from "react";
import { Alert, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "./IconButton";

interface PictureViewProps {
  picture: string;
  saveButton: boolean;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  setSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PictureView({
  picture,
  saveButton,
  setPicture,
  setSaveButton,
}: PictureViewProps) {
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
            setPicture("");
            setSaveButton(false);
          }}
        />
        {saveButton && (
          <IconButton
            iosName="arrow.down"
            androidName="download-outline"
            onPress={() => {
              saveToLibraryAsync(picture);
              Alert.alert("Picture saved to library");
              setPicture("");
              setSaveButton(false);
            }}
          />
        )}
        <IconButton
          iosName="square.and.arrow.up"
          androidName="share-outline"
          onPress={async () => await shareAsync(picture)}
        />
      </View>
      <Image
        source={picture}
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          alignItems: "center",
          // marginTop: "10%",
        }}
      />
    </SafeAreaView>
  );
}
