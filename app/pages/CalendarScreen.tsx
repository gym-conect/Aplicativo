import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { v4 as uuidv4 } from "uuid";

dayjs.locale("pt-br");

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

const STORAGE_KEY = "@events";

// Tipagem para eventos
interface CalendarEvent {
  id: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  notifyBefore?: string;
}

// Tipagem para coleção de eventos por data
type EventsByDate = Record<string, CalendarEvent[]>;

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editing, setEditing] = useState<CalendarEvent | null>(null);

  const [title, setTitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [notifyBefore, setNotifyBefore] = useState<string>("");

  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  const notifyOptions: string[] = [
    "10 minutos antes",
    "15 minutos antes",
    "30 minutos antes",
    "2 horas antes",
    "1 dia antes",
    "7 dias antes",
  ];

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setEventsByDate(JSON.parse(raw));
      } catch (e) {
        console.warn("Erro ao carregar eventos", e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(eventsByDate)).catch((e) =>
      console.warn("Erro ao salvar eventos", e)
    );
  }, [eventsByDate]);

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    Object.keys(eventsByDate).forEach((d) => {
      if ((eventsByDate[d] || []).length > 0) {
        marks[d] = { marked: true, dots: [{ color: "#1DB954" }] };
      }
    });
    marks[selectedDate] = {
      ...(marks[selectedDate] || {}),
      selected: true,
      selectedColor: "#1DB954",
    };
    return marks;
  }, [eventsByDate, selectedDate]);

  const dayEvents = useMemo(() => {
    const list = eventsByDate[selectedDate] || [];
    return [...list].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }, [eventsByDate, selectedDate]);

  function openCreate() {
    setEditing(null);
    const base = new Date();
    const rounded = new Date(base);
    rounded.setMinutes(base.getMinutes() < 30 ? 30 : 0, 0, 0);
    setStart(rounded);

    const endDefault = new Date(rounded);
    endDefault.setHours(endDefault.getHours() + 1);
    setEnd(endDefault);

    setTitle("");
    setNotes("");
    setNotifyBefore("");
    setModalVisible(true);
  }

  function openEdit(ev: CalendarEvent) {
    setEditing(ev);
    setTitle(ev.title);
    setNotes(ev.notes || "");
    setStart(new Date(ev.start));
    setEnd(new Date(ev.end));
    setNotifyBefore(ev.notifyBefore || "");
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function upsertEvent() {
    if (!title.trim()) {
      Alert.alert(
        "Título obrigatório",
        "Informe um título para o agendamento."
      );
      return;
    }
    if (end <= start) {
      Alert.alert("Horário inválido", "O término deve ser depois do início.");
      return;
    }

    const newEvent: CalendarEvent = editing
      ? {
          ...editing,
          title: title.trim(),
          notes: notes.trim(),
          start,
          end,
          notifyBefore,
        }
      : {
          id: uuidv4(),
          title: title.trim(),
          notes: notes.trim(),
          start,
          end,
          notifyBefore,
        };

    setEventsByDate((prev) => {
      const copy = { ...prev };
      const currentList = [...(copy[selectedDate] || [])];
      if (editing) {
        const idx = currentList.findIndex((e) => e.id === editing.id);
        if (idx >= 0) currentList[idx] = newEvent;
      } else {
        currentList.push(newEvent);
      }
      copy[selectedDate] = currentList;
      return copy;
    });

    closeModal();
  }

  function deleteEvent(ev: CalendarEvent) {
    Alert.alert("Excluir agendamento", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setEventsByDate((prev) => {
            const copy = { ...prev };
            copy[selectedDate] = (copy[selectedDate] || []).filter(
              (e) => e.id !== ev.id
            );
            return copy;
          });
          closeModal();
        },
      },
    ]);
  }

  const renderItem: ListRenderItem<CalendarEvent> = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => openEdit(item)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="calendar-outline" size={18} color="#1DB954" />
        <Text style={styles.eventTime}>
          {"  "}
          {dayjs(item.start).format("HH:mm")} -{" "}
          {dayjs(item.end).format("HH:mm")}
        </Text>
      </View>
      <Text style={styles.eventTitle}>{item.title}</Text>
      {item.notes ? <Text style={styles.eventNotes}>{item.notes}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        firstDay={1}
        markedDates={markedDates}
        onDayPress={(d) => setSelectedDate(d.dateString)}
        theme={{
          selectedDayBackgroundColor: "#1DB954",
          todayTextColor: "#1DB954",
          arrowColor: "#1DB954",
        }}
      />

      <View style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>
          {dayjs(selectedDate).format("DD [de] MMMM [de] YYYY")}
        </Text>
        <TouchableOpacity style={styles.addBtn} onPress={openCreate}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dayEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#777", marginTop: 16 }}>
            Nenhum agendamento para este dia.
          </Text>
        }
        renderItem={renderItem}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editing ? "Editar agendamento" : "Novo agendamento"}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={22} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Título</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ex.: Avaliação física"
              style={styles.input}
            />

            <Text style={styles.label}>Início</Text>
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              style={styles.inputLike}
            >
              <Ionicons name="time-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>
                {dayjs(start).format("DD/MM/YYYY HH:mm")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Término</Text>
            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              style={styles.inputLike}
            >
              <Ionicons name="time-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>
                {dayjs(end).format("DD/MM/YYYY HH:mm")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Notificar em</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Selecionar notificação",
                  "",
                  notifyOptions.map((opt) => ({
                    text: opt,
                    onPress: () => setNotifyBefore(opt),
                  }))
                )
              }
              style={styles.inputLike}
            >
              <Ionicons name="notifications-outline" size={18} />
              <Text style={{ marginLeft: 8 }}>
                {notifyBefore || "Selecione uma opção"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Observações</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Opcional"
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <View style={styles.modalActions}>
              {editing ? (
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#e53935" }]}
                  onPress={() => deleteEvent(editing)}
                >
                  <Ionicons name="trash-outline" size={18} color="#fff" />
                  <Text style={styles.btnText}>Excluir</Text>
                </TouchableOpacity>
              ) : null}

              <View style={{ flex: 1 }} />

              <TouchableOpacity
                style={[styles.btn, styles.btnGhost]}
                onPress={closeModal}
              >
                <Text style={[styles.btnText, { color: "#333" }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnPrimary]}
                onPress={upsertEvent}
              >
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showStartPicker && (
        <DateTimePicker
          value={start}
          mode="datetime"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) setStart(date);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={end}
          mode="datetime"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_, date) => {
            setShowEndPicker(false);
            if (date) setEnd(date);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dayHeaderText: { fontSize: 16, fontWeight: "600", flex: 1 },
  addBtn: {
    backgroundColor: "#1DB954",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  eventCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  eventTime: { fontSize: 13, color: "#333", marginLeft: 2 },
  eventTitle: { fontSize: 16, fontWeight: "700", marginTop: 4 },
  eventNotes: { fontSize: 13, color: "#666", marginTop: 2 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", flex: 1 },

  label: { fontWeight: "600", marginTop: 8, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
  },
  inputLike: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  modalActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnGhost: {
    backgroundColor: "#eee",
    marginRight: 10,
  },
  btnPrimary: {
    backgroundColor: "#1DB954",
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
