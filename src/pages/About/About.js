import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Use any icon library like react-native-vector-icons if needed
const { width } = Dimensions.get("window");

const InfiniteScroll = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.sliderWrapper}>
      <TouchableOpacity onPress={prevSlide} style={styles.navButtonLeft}>
        <Text style={styles.arrow}>{"<"}</Text>
      </TouchableOpacity>

      <Image
        source={images[currentIndex]}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={nextSlide} style={styles.navButtonRight}>
        <Text style={styles.arrow}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const About = () => {
  const images = [
    require("../assets/img/About/1.png"),
    require("../assets/img/About/2.png"),
  ];

  return (
    <ScrollView style={styles.body}>
      <View style={styles.section}>
        <InfiniteScroll images={images} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Parmarth</Text>
        <Text style={styles.text}>
          Journey of Club started in 2015. Back in those times, there was a huge amount of child beggars on the college road and college chauraha. 
          Those little beggars used to beg for little food or some money. Such children can be seen everywhere but are not often noticed...
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>This Day & Age</Text>
        <Text style={styles.text}>
          Today, the club is well structured and follows college hierarchy. More than 200 volunteers from all streams and courses are associated...
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Vision of Parmarth</Text>
        <Text style={styles.text}>
          Our vision is to create an inclusive society where every child, regardless of their background, has the opportunity to realize their full potential.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Mission of Parmarth</Text>
        <Text style={styles.text}>The mission of Parmarth is to:</Text>
        <Text style={styles.list}>• Provide quality education and skill development.</Text>
        <Text style={styles.list}>• Promote awareness of social and environmental responsibilities.</Text>
        <Text style={styles.list}>• Empower children through mentorship and guidance.</Text>
        <Text style={styles.list}>• Create a nurturing environment that fosters creativity and innovation.</Text>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  body: {
    paddingTop: 60,
    backgroundColor: "#f8f9fa",
  },
  section: {
    margin: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  heading: {
    fontSize: 26,
    color: "#0056b3",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subheading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343a40",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginTop: 10,
  },
  list: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 6,
    color: "#555",
  },
  sliderWrapper: {
    position: "relative",
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
  },
  navButtonLeft: {
    position: "absolute",
    left: 10,
    top: "45%",
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
  navButtonRight: {
    position: "absolute",
    right: 10,
    top: "45%",
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
  arrow: {
    fontSize: 18,
    color: "#0056b3",
  },
});
