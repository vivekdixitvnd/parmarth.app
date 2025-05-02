import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import backendUrl from '../../backendUrl';
import PostCard from '../../components/PostCard'; // You must create this in RN
import Pagination from '../../components/Pagination'; // You must create this too

const screenWidth = Dimensions.get('window').width;

const Articles = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        Toast.show({ type: 'error', text1: 'Failed to fetch articles' });
        return;
      }
      const resData = await res.json();
      if (!resData?.posts) {
        Toast.show({ type: 'error', text1: 'No posts found' });
        return;
      }
      setData(resData.posts);
      setPagination({
        totalPages: resData.totalPages,
        currentPage: resData.currentPage,
      });
    } catch (err) {
      Toast.show({ type: 'error', text1: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(`${backendUrl}/getArticles?page=1`);
  }, []);

  const handlePageChange = (page) => {
    getData(`${backendUrl}/getArticles?page=${page}`);
  };

  const renderColumn = (columnIndex) => {
    const columnData = data.filter((_, i) => i % 2 === columnIndex);
    return columnData.map((item) => <PostCard key={item._id} data={item} />);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Articles</Text>
      <View style={styles.hr} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#277bc0" style={styles.loader} />
      ) : (
        <View style={styles.masonryGrid}>
          <View style={styles.column}>{renderColumn(0)}</View>
          <View style={styles.column}>{renderColumn(1)}</View>
        </View>
      )}

      {!isLoading && (
        <View style={styles.pagination}>
          {[...Array(pagination.totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <TouchableOpacity
                key={pageNum}
                style={[
                  styles.pageButton,
                  pagination.currentPage === pageNum && styles.activePage,
                ]}
                onPress={() => handlePageChange(pageNum)}
              >
                <Text
                  style={{
                    color: pagination.currentPage === pageNum ? '#fff' : '#000',
                  }}
                >
                  {pageNum}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hr: {
    width: 100,
    borderBottomWidth: 8,
    borderColor: '#277bc0',
    borderStyle: 'dotted',
    marginVertical: 20,
  },
  loader: {
    marginTop: 40,
  },
  masonryGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 10,
  },
  pagination: {
    flexDirection: 'row',
    marginVertical: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#277bc0',
  },
  activePage: {
    backgroundColor: '#277bc0',
  },
});

export default Articles;
