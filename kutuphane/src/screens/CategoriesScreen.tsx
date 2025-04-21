import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, List, Divider, Button } from 'react-native-paper';
import { Book } from '../types';
import { useNavigation } from '@react-navigation/native';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [categories] = useState([
    {
      id: '1',
      name: 'Roman',
      description: 'Kurgusal edebi eserler',
      bookCount: 150,
    },
    {
      id: '2',
      name: 'Bilim Kurgu',
      description: 'Bilimsel ve teknolojik temalı kurgu eserler',
      bookCount: 75,
    },
    {
      id: '3',
      name: 'Tarih',
      description: 'Tarihsel olaylar ve dönemler hakkında eserler',
      bookCount: 120,
    },
    {
      id: '4',
      name: 'Biyografi',
      description: 'Kişilerin hayat hikayeleri',
      bookCount: 60,
    },
    {
      id: '5',
      name: 'Felsefe',
      description: 'Felsefi düşünce ve teoriler',
      bookCount: 45,
    },
    {
      id: '6',
      name: 'Psikoloji',
      description: 'Psikolojik araştırmalar ve teoriler',
      bookCount: 30,
    },
  ]);

  const renderItem = ({ item }: { item: typeof categories[0] }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('BookList', { category: item.name })}
    >
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <View style={styles.bookCountContainer}>
          <Paragraph style={styles.bookCount}>
            {item.bookCount} kitap
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
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
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  bookCountContainer: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  bookCount: {
    color: '#666',
    fontStyle: 'italic',
  },
});

export default CategoriesScreen; 