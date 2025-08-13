import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  { id: "1", image: require("../assets/banners/banner1.png") },
  { id: "2", image: require("../assets/banners/banner2.png") },
];

export default function HomeScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Academias perto de mim",
    "Personal para emagrecimento",
  ]);

  const [address, setAddress] = useState("Localizando...");

  const [items] = useState([
    {
      id: "1",
      categoryId: "1",
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
      title: "Academia PowerFit",
      description: "Treinos personalizados e equipamentos modernos.",
      rating: 4,
    },
    {
      id: "2",
      categoryId: "2",
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
      title: "Fitness Center",
      description: "Ambiente aconchegante e profissionais qualificados.",
      rating: 5,
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão necessária",
            "É necessário permitir o acesso à localização para o aplicativo funcionar corretamente.",
            [{ text: "Entendi" }]
          );
          setAddress("Permissão negada");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const geocode = await Location.reverseGeocodeAsync(location.coords);

        if (geocode.length > 0) {
          const place = geocode[0];
          const rua = place.street || "Rua desconhecida";
          const numero = place.name || "";
          const bairro = place.district || "";
          const cidade = place.city || "";

          const enderecoFormatado = `${rua}${numero ? ", " + numero : ""} ${
            bairro ? " - " + bairro : ""
          }${cidade ? " - " + cidade : ""}`;

          setAddress(enderecoFormatado);
        } else {
          setAddress("Endereço não encontrado");
        }
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        setAddress("Erro ao localizar");
      }
    })();
  }, []);

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Text key={i} style={{ color: "#f2b01e", fontSize: 16 }}>
        {i < rating ? "★" : "☆"}
      </Text>
    ));
  };

  const onCancelSearch = () => {
    setSearchText("");
    setSearchActive(false);
  };

  const onSubmitSearch = () => {
    const trimmed = searchText.trim();
    if (trimmed && !recentSearches.includes(trimmed)) {
      setRecentSearches([trimmed, ...recentSearches]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 📍 Header */}
      <View style={styles.header}>
        <TouchableOpacity style={{ flex: 1 }}>
          <Text style={styles.addressText} numberOfLines={1}>
            Rua Paulo Schiochet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 16 }}>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 🔍 Barra de Busca */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchText}
            onFocus={() => setSearchActive(true)}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={onSubmitSearch}
          />
        </View>
        {searchActive && (
          <TouchableOpacity
            onPress={onCancelSearch}
            style={styles.cancelButton}
          >
            <Text style={{ color: "#007AFF", fontWeight: "600" }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 🕵️‍♂️ Busca Ativa - Buscas Recentes */}
      {searchActive && (
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <View style={styles.searchSection}>
            <Text style={styles.sectionTitle}>Buscas Recentes</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={() => setRecentSearches([])}>
                <Text style={{ color: "#d00", fontWeight: "600" }}>Limpar</Text>
              </TouchableOpacity>
            )}
          </View>
          {recentSearches.length === 0 ? (
            <Text style={{ color: "#888" }}>Nenhuma busca recente.</Text>
          ) : (
            recentSearches.map((item, idx) => (
              <TouchableOpacity
                key={`${item}-${idx}`}
                style={styles.recentSearchItem}
                onPress={() => alert(`Pesquisar: ${item}`)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}

      {/* Conteúdo principal */}
      {!searchActive && (
        <>
          {/* 📚 Categorias */}
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

          {/* 📸 Banners */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {banners.map((banner) => (
              <Image
                key={banner.id}
                source={banner.image}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* 📋 Lista */}
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
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    marginTop: 12,
  },
  searchInputWrapper: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    flex: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  searchInput: { flex: 1, fontSize: 16 },
  cancelButton: { marginLeft: 10 },

  header: {
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressText: { fontWeight: "600", fontSize: 18 },

  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  recentSearchItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
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
  categoryIcon: { fontSize: 32, marginBottom: 6 },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  bannerImage: {
    width: screenWidth - 32,
    height: (screenWidth - 32) * 0.43,
    margin: 16,
    borderRadius: 12,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    height: 100,
  },
  cardImage: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 1 },
  cardDescription: { fontSize: 13, color: "#555" },
  rating: { flexDirection: "row", marginBottom: 4 },
});
