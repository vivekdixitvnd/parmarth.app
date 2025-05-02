import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import AuthContext from '../../store/auth-context';
import backendUrl from '../../backendUrl';

const AddVolunteerData = () => {
  const authCtx = useContext(AuthContext);

  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [postHolded, setPostHolded] = useState('');
  const [session, setSession] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);
  const isRollNumberValid = (rollNumber) => rollNumber.length === 13;
  const isEmailValid = (email) => email.length < 30;
  const isCourseValid = (course) =>
    ['B.Tech', 'M.Tech', 'MBA', 'MCA'].includes(course);
  const isPostHoldedValid = (postHolded) => postHolded.trim().length > 0;
  const isSessionValid = (session) => /^\d{4}-\d{4}$/.test(session);

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls],
      });
      setExcelFile(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Toast.show({ type: 'error', text1: 'File selection error' });
      }
    }
  };

  const handleUpload = async () => {
    if (!excelFile) {
      Toast.show({ type: 'error', text1: 'No file selected' });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('excelFile', {
      uri: excelFile.uri,
      type: excelFile.type,
      name: excelFile.name,
    });

    try {
      const response = await fetch(`${backendUrl}/addVolunteerDataViaExcel`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authCtx.token,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        Toast.show({ type: 'error', text1: data.error });
      } else {
        Toast.show({ type: 'success', text1: data.message });
        setExcelFile(null);
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!isNameValid(name)) {
      Toast.show({ type: 'error', text1: 'Invalid name' });
      setIsLoading(false);
      return;
    } else if (!isRollNumberValid(rollNumber)) {
      Toast.show({ type: 'error', text1: 'Roll number must be 13 digits' });
      setIsLoading(false);
      return;
    } else if (!isEmailValid(email)) {
      Toast.show({ type: 'error', text1: 'Invalid email' });
      setIsLoading(false);
      return;
    } else if (!isCourseValid(course)) {
      Toast.show({ type: 'error', text1: 'Select valid course' });
      setIsLoading(false);
      return;
    } else if (!isPostHoldedValid(postHolded)) {
      Toast.show({ type: 'error', text1: 'Post is required' });
      setIsLoading(false);
      return;
    } else if (!isSessionValid(session)) {
      Toast.show({ type: 'error', text1: 'Invalid session format' });
      setIsLoading(false);
      return;
    }

    const data = {
      name: name.trim().toUpperCase(),
      rollNumber: +rollNumber,
      email: email.trim().toLowerCase(),
      course: course.trim(),
      postHolded: postHolded.trim().toUpperCase(),
      session: session.trim(),
      ...(course === 'B.Tech' && { branch: branch.trim().toUpperCase() }),
    };

    try {
      const response = await fetch(`${backendUrl}/addVolunteerData`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authCtx.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (resData.error) {
        Toast.show({ type: 'error', text1: resData.error });
      } else {
        Toast.show({ type: 'success', text1: resData.message });
        setName('');
        setRollNumber('');
        setEmail('');
        setCourse('');
        setBranch('');
        setPostHolded('');
        setSession('');
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Upload Excel File</Text>
      <TouchableOpacity style={styles.button} onPress={handleFilePicker}>
        <Text>{excelFile ? excelFile.name : 'Choose File'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpload}
        disabled={isUploading || !excelFile}
      >
        {isUploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Upload</Text>}
      </TouchableOpacity>

      <Text style={styles.heading}>OR</Text>
      <Text style={styles.heading}>Add Volunteer Data</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Roll Number (13 digits)"
        value={rollNumber}
        onChangeText={setRollNumber}
        maxLength={13}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Course" value="" />
        <Picker.Item label="B.Tech" value="B.Tech" />
        <Picker.Item label="M.Tech" value="M.Tech" />
        <Picker.Item label="MBA" value="MBA" />
        <Picker.Item label="MCA" value="MCA" />
      </Picker>

      {course === 'B.Tech' && (
        <Picker
          selectedValue={branch}
          onValueChange={(itemValue) => setBranch(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Branch" value="" />
          <Picker.Item label="CE - Civil Engineering" value="CE" />
          <Picker.Item label="CH - Chemical Engineering" value="CH" />
          <Picker.Item label="CS - Computer Science Engineering" value="CS" />
          <Picker.Item label="EC - ECE" value="EC" />
          <Picker.Item label="EE - Electrical" value="EE" />
          <Picker.Item label="EI - Instrumentation" value="EI" />
          <Picker.Item label="IT - IT" value="IT" />
          <Picker.Item label="ME - Mechanical" value="ME" />
        </Picker>
      )}

      <TextInput
        style={styles.input}
        placeholder="Post Holded"
        value={postHolded}
        onChangeText={setPostHolded}
      />

      <TextInput
        style={styles.input}
        placeholder="Session (e.g., 2023-2024)"
        value={session}
        onChangeText={setSession}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#277bc0',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#277bc0',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default AddVolunteerData;
