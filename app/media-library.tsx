import { Image } from "expo-image";
import { Asset, getAssetsAsync } from "expo-media-library";
import * as React from "react";
import { ScrollView } from "react-native";

export default function MediaLibraryScreen() {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  async function getAlbums() {
    const albumAssets = await getAssetsAsync({
      mediaType: ["photo", "video"],
      sortBy: "creationTime",
    });

    setAssets(albumAssets.assets);
  }

  React.useEffect(() => {
    getAlbums();
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {assets.map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.uri }}
            style={{ width: "25%", height: 100 }}
          />
        ))}
      </ScrollView>
    </>
  );
}
