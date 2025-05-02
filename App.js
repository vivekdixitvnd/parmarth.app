import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes/AppRoutes'; // You’ll need to adjust this for React Navigation
import { Feather } from '@expo/vector-icons'; // Similar to FaArrowUp
import Toast from 'react-native-toast-message';

const App = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowTopButton(offsetY > 100);
  };

  const scrollToTop = () => {
    scrollRef?.scrollTo({ y: 0, animated: true });
  };

  let scrollRef = null;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={(ref) => (scrollRef = ref)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ScrollView>

      {showTopButton && (
        <TouchableOpacity style={styles.topButton} onPress={scrollToTop}>
          <Feather name="arrow-up" size={25} color="#fff" />
        </TouchableOpacity>
      )}

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
});

export default App;
