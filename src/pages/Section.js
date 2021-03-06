import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { TextQuestion } from "../components/TextQuestion";
import { NumberQuestion } from "../components/NumberQuestion";
import { MultipleQuestion } from "../components/MultipleQuestion";
import { DotBar } from "../components/DotBar";

import colors from "../styles/colors";
import api from "../services/api";

export function Section({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(api + "/sections/1/questions")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <ScrollView style={{ height: 10 }}>
            {data.map((item) => {
              if (item.kind === "number") {
                return <NumberQuestion title={item.title} />;
              } else if (item.kind === "text") {
                return <TextQuestion title={item.title} />;
              } else if (item.kind === "select") {
                return <MultipleQuestion title={item.title} />;
              }
            })}
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home", { save: true })}
      >
        <Text style={styles.text}>Salvar</Text>
      </TouchableOpacity>
      <DotBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    height: "80%",
    margin: 10,
    top: 0,
    position: "absolute",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray_2,
    height: 40,
    width: 200,
    position: "absolute",
    bottom: 80,
  },

  text: {
    color: colors.white,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});
