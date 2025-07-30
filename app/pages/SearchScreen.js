import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: "1", label: "Academias", icon: "🏋️‍♂️", backgroundColor: "#FFD700" }, // amarelo dourado
  { id: "2", label: "Personais", icon: "🤸‍♂️", backgroundColor: "#00BFFF" }, // azul claro
  { id: "3", label: "Nutrição", icon: "🥗", backgroundColor: "#32CD32" }, // verde limão
  { id: "4", label: "Fisioterapia", icon: "🧘‍♂️", backgroundColor: "#FF69B4" }, // rosa forte
];

export default function SearchScreen({ navigation }) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Academias perto de mim",
    "Personal para emagrecimento",
  ]);

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

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.backgroundColor }]}
      onPress={() =>
        navigation.navigate("Category", {
          categoryId: item.id,
          categoryName: item.label,
        })
      }
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
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
            placeholder="Buscar.."
            value={searchText}
            onFocus={() => setSearchActive(true)}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={onSubmitSearch}
            autoCorrect={false}
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
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

      {/* Categories List */}
      {!searchActive && (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Search Active Mode - Recent Searches */}
      {searchActive && (
        <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={styles.sectionTitle}>Buscas Recentes</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={clearRecentSearches}>
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
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 10,
  },

  categoriesContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  categoryCard: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  recentSearchItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
