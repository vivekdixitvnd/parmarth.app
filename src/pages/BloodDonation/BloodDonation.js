import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // REMOVE for React Native
import { Ionicons } from '@expo/vector-icons'; // Use this in Expo/React Native

const { width } = Dimensions.get('window');

const InfiniteSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.sliderWrapper}>
      <TouchableOpacity onPress={prevSlide} style={styles.navButtonLeft}>
        <Ionicons name="chevron-back" size={24} color="#0056b3" />
      </TouchableOpacity>

      <Image source={images[currentIndex]} style={styles.slideImage} resizeMode="contain" />

      <TouchableOpacity onPress={nextSlide} style={styles.navButtonRight}>
        <Ionicons name="chevron-forward" size={24} color="#0056b3" />
      </TouchableOpacity>
    </View>
  );
};

const BloodDonation = () => {
  const images = [
    require('../../assets/blood/1.png'),
    require('../../assets/blood/2.png'),
    require('../../assets/blood/3.png'),
    require('../../assets/blood/4.png'),
    require('../../assets/blood/5.png'),
  ];

  return (
    <ScrollView style={styles.body}>
      <View style={styles.section}>
        <InfiniteSlider images={images} />
      </View>

      <View style={styles.section}>
        <Text style={styles.h1}>RAKTDAAN MAHADAAN - "BLOOD DONATION CAMP"</Text>
        <Text style={styles.p}>
          <Text style={styles.bold}>RAKTDAAN MAHADAAN</Text> is a life-saving initiative organized
          by Parmarth...
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.h2}>Why Blood Donation Matters?</Text>
        <Text style={styles.p}>
          Blood donation plays a vital role in healthcare, as donated blood...
        </Text>
      </View>

      {/* Repeat similar sections below */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#e9ecef',
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 20,
  },
  p: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  sliderWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 25,
    padding: 10,
  },
  navButtonRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 25,
    padding: 10,
  },
});

export default BloodDonation;
