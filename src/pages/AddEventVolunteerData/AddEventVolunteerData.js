import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const AddEventVolunteersData = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const authCtx = useContext(AuthContext);

  const pickFileHandler = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets.length > 0) {
      setExcelFile(result.assets[0]);
    }
  };

  const uploadHandler = async () => {
    if (!excelFile) return Toast.show({ type: "error", text1: "No file selected" });

    setIsUploading(true);
    const formData = new FormData();

    formData.append("excelFile", {
      uri: excelFile.uri,
      name: excelFile.name,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    try {
      const response = await fetch(`${backendUrl}/addEventVolunteerDataViaExcel`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const resData = await response.json();
      if (resData.error) {
        Toast.show({ type: "error", text1: resData.error });
      } else {
        Toast.show({ type: "success", text1: resData.message });
      }
    } catch (err) {
      Toast.show({ type: "error", text1: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.label}>Upload an Excel file</Text>

      <Text style={styles.warning}>
        File should contain 11 columns with exact headings order:
        {"\n"}S. No., Name, Roll Number, Email, Course, Branch (optional),
        Event, Responsibility, Event Date, Academic Year, Certificate Number.
        {"\n\n"}Accepted Courses: B.Tech | M.Tech | MBA | MCA
      </Text>

      <Image
        source={require("../../../assets/excel-file-tertiary.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={pickFileHandler} style={styles.pickButton}>
        <Text style={styles.pickButtonText}>Pick Excel File</Text>
      </TouchableOpacity>

      {excelFile && <Text style={styles.fileName}>{excelFile.name}</Text>}

      <TouchableOpacity onPress={uploadHandler} style={styles.submitButton} disabled={isUploading}>
        {isUploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Upload</Text>}
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default AddEventVolunteersData;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  warning: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  pickButton: {
    backgroundColor: "#277bc0",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  pickButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fileName: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#277bc0",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "60%",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 180,
    marginTop: 10,
  },
});
