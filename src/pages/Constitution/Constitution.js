import React from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import PDFView from "react-native-pdf";

const { width, height } = Dimensions.get("window");

const ConstitutionScreen = () => {
  const pdfUrl = "https://yourserver.com/Constitution.pdf"; // Replace with your actual URL

  return (
    <View style={styles.container}>
      <PDFView
        source={{uri: pdfUrl, cache: true}}
        style={styles.pdf}
        horizontal={false}
      />
      
      {/* Pagination (if required) */}
      <View style={styles.pagination}>
        <Button title="Previous" onPress={() => {}} disabled={false} />
        <Button title="Next" onPress={() => {}} disabled={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: "#f8f9fa",
  },
  pdf: {
    width: width,
    height: height - 150, // Adjust the height as per your requirement
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
});

export default Constitution;
