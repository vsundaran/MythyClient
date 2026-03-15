import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();
  
  const tabs = [
    { id: 'Home', icon: '🏠', label: 'Home' },
    { id: 'Chat', icon: '💬', label: 'Chat' },
    { id: 'Add', icon: '+', label: '', isAction: true },
    { id: 'Groups', icon: '👥', label: 'Groups' },
    { id: 'Profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20), height: 80 + insets.bottom }]}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          if (tab.isAction) {
            return (
              <TouchableOpacity key={tab.id} style={styles.actionButtonContainer} activeOpacity={0.8}>
                <View style={styles.actionButton}>
                  <Text style={styles.actionIcon}>{tab.icon}</Text>
                </View>
              </TouchableOpacity>
            );
          }

          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.6}
            >
              <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 32,
    height: 72,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    fontSize: 24,
    color: '#94a3b8',
  },
  tabIconActive: {
    color: '#79c3a5',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#79c3a5',
  },
  actionButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#79c3a5',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#79c3a5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#FAF9F6',
  },
  actionIcon: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default BottomNavBar;
