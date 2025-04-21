import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, List, Divider, Button } from 'react-native-paper';
import { Notification } from '../types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'due_date',
      title: 'Kitap İade Hatırlatması',
      message: '"1984" kitabının iade tarihi yaklaşıyor. Son iade tarihi: 15 Aralık 2023',
      date: '2023-12-10',
      read: false,
    },
    {
      id: '2',
      type: 'reservation',
      title: 'Rezervasyon Hazır',
      message: 'Rezerve ettiğiniz "Suç ve Ceza" kitabı hazır. 3 gün içinde alabilirsiniz.',
      date: '2023-12-09',
      read: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'due_date':
        return 'clock-alert';
      case 'reservation':
        return 'bookmark-check';
      default:
        return 'bell';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <Card style={[styles.card, item.read ? styles.readCard : null]}>
      <Card.Content>
        <List.Item
          title={item.title}
          description={item.message}
          left={props => <List.Icon {...props} icon={getNotificationIcon(item.type)} />}
          right={props => (
            <Paragraph style={styles.date}>
              {format(new Date(item.date), 'dd MMMM yyyy', { locale: tr })}
            </Paragraph>
          )}
        />
        {!item.read && (
          <Button
            mode="text"
            onPress={() => markAsRead(item.id)}
            style={styles.readButton}
          >
            Okundu Olarak İşaretle
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
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
  readCard: {
    opacity: 0.7,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  readButton: {
    marginTop: 8,
  },
});

export default NotificationsScreen; 