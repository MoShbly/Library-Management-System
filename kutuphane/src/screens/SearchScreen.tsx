import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip, Button } from 'react-native-paper';
import { Book } from '../types';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigation = useNavigation();

  const categories = [
    'Roman',
    'Bilim Kurgu',
    'Tarih',
    'Biyografi',
    'Felsefe',
    'Psikoloji',
  ];

  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: '1984',
      author: 'George Orwell',
      category: 'Bilim Kurgu',
      available: true,
      isbn: '978-975-08-1234-5',
      publishDate: '1949',
      description: 'Distopik bir dünyada geçen klasik roman.',
      totalCopies: 5,
      availableCopies: 3,
    },
    {
      id: '2',
      title: 'Suç ve Ceza',
      author: 'Fyodor Dostoyevski',
      category: 'Roman',
      available: false,
      isbn: '978-975-08-5678-9',
      publishDate: '1866',
      description: 'Rus edebiyatının başyapıtlarından biri.',
      totalCopies: 3,
      availableCopies: 0,
    },
  ]);

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      !selectedCategory || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }: { item: Book }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Yazar: {item.author}</Paragraph>
        <Paragraph>Kategori: {item.category}</Paragraph>
        <View style={styles.statusContainer}>
          <Chip
            style={[
              styles.statusChip,
              { backgroundColor: item.available ? '#4CAF50' : '#F44336' }
            ]}
            textStyle={styles.statusText}
          >
            {item.available ? 'Mevcut' : 'Ödünç Verildi'}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Kitap veya yazar ara..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <View style={styles.categoriesContainer}>
        {categories.map(category => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => 
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#FFFFFF',
  },
});

export default SearchScreen; 