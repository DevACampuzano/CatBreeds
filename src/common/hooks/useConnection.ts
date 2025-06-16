import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
export enum AppStateType {
  CONNECTED,
  CONNECING,
  DISCONNECTED,
}

const useConnection = () => {
  const [connectionState, setConnectionState] = useState<AppStateType>(
    AppStateType.CONNECING
  );
  const netInfo = NetInfo.useNetInfo();

  const getConnectionState = () => {
    if (netInfo.isConnected) {
      setConnectionState(AppStateType.CONNECTED);
    } else {
      setConnectionState(AppStateType.DISCONNECTED);
    }
  };
  const debouncedRefetch = useDebounce(getConnectionState, 1000);

  useEffect(() => {
    debouncedRefetch();
  }, [netInfo.isConnected, debouncedRefetch]);

  return connectionState;
};

export default useConnection;
