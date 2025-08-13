import Slider from "@react-native-community/slider";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LocationScreen() {
  const navigation = useNavigation();
  const [radius, setRadius] = useState(10); // Raio inicial de 10km
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  return (
    <View style={styles.container}>
      {/* Descrição */}
      <Text style={styles.description}>
        Ajuste a sua localização e o raio de alcance para encontrar academias
        próximas.
      </Text>

      {/* Seletor de Raio */}
      <View style={styles.section}>
        <Text style={styles.label}>Raio de busca: {radius} km</Text>
        <Slider
          style={{ width: "100%" }}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={radius}
          onValueChange={setRadius}
          minimumTrackTintColor="#2ecc71"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#2ecc71"
        />
      </View>

      {/* Inputs para cidade e estado */}
      <View style={styles.section}>
        <Text style={styles.label}>Cidade</Text>
        <TextInput
          placeholder="Digite sua cidade"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Estado</Text>
        <TextInput
          placeholder="Digite seu estado"
          style={styles.input}
          value={state}
          onChangeText={setState}
        />
      </View>

      {/* Botão de salvar - futuro uso */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 24 : 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 32,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
