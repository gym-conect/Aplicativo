import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const allItems = [
  // Mesmos dados que no seu HomeScreen
  // (Pode colocar em um arquivo separado para reutilizar melhor)
  {
    id: "a1",
    categoryId: "1",
    photo:
      "https://images.unsplash.com/photo-1554284126-1310e4972bde?auto=format&fit=crop&w=400&q=80",
    title: "Academia PowerFit",
    description: "Treinos personalizados e equipamentos modernos.",
    rating: 4,
  },
];

export default function CategoryScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;

  // Filtra os itens da categoria recebida
  const filteredItems = allItems.filter(
    (item) => item.categoryId === categoryId
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={{ color: "#f2b01e", fontSize: 16 }}>
          {i <= rating ? "★" : "☆"}
        </Text>
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"← Voltar"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
        <View style={{ width: 60 }} />{" "}
        {/* Placeholder para balancear o header */}
      </View>

      <View style={styles.listContainer}>
        {filteredItems.length === 0 ? (
          <Text style={styles.noItemsText}>
            Nenhum item encontrado nessa categoria.
          </Text>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.photo }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <View style={styles.rating}>{renderStars(item.rating)}</View>
                <TouchableOpacity>
                  <Text style={styles.seeMore}>Ver mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backText: {
    color: "#f23e3e",
    fontSize: 16,
    width: 60,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardImage: {
    width: 120,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  rating: {
    flexDirection: "row",
    marginBottom: 6,
  },
  seeMore: {
    color: "#f23e3e",
    fontWeight: "600",
  },
  noItemsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 40,
  },
});
