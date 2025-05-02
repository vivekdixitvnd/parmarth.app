import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-toast-message";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const AddRteData = () => {
  const [studentName, setStudentName] = useState("");
  const [classStudying, setClassStudying] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [school, setSchool] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const authCtx = useContext(AuthContext);

  const validateFields = () => {
    if (!/^[a-zA-Z ]{2,30}$/.test(studentName)) {
      Toast.show({ type: "error", text1: "Enter a valid name" });
      return false;
    }
    if (!classStudying.trim()) {
      Toast.show({ type: "error", text1: "Enter Class" });
      return false;
    }
    if (!school.trim()) {
      Toast.show({ type: "error", text1: "Enter School Name" });
      return false;
    }
    if (!/\d{4}-\d{2}/.test(academicYear)) {
      Toast.show({ type: "error", text1: "Enter valid Academic Year" });
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateFields()) return;
    setIsLoading(true);

    const data = { studentName, classStudying, school, academicYear };

    try {
      const response = await fetch(`${backendUrl}/addRteData`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData.error) Toast.show({ type: "error", text1: resData.error });
      else Toast.show({ type: "success", text1: resData.message });
    } catch (err) {
      Toast.show({ type: "error", text1: err.message });
    }

    setIsLoading(false);
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.allFiles] });
      setFile(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Toast.show({ type: "error", text1: "File selection failed" });
      }
    }
  };

  const uploadFile = async () => {
    if (!file) {
      Toast.show({ type: "error", text1: "Please select a file first" });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("excelFile", {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });

    try {
      const response = await fetch(`${backendUrl}/addRteDataViaExcel`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const resData = await response.json();
      if (resData.error) Toast.show({ type: "error", text1: resData.error });
      else Toast.show({ type: "success", text1: resData.message });
    } catch (err) {
      Toast.show({ type: "error", text1: err.message });
    }

    setIsUploading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Excel</Text>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>{file ? file.name : "Choose File"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uploadFile} disabled={isUploading}>
        {isUploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Upload</Text>}
      </TouchableOpacity>

      <Text style={styles.heading}>OR</Text>
      <Text style={styles.heading}>Add Manually</Text>
      <TextInput style={styles.input} placeholder="Student Name" onChangeText={setStudentName} />
      <TextInput style={styles.input} placeholder="Class" onChangeText={setClassStudying} />
      <TextInput style={styles.input} placeholder="School" onChangeText={setSchool} />
      <TextInput style={styles.input} placeholder="Academic Year (YYYY-YY)" onChangeText={setAcademicYear} />
      <TouchableOpacity style={styles.button} onPress={submitForm} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#277bc0",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#277bc0",
    borderRadius: 5,
    padding: 12,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AddRteData;
