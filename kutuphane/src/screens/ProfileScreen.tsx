import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, List, Divider } from 'react-native-paper';

const ProfileScreen = () => {
  // Örnek kullanıcı verileri
  const user = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    memberSince: '2023-01-01',
    borrowedBooks: [
      { id: '1', title: '1984', dueDate: '2023-12-31' },
      { id: '2', title: 'Hayvan Çiftliği', dueDate: '2023-12-15' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title style={styles.title}>Profil Bilgileri</Title>
          <Divider style={styles.divider} />
          <Paragraph>İsim: {user.name}</Paragraph>
          <Paragraph>E-posta: {user.email}</Paragraph>
          <Paragraph>Üyelik Tarihi: {user.memberSince}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Ödünç Alınan Kitaplar</Title>
          <Divider style={styles.divider} />
          {user.borrowedBooks.map((book) => (
            <List.Item
              key={book.id}
              title={book.title}
              description={`Son Teslim Tarihi: ${book.dueDate}`}
              left={(props) => <List.Icon {...props} icon="book" />}
            />
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
});

export default ProfileScreen; 