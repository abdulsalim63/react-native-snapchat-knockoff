import * as React from "react";

import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import { CameraMode, CameraView } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        style={{ flex: 1, paddingHorizontal: 3 }}
      >
        <MainRowActions
          cameraMode={cameraMode}
          handleTakePicture={() => {}}
          isRecording={false}
        />
        <BottomRowTools cameraMode={cameraMode} setCameraMode={setCameraMode} />
      </CameraView>
    </SafeAreaView>
  );
}
