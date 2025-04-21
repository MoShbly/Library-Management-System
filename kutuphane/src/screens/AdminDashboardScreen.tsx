import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, List, Divider } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Book, Statistics } from '../types';

const AdminDashboardScreen = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    totalBooks: 0,
    totalUsers: 0,
    activeBorrows: 0,
    overdueBooks: 0,
    popularCategories: [],
    recentActivity: [],
  });

  const chartData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>İstatistikler</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title>{statistics.totalBooks}</Title>
              <Paragraph>Toplam Kitap</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title>{statistics.totalUsers}</Title>
              <Paragraph>Toplam Kullanıcı</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title>{statistics.activeBorrows}</Title>
              <Paragraph>Aktif Ödünç</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title>{statistics.overdueBooks}</Title>
              <Paragraph>Gecikmiş</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Haftalık Ödünç Alma Grafiği</Title>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Popüler Kategoriler</Title>
          <Divider style={styles.divider} />
          {statistics.popularCategories.map((category, index) => (
            <List.Item
              key={index}
              title={category.category}
              description={`${category.count} kitap`}
              left={props => <List.Icon {...props} icon="bookmark" />}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Son Aktiviteler</Title>
          <Divider style={styles.divider} />
          {statistics.recentActivity.map((activity, index) => (
            <List.Item
              key={index}
              title={activity.description}
              description={activity.date}
              left={props => <List.Icon {...props} icon="clock" />}
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
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  divider: {
    marginVertical: 8,
  },
});

export default AdminDashboardScreen; 