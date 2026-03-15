import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

interface DashboardBannerProps {
  title: string;
  subtitle: string;
  tag: string;
  buttonText: string;
  onPress: () => void;
}

const DashboardBanner: React.FC<DashboardBannerProps> = ({
  title,
  subtitle,
  tag,
  buttonText,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.content}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        
        {/* Decorative elements */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
  },
  banner: {
    height: 180,
    backgroundColor: '#79c3a5',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#79c3a5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  content: {
    zIndex: 2,
    justifyContent: 'space-between',
    flex: 1,
  },
  tagContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    marginTop: 8,
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  buttonText: {
    color: '#79c3a5',
    fontSize: 14,
    fontWeight: '800',
  },
  circle1: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle2: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default DashboardBanner;
