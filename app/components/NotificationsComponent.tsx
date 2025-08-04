import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";

// Simulação de notificações
const notifications = [
  {
    id: "1",
    title: "Agendamento confirmado!",
    message:
      "Seu treino com o personal Carlos foi confirmado para amanhã às 9h.",
    time: "Há 2 horas",
  },
  {
    id: "2",
    title: "Nova academia disponível",
    message: "A academia Iron Gym agora está disponível em sua região.",
    time: "Ontem",
  },
  {
    id: "3",
    title: "Token expirado",
    message:
      "O token da unidade FitWay Centro expirou. Renove seu plano para continuar.",
    time: "2 dias atrás",
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const renderNotification = ({ item }: any) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={26} color="#555" />
      </View>
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Lista de notificações */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    color: "#333",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#333",
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 13,
    color: "#555",
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});
