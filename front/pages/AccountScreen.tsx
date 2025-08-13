import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountScreen() {
  // Dados pessoais (estado inicial)
  const [personalData, setPersonalData] = useState({
    nome: "João Vítor Marcelino",
    email: "joao@mail.com",
    telefone: "(47) 99999-9999",
    cpf: "123.456.789-00",
    endereco: "Rua das Flores, 123",
    cep: "89200-000",
    cidade: "Jaraguá do Sul",
    estado: "SC",
    pais: "Brasil",
  });

  // Modal estados
  const [modalPersonalVisible, setModalPersonalVisible] = useState(false);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);

  // Dados temporários para edição (dados pessoais)
  const [tempPersonalData, setTempPersonalData] = useState({ ...personalData });

  // Dados pagamento
  const paymentMethods = ["PIX", "Cartão de Débito", "Cartão de Crédito"];
  const [paymentMethod, setPaymentMethod] = useState("PIX");

  // Dados cartão
  const [cardData, setCardData] = useState({
    numero: "1234 5678 9876 5432",
    validade: "12/26",
    nomeTitular: "João V. Marcelino",
    cvv: "123",
  });

  // Dados temporários para edição do cartão
  const [tempCardData, setTempCardData] = useState({ ...cardData });

  // Funções para salvar e cancelar edição dados pessoais
  function savePersonalData() {
    setPersonalData(tempPersonalData);
    setModalPersonalVisible(false);
  }

  function cancelPersonalEdit() {
    setTempPersonalData(personalData);
    setModalPersonalVisible(false);
  }

  // Funções para salvar e cancelar edição cartão
  function saveCardData() {
    setCardData(tempCardData);
    setModalPaymentVisible(false);
  }

  function cancelCardEdit() {
    setTempCardData(cardData);
    setModalPaymentVisible(false);
  }

  // Deletar cartão
  function deleteCard() {
    Alert.alert(
      "Excluir cartão",
      "Tem certeza que deseja excluir as informações do cartão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setCardData({
              numero: "",
              validade: "",
              nomeTitular: "",
              cvv: "",
            });
            setModalPaymentVisible(false);
            setPaymentMethod("PIX");
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Card Dados Pessoais */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Dados Pessoais</Text>
          <TouchableOpacity onPress={() => setModalPersonalVisible(true)}>
            <Ionicons name="pencil-outline" size={22} color="#1DB954" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>
          Nome: <Text style={styles.value}>{personalData.nome}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{personalData.email}</Text>
        </Text>
        <Text style={styles.label}>
          Telefone: <Text style={styles.value}>{personalData.telefone}</Text>
        </Text>
        <Text style={styles.label}>
          CPF: <Text style={styles.value}>{personalData.cpf}</Text>
        </Text>
        <Text style={styles.label}>
          Endereço: <Text style={styles.value}>{personalData.endereco}</Text>
        </Text>
        <Text style={styles.label}>
          CEP: <Text style={styles.value}>{personalData.cep}</Text>
        </Text>
        <Text style={styles.label}>
          Cidade: <Text style={styles.value}>{personalData.cidade}</Text>
        </Text>
        <Text style={styles.label}>
          Estado: <Text style={styles.value}>{personalData.estado}</Text>
        </Text>
        <Text style={styles.label}>
          País: <Text style={styles.value}>{personalData.pais}</Text>
        </Text>
      </View>

      {/* Card Dados de Pagamento */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Dados de Pagamento</Text>
          {(paymentMethod === "Cartão de Débito" ||
            paymentMethod === "Cartão de Crédito") && (
            <TouchableOpacity onPress={() => setModalPaymentVisible(true)}>
              <Ionicons name="pencil-outline" size={22} color="#1DB954" />
            </TouchableOpacity>
          )}
        </View>

        {/* Seleção de método */}
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.paymentOption,
              paymentMethod === method && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod(method)}
          >
            <Ionicons
              name={method === "PIX" ? "logo-whatsapp" : "card-outline"}
              size={20}
              color={paymentMethod === method ? "#fff" : "#1DB954"}
              style={{ marginRight: 8 }}
            />
            <Text
              style={[
                styles.paymentText,
                paymentMethod === method && {
                  color: "#fff",
                  fontWeight: "700",
                },
              ]}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Mostrar dados cartão se selecionado */}
        {(paymentMethod === "Cartão de Débito" ||
          paymentMethod === "Cartão de Crédito") && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>
              Número:{" "}
              <Text style={styles.value}>
                {cardData.numero || "Não cadastrado"}
              </Text>
            </Text>
            <Text style={styles.label}>
              Validade:{" "}
              <Text style={styles.value}>{cardData.validade || "-"}</Text>
            </Text>
            <Text style={styles.label}>
              Nome no cartão:{" "}
              <Text style={styles.value}>{cardData.nomeTitular || "-"}</Text>
            </Text>
          </View>
        )}
      </View>

      {/* Modal edição dados pessoais */}
      <Modal visible={modalPersonalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Editar Dados Pessoais</Text>

              {Object.entries(tempPersonalData).map(([key, value]) => (
                <View key={key} style={{ marginBottom: 12 }}>
                  <Text style={styles.label}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(text) =>
                      setTempPersonalData((prev) => ({ ...prev, [key]: text }))
                    }
                    placeholder={`Digite ${key}`}
                  />
                </View>
              ))}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={cancelPersonalEdit}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#1DB954" }]}
                  onPress={savePersonalData}
                >
                  <Text style={{ color: "#fff" }}>Atualizar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal edição dados cartão */}
      <Modal visible={modalPaymentVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Editar Dados do Cartão</Text>

              <Text style={styles.label}>Número do cartão</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={19}
                placeholder="1234 5678 9876 5432"
                value={tempCardData.numero}
                onChangeText={(text) =>
                  setTempCardData((prev) => ({ ...prev, numero: text }))
                }
              />

              <Text style={styles.label}>Validade (MM/AA)</Text>
              <TextInput
                style={styles.input}
                placeholder="12/26"
                maxLength={5}
                value={tempCardData.validade}
                onChangeText={(text) =>
                  setTempCardData((prev) => ({ ...prev, validade: text }))
                }
              />

              <Text style={styles.label}>Nome no cartão</Text>
              <TextInput
                style={styles.input}
                value={tempCardData.nomeTitular}
                onChangeText={(text) =>
                  setTempCardData((prev) => ({ ...prev, nomeTitular: text }))
                }
              />

              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={3}
                placeholder="123"
                value={tempCardData.cvv}
                onChangeText={(text) =>
                  setTempCardData((prev) => ({ ...prev, cvv: text }))
                }
                secureTextEntry
              />

              <View style={[styles.modalButtons, { marginTop: 12 }]}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
                  onPress={deleteCard}
                >
                  <Text style={{ color: "#fff" }}>Deletar Cartão</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.modalButtons]}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={cancelCardEdit}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#1DB954" }]}
                  onPress={saveCardData}
                >
                  <Text style={{ color: "#fff" }}>Atualizar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  value: {
    fontWeight: "400",
    color: "#333",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#1DB954",
    borderRadius: 10,
    marginBottom: 12,
  },
  paymentOptionSelected: {
    backgroundColor: "#1DB954",
  },
  paymentText: {
    fontSize: 15,
    color: "#1DB954",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "85%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1DB954",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
