import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const InfiniteScroll = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    scrollRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    scrollRef.current.scrollTo({ x: prevIndex * screenWidth, animated: true });
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.sliderWrapper}>
      <TouchableOpacity style={styles.navButtonLeft} onPress={prevSlide}>
        <FontAwesome name="chevron-left" size={24} color="#0056b3" />
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.slider}
      >
        {images.map((img, idx) => (
          <View style={styles.slide} key={idx}>
            <Image source={{ uri: img }} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.navButtonRight} onPress={nextSlide}>
        <FontAwesome name="chevron-right" size={24} color="#0056b3" />
      </TouchableOpacity>
    </View>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    {title && <Text style={styles.heading}>{title}</Text>}
    {children}
  </View>
);

const Subsection = ({ title, text }) => (
  <View style={styles.subsection}>
    <Text style={styles.subheading}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const ClassesScreen = () => {
  const images = [
    'https://yourserver.com/img/Classes/1.png',
    'https://yourserver.com/img/Classes/2.png',
    'https://yourserver.com/img/Classes/3.png',
    'https://yourserver.com/img/Classes/4.png',
    'https://yourserver.com/img/Classes/5.png',
    'https://yourserver.com/img/Classes/6.png',
    'https://yourserver.com/img/Classes/7.png',
    'https://yourserver.com/img/Classes/8.png',
  ];

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Section>
        <InfiniteScroll images={images} />
      </Section>

      <Subsection
        title="History"
        text="Well-structured LT classes of today trace their roots back to 2015..."
      />

      <Section title="Groups in LT">
        <Subsection title="Group 0" text="For complete beginners..." />
        <Subsection title="Group 0+" text="Includes children who know basic alphabets..." />
        <Subsection title="Group 1" text="For kids who are at 3rd-grade level..." />
        <Subsection title="Group JNV" text="Focused on preparing students..." />
        <Subsection title="Group 2" text="For students from class 9 to 12..." />
        <Subsection title="Group GE (Girl Education)" text="A special group for girls..." />
      </Section>

      <Section title="Tools Used in LT Classes">
        <Subsection title="Books" text="Customized books are created for every group..." />
        <Subsection title="Stationery" text="Essential supplies like slates..." />
        <Subsection title="Homework" text="Daily homework is assigned..." />
        <Subsection title="Projectors and Speakers" text="Audio-visual learning using projectors..." />
        <Subsection title="Learn with Fun" text="Fun and creative activities..." />
        <Subsection title="Special Sessions" text="Focused sessions on cleanliness..." />
        <Subsection title="Tests" text="Regular assessments are conducted..." />
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 130,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 20,
    padding: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
    backgroundColor: '#f1f8ff',
    borderRadius: 8,
  },
  subheading: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: '500',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  sliderWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  slider: {
    flexDirection: 'row',
    width: screenWidth,
    height: 200,
  },
  slide: {
    width: screenWidth,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: 200,
  },
  navButtonLeft: {
    position: 'absolute',
    top: '50%',
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 25,
    transform: [{ translateY: -25 }],
  },
  navButtonRight: {
    position: 'absolute',
    top: '50%',
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 25,
    transform: [{ translateY: -25 }],
  },
});

export default Classes;
