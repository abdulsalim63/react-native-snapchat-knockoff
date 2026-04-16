import { FlashMode } from "expo-camera";
import React from "react";
import { View } from "react-native";
import IconButton from "./IconButton";

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  cameraFacing: "back" | "front";
  shutterSound: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"back" | "front">>;
  setShutterSound: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  cameraFacing,
  shutterSound,
  setCameraZoom,
  setCameraFlash,
  setCameraTorch,
  setCameraFacing,
  setShutterSound,
}: CameraToolsProps) {
  return (
    <View
      style={{
        position: "absolute",
        marginTop: 5,
        marginRight: 5,
        right: 6,
        gap: 5,
        zIndex: 1,
        // flexDirection: "row",
      }}
    >
      <IconButton
        iosName={
          cameraTorch ? "flashlight.off.circle" : "flashlight.slash.circle"
        }
        androidName={cameraTorch ? "flash" : "flash-off"}
        onPress={() => setCameraTorch((prev) => !prev)}
      />
      <IconButton
        iosName={cameraFacing === "back" ? "camera" : "camera"}
        androidName={cameraFacing === "back" ? "camera-reverse" : "camera"}
        onPress={() =>
          setCameraFacing((prev) => (prev === "back" ? "front" : "back"))
        }
      />
      <IconButton
        iosName={cameraFlash === "on" ? "bolt.circle" : "bolt.slash.circle"}
        androidName={cameraFlash === "on" ? "flash" : "flash-off"}
        onPress={() => setCameraFlash((prev) => (prev === "on" ? "off" : "on"))}
      />
      <IconButton
        iosName={shutterSound ? "speaker.slash" : "speaker"}
        androidName={
          shutterSound ? "volume-high-outline" : "volume-mute-outline"
        }
        onPress={() => {
          setShutterSound((prev) => !prev);
        }}
      />
      <IconButton
        iosName={"plus.magnifyingglass"}
        androidName="add-circle-outline"
        onPress={() => {
          if (cameraZoom < 1) {
            setCameraZoom((prev) => prev + 0.1);
          }
        }}
      />
      <IconButton
        iosName={"minus.magnifyingglass"}
        androidName="remove-circle-outline"
        onPress={() => {
          if (cameraZoom > 0) {
            setCameraZoom((prev) => prev - 0.1);
          }
        }}
      />
    </View>
  );
}
