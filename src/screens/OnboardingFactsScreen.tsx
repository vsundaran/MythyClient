import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { useOnboardingStore } from '../store/useOnboardingStore';

const { width } = Dimensions.get('window');

export const OnboardingFactsScreen = () => {
  const setHasSeenOnboarding = useOnboardingStore((state) => state.setHasSeenOnboarding);

  const handleFinishOnboarding = () => {
    setHasSeenOnboarding(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />

      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.backButtonPlaceholder} />
        <TouchableOpacity onPress={handleFinishOnboarding} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Content Section */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.imageGlow} />
          {/* <Image
            source={require('../assets/onboarding_image.png')}
            style={styles.image}
            resizeMode="cover"
          /> */}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Grounded in <Text style={styles.titleHighlight}>Doctor-Verified</Text> Facts, Not Myths
          </Text>
          <Text style={styles.description}>
            Reliable information for your parenting journey, verified by leading pediatric experts.
          </Text>
        </View>
      </View>

      {/* Footer / Action Area */}
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotInactive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotInactive]} />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleFinishOnboarding}>
          <Text style={styles.primaryButtonText}>Continue ➔</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButtonPlaceholder: {
    width: 48,
    height: 48,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: '#79c3a5',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: width * 0.8,
    aspectRatio: 1,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageGlow: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    backgroundColor: 'rgba(121, 195, 165, 0.2)',
    borderRadius: 9999,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 38,
    fontFamily: 'Poppins',
  },
  titleHighlight: {
    color: '#79c3a5',
  },
  description: {
    color: '#475569',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 320,
    fontFamily: 'Poppins',
  },
  footer: {
    padding: 32,
    gap: 32,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  progressDotInactive: {
    width: 8,
    backgroundColor: '#d6e1dc',
  },
  progressDotActive: {
    width: 40,
    backgroundColor: '#79c3a5',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#79c3a5',
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#79c3a5',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
});
