import * as React from "react";

import BottomRowTools from "@/components/BottomRowTools";
import CameraTools from "@/components/CameraTools";
import MainRowActions from "@/components/MainRowActions";
import PictureView from "@/components/PictureView";
import QRCodeButton from "@/components/QRCodeButton";
import VideoViewComponent from "@/components/VideoView";
import {
  BarcodeScanningResult,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [qrCodeDetected, setQrCodeDetected] = React.useState<string>("");
  const [isBrowsing, setIsBrowsing] = React.useState<boolean>(false);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const [cameraZoom, setCameraZoom] = React.useState<number>(0);
  const [camreaTorch, setCameraTorch] = React.useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"back" | "front">(
    "back",
  );
  const [shutterSound, setShutterSound] = React.useState<boolean>(true);
  const [saveButton, setSaveButton] = React.useState<boolean>(false);
  const saveButtonRef = React.useRef<boolean>(false);

  const [picture, setPicture] = React.useState<string>("");
  const [video, setVideo] = React.useState<string>("");

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({
      shutterSound: shutterSound,
    });
    setSaveButton(true);
    saveButtonRef.current = true;
    setPicture(response!.uri);
    console.log(response);
  }

  async function toggleRecord() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setSaveButton(true);
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
      setVideo(response!.uri);
    }
  }

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResult = await openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowserPresentationStyle.FORM_SHEET,
    });

    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  function handleBarcodeScanned(scanningResult: BarcodeScanningResult) {
    if (scanningResult.data) {
      console.log(scanningResult.data);
      setQrCodeDetected(scanningResult.data);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 2000) as unknown as NodeJS.Timeout;
  }

  if (isBrowsing) return <></>;
  if (picture)
    return (
      <PictureView
        picture={picture}
        setPicture={setPicture}
        saveButton={saveButton}
        setSaveButton={setSaveButton}
      />
    );
  if (video)
    return (
      <VideoViewComponent
        video={video}
        setVideo={setVideo}
        saveButton={saveButton}
        setSaveButton={setSaveButton}
      />
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: Platform.OS === "android" ? 10 : 0,
      }}
      edges={["top"]}
    >
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        zoom={cameraZoom}
        flash={cameraFlash}
        enableTorch={camreaTorch}
        facing={cameraFacing}
        onBarcodeScanned={(barcode) =>
          setTimeout(() => {
            cameraRef.current?.pausePreview();
            handleBarcodeScanned(barcode);
            cameraRef.current?.resumePreview();
          }, 2000)
        }
        style={{ flex: 1, paddingHorizontal: 3 }}
      >
        <View style={{ ...StyleSheet.absoluteFillObject }}>
          {qrCodeDetected && (
            <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
          )}
        </View>
        <CameraTools
          cameraZoom={cameraZoom}
          cameraFlash={cameraFlash}
          cameraTorch={camreaTorch}
          cameraFacing={cameraFacing}
          shutterSound={shutterSound}
          setCameraZoom={setCameraZoom}
          setCameraFlash={setCameraFlash}
          setCameraTorch={setCameraTorch}
          setCameraFacing={setCameraFacing}
          setShutterSound={setShutterSound}
        />
        <MainRowActions
          cameraMode={cameraMode}
          handleToggle={
            cameraMode === "picture" ? handleTakePicture : toggleRecord
          }
          isRecording={isRecording}
          setPicture={setPicture}
          setVideo={setVideo}
        />
        <BottomRowTools cameraMode={cameraMode} setCameraMode={setCameraMode} />
      </CameraView>
    </SafeAreaView>
  );
}
