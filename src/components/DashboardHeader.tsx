import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface DashboardHeaderProps {
  userName: string;
  babyName: string;
  avatarUrl?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, babyName, avatarUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatarUrl ? { uri: avatarUrl } : require('../assets/images/logo.png')}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.greeting}>GOOD MORNING</Text>
          <Text style={styles.title}>{userName} & {babyName}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🔔</Text>
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(121, 195, 164, 0.2)',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  greeting: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Poppins',
  },
  right: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 18,
  },
  dot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
});

export default DashboardHeader;
