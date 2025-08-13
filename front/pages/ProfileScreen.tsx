import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";

const profileName = "João Vítor Marcelino";
const profilePhoto = "https://i.pravatar.cc/150?img=12";

const settings = [
  {
    id: "1",
    label: "Notificações",
    icon: "notifications-outline",
    screen: "NotificationsScreen",
  },
  {
    id: "2",
    label: "Localização precisa",
    icon: "location-outline",
    screen: "LocationScreen",
  },
  {
    id: "3",
    label: "Dados da Conta",
    icon: "person-outline",
    screen: "AccountScreen",
  },
  {
    id: "4",
    label: "Meus Tokens",
    icon: "key-outline",
    screen: "TokenScreen",
  },
];

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Ionicons name={item.icon} size={22} color="#2c3e50" />
      <Text style={styles.cardText}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header com imagem e gradiente */}
      <ImageBackground
        source={require("../assets/banners/bannerProfile.jpg")}
        style={styles.header}
      >
        <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        <Text style={styles.profileName}>{profileName}</Text>
      </ImageBackground>

      {/* Lista de configurações */}
      <FlatList
        data={settings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      {/* Link para informações do app */}
      <TouchableOpacity
        onPress={() => Linking.openURL("https://gymconect.com.br/info")}
        style={{ alignItems: "center", marginVertical: 10 }}
      >
        <Text style={styles.linkText}>
          Para informações do aplicativo clique aqui
        </Text>
      </TouchableOpacity>

      {/* Botão de sair */}
      <TouchableOpacity
        onPress={() => console.log("Usuário saiu")}
        style={styles.logoutButton}
      >
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  header: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: "#2c3e50",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
  linkText: {
    color: "#2980b9",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
