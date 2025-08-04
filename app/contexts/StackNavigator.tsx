import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryComponent from "../components/CategoryComponent";
import LocationScreen from "../components/LocationComponent";
import NotificationsScreen from "../components/NotificationsComponent";
import ProfileComponent from "../components/ProfileComponent";
import SplashScreen from "../components/SplashComponent";
import AccountScreen from "../pages/AccountScreen";
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
  // Ícones para cada aba
  const iconsMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Home: "home-outline",
    Agenda: "calendar-outline",
    Favorites: "star-outline",
    Perfil: "person-outline",
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
    </Tab.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Telas iniciais */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Navegação principal em abas */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Telas de navegação em pilha */}
        <Stack.Screen
          name="Category"
          component={CategoryComponent}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="ProfileComponent"
          component={ProfileComponent}
          options={{ animation: "slide_from_right" }}
        />

        <Stack.Screen
          name="TokenScreen"
          component={TokenScreen}
          options={{
            headerShown: true,
            title: "Meus Tokens",
            animation: "slide_from_right",
          }}
        />

        {/* Subtelas do perfil */}
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{
            headerShown: true,
            title: "Notificações",
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{
            headerShown: true,
            title: "Localização",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerShown: true,
            title: "Dados da Conta",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
