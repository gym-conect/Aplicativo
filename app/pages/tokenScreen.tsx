import { Ionicons } from "@expo/vector-icons";
import { SectionList, StyleSheet, Text, View } from "react-native";

// Lista de academias com filiais
const academias = [
  {
    nomeAcademia: "FitWay",
    data: [
      {
        id: "1",
        code: "CNX4406",
        unidade: "Jaraguá do Sul",
        descricao: "Token para unidade do centro",
      },
      {
        id: "2",
        code: "CNX9901",
        unidade: "Corupá",
        descricao: "Token para unidade Corupá",
      },
    ],
  },
  {
    nomeAcademia: "Iron Gym",
    data: [
      {
        id: "3",
        code: "CNX1234",
        unidade: "Centro",
        descricao: "Token para unidade central",
      },
    ],
  },
];

export default function TokenScreen() {
  const renderTokenItem = ({ item }: any) => (
    <View style={styles.tokenItem}>
      <View style={styles.iconContainer}>
        <Ionicons name="barbell-outline" size={28} color="#555" />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.tokenName}>{item.code}</Text>
        <Text style={styles.tokenDetails}>{item.unidade}</Text>
        <Text style={styles.tokenDescription}>{item.descricao}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { nomeAcademia } }: any) => (
    <Text style={styles.academyHeader}>{nomeAcademia}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={academias}
        keyExtractor={(item) => item.id}
        renderItem={renderTokenItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
        SectionSeparatorComponent={() => <View style={styles.separator} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  academyHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    backgroundColor: "#f9f9f9",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tokenItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  tokenName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2ecc71",
  },
  tokenDetails: {
    fontSize: 13,
    color: "#444",
    marginTop: 2,
  },
  tokenDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 8,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: "#eee",
  },
});
