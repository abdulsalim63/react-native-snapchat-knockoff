import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export function useFristTimeOpen() {
  const [isFirstTime, setIsFirstTime] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function checkFirstTimeOpen() {
      setIsLoading(true);
      try {
        const hasOpened = await AsyncStorage.getItem("hasOpened");
        if (hasOpened === null) {
          setIsFirstTime(true);
        } else {
          setIsFirstTime(false);
        }
      } catch (e) {
        console.error("error getting local first time");
      } finally {
        setIsLoading(false);
      }
    }

    checkFirstTimeOpen();
  }, []);

  return { isFirstTime, isLoading };
}
