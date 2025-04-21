import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Örnek kitap verileri
const sampleBooks = [
  {
    id: '1',
    title: 'Suç ve Ceza',
    author: 'Fyodor Dostoyevski',
    category: 'Roman',
    available: true,
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    category: 'Bilim Kurgu',
    available: false,
  },
  // Daha fazla kitap eklenebilir
];

const BookListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState(sampleBooks);
  const navigation = useNavigation();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Arama işlemi burada yapılacak
    const filteredBooks = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Yazar: {item.author}</Paragraph>
        <Paragraph>Kategori: {item.category}</Paragraph>
        <Paragraph>
          Durum: {item.available ? 'Mevcut' : 'Ödünç Verildi'}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => navigation.navigate('BookDetail', { book: item })}
        >
          Detaylar
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Kitap ara..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default BookListScreen; 