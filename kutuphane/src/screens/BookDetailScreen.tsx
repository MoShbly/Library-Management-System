import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { book } = route.params;

  const handleBorrow = () => {
    // Kitap ödünç alma işlemi burada yapılacak
    alert('Kitap ödünç alındı!');
  };

  const handleReturn = () => {
    // Kitap iade işlemi burada yapılacak
    alert('Kitap iade edildi!');
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title style={styles.title}>{book.title}</Title>
          <Paragraph style={styles.author}>Yazar: {book.author}</Paragraph>
          <Divider style={styles.divider} />
          <Paragraph>Kategori: {book.category}</Paragraph>
          <Paragraph>
            Durum: {book.available ? 'Mevcut' : 'Ödünç Verildi'}
          </Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          {book.available ? (
            <Button mode="contained" onPress={handleBorrow}>
              Ödünç Al
            </Button>
          ) : (
            <Button mode="contained" onPress={handleReturn}>
              İade Et
            </Button>
          )}
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  actions: {
    justifyContent: 'center',
    padding: 16,
  },
});

export default BookDetailScreen; 