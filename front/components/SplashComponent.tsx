import { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SplashScreen({ navigation }: any) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação infinita da barra
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: SCREEN_WIDTH - 80, // distância máxima da barra
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Timer para sair da splash
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [animation, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.loaderBar,
            {
              transform: [{ translateX: animation }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  loaderContainer: {
    width: SCREEN_WIDTH - 40,
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    overflow: "hidden",
  },
  loaderBar: {
    width: 80,
    height: 6,
    backgroundColor: "#1DB954",
    borderRadius: 3,
  },
});
