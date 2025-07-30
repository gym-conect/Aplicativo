import { StatusBar } from "expo-status-bar";
import StackNavigator from "./app/contexts/StackNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#000 " />
      <StackNavigator />
    </>
  );
}
