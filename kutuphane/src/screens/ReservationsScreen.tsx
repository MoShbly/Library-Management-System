import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, List, Divider, Button, Chip } from 'react-native-paper';
import { Reservation } from '../types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const ReservationsScreen = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      bookId: '1',
      title: '1984',
      reservationDate: '2023-12-01',
      status: 'pending',
      notificationSent: false,
    },
    {
      id: '2',
      bookId: '2',
      title: 'Suç ve Ceza',
      reservationDate: '2023-12-05',
      status: 'ready',
      notificationSent: true,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'ready':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'ready':
        return 'Hazır';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const cancelReservation = (id: string) => {
    setReservations(reservations.map(reservation =>
      reservation.id === id
        ? { ...reservation, status: 'cancelled' }
        : reservation
    ));
  };

  const renderItem = ({ item }: { item: Reservation }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph style={styles.date}>
          Rezervasyon Tarihi: {format(new Date(item.reservationDate), 'dd MMMM yyyy', { locale: tr })}
        </Paragraph>
        <View style={styles.statusContainer}>
          <Chip
            style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
            textStyle={styles.statusText}
          >
            {getStatusText(item.status)}
          </Chip>
        </View>
        {item.status === 'pending' && (
          <Button
            mode="outlined"
            onPress={() => cancelReservation(item.id)}
            style={styles.cancelButton}
          >
            Rezervasyonu İptal Et
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
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
  date: {
    marginTop: 8,
    color: '#666',
  },
  statusContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#FFFFFF',
  },
  cancelButton: {
    marginTop: 8,
  },
});

export default ReservationsScreen; 