import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "app/types/RootStackParamList";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const profileName = "João Vítor Marcelino";
const profilePhoto = "https://i.pravatar.cc/150?img=12";

const settings = [
  {
    id: "1",
    label: "Notificações",
    icon: "notifications-outline",
    screen: "Notifications",
  },
  {
    id: "2",
    label: "Localização precisa",
    icon: "location-outline",
    screen: "Location",
  },
  {
    id: "3",
    label: "Dados da Conta",
    icon: "person-outline",
    screen: "PersonalData",
  },
  {
    id: "4",
    label: "Configurações",
    icon: "settings-outline",
    screen: "Settings",
  },
];

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Ionicons name={item.icon} size={24} color="#333" style={{ width: 30 }} />
      <Text style={styles.itemLabel}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
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
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 32,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});
