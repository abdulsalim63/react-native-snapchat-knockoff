import { Alert, Button, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { Image } from "expo-image";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";

export default function OnboardingScreen() {
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [microphonePermissions, requestMicrophonePermissions] =
    useMicrophonePermissions();
  const [mediaLibraryPermissions, requestMediaLibraryPermissions] =
    usePermissions();

  async function handleContinue() {
    const allPermission = await requestAllPermissions();
    if (allPermission) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("To continue please provide permission in settings");
    }
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermissions();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permissions is required");
      return false;
    }

    const microphoneStatus = await requestMicrophonePermissions();
    if (!microphoneStatus.granted) {
      Alert.alert("Error", "Microphone permissions is required");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermissions();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permissions is required");
      return false;
    }

    await AsyncStorage.setItem("hasOpened", "true");

    return true;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#26515e" }}
      headerImage={
        <SymbolView
          name="camera.circle"
          size={250}
          type="hierarchical"
          tintColor={Colors.dark.snapPrimary}
          animationSpec={{ effect: { type: "bounce" } }}
          fallback={
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.reactLogo}
            />
          }
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Snapchat Camera!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        Welcome to Data Extractor, this app requires permissions for the
        following:
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Camera Permissions</ThemedText>
        <ThemedText>🎥 For taking pictures</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Microphone Permissions</ThemedText>
        <ThemedText>🎙️ For taking videos with audio</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Media Library Permissions</ThemedText>
        <ThemedText>📸 To save/view your gallery</ThemedText>
      </ThemedView>
      <Button title="continue" onPress={handleContinue} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
