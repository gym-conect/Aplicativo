import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryComponent from "../components/CategoryComponent";
import ProfileComponent from "../components/ProfileComponent";
import SplashScreen from "../components/SplashComponent";
import CalendarScreen from "../pages/CalendarScreen";
import FavoritesScreen from "../pages/FavoritesScreen";
import HomeScreen from "../pages/HomeScreen";
import LoginScreen from "../pages/LoginScreen";
import ProfileScreen from "../pages/ProfileScreen";
import SignupScreen from "../pages/SignupScreen";
import TokenScreen from "../pages/tokenScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  // Mapeamento de nome de rota para ícones válidos
  const iconsMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Home: "home-outline",
    Agenda: "calendar-outline",
    Favorites: "star-outline",
    Perfil: "person-outline",
    Token: "key-outline",
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconName = iconsMap[route.name] || "ellipse";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f23e3e",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={CalendarScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Token" component={TokenScreen} />
    </Tab.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="Category"
          component={CategoryComponent}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="ProfileComponent"
          component={ProfileComponent}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
