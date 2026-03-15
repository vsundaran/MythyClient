import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  backgroundColor: string;
  iconBackgroundColor: string;
  textColor: string;
  subtitleColor: string;
  onPress?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  subtitle,
  icon,
  backgroundColor,
  iconBackgroundColor,
  textColor,
  subtitleColor,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor, borderColor: `${iconBackgroundColor}40` }]} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default QuickActionCard;
