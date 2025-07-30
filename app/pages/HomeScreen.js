import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const categories = [
  { id: "1", label: "Academias", icon: "🏋️‍♂️" },
  { id: "2", label: "Personais", icon: "🤸‍♂️" },
  { id: "3", label: "Nutrição", icon: "🥗" },
  { id: "4", label: "Fisioterapia", icon: "🧘‍♂️" },
];

const banners = [
  {
    id: "1",
    image: require("../assets/banners/banner1.png"),
  },
  {
    id: "2",
    image: require("../assets/banners/banner2.png"),
  },
];

export default function HomeScreen({ navigation }) {
  const [items] = useState([
    {
      id: "a1",
      categoryId: "1",
      photo:
        "https://images.unsplash.com/photo-1554284126-1310e4972bde?auto=format&fit=crop&w=400&q=80",
      title: "Academia PowerFit",
      description: "Treinos personalizados e equipamentos modernos.",
      rating: 4,
    },
    {
      id: "a2",
      categoryId: "1",
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
      title: "Fitness Center",
      description: "Ambiente aconchegante e profissionais qualificados.",
      rating: 5,
    },
    {
      id: "p1",
      categoryId: "2",
      photo:
        "https://images.unsplash.com/photo-1594737625785-cf27fa5a5a31?auto=format&fit=crop&w=400&q=80",
      title: "João Silva",
      description: "Personal trainer especializado em força e resistência.",
      rating: 5,
    },
    {
      id: "p2",
      categoryId: "2",
      photo:
        "https://images.unsplash.com/photo-1526403228250-d984df229cb1?auto=format&fit=crop&w=400&q=80",
      title: "Maria Oliveira",
      description: "Foco em emagrecimento e saúde geral.",
      rating: 4,
    },
    {
      id: "n1",
      categoryId: "3",
      photo:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
      title: "Nutri Vida",
      description: "Planos alimentares personalizados e acompanhamento.",
      rating: 5,
    },
    {
      id: "n2",
      categoryId: "3",
      photo:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      title: "Saúde e Sabor",
      description: "Dieta equilibrada para melhor performance.",
      rating: 4,
    },
    {
      id: "f1",
      categoryId: "4",
      photo:
        "https://images.unsplash.com/photo-1587502536263-9530a84a02ae?auto=format&fit=crop&w=400&q=80",
      title: "Fisio Life",
      description: "Tratamentos para dores e recuperação muscular.",
      rating: 5,
    },
    {
      id: "f2",
      categoryId: "4",
      photo:
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80",
      title: "Reabilita Clinic",
      description: "Fisioterapia especializada em esportes.",
      rating: 4,
    },
  ]);

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={{ flex: 1 }}>
          <Text
            style={styles.addressText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Estr. Paulo Voltolini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 16 }}>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryCard}
            onPress={() =>
              navigation.navigate("Category", {
                categoryId: cat.id,
                categoryName: cat.label,
              })
            }
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Banner */}
      <View style={{ marginTop: 20 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {banners.map((banner) => (
            <Image
              key={banner.id}
              source={{ uri: banner.image }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>

      {/* Lista com Scroll */}
      <View style={{ flex: 1, marginTop: 20 }}>
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.photo }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <View style={styles.rating}>{renderStars(item.rating)}</View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
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
  addressText: {
    fontWeight: "600",
    fontSize: 18,
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    flexBasis: "22%",
    aspectRatio: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  bannerScroll: {
    marginTop: 20,
    marginBottom: 10,
  },
  bannerImage: {
    width: screenWidth - 32,
    height: (screenWidth - 32) * 0.43,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  listScroll: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 0,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    height: 100, // altura fixa do card
  },
  cardImage: {
    width: 120,
    height: "100%", // ocupa 100% da altura do card
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
    marginBottom: 1,
  },
  cardDescription: {
    fontSize: 13,
    color: "#555",
    marginBottom: 0,
  },
  rating: {
    flexDirection: "row",
    marginBottom: 4,
  },      
});
