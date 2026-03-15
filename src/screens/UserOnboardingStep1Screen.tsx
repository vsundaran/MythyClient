import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const UserOnboardingStep1Screen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const setUserDataComplete = useAuthStore((state) => state.setUserDataComplete);
  const navigation = useNavigation();

  const handleContinue = () => {
    // For now, in Step 1, we mark as complete
    setUserDataComplete(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>User Profile</Text>
            <View style={styles.backButtonPlaceholder} />
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.stepTitle}>Step 1: User Profile</Text>
              <Text style={styles.stepCount}>1 of 3</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '33.33%' }]} />
            </View>
          </View>

          {/* Hero Image Section */}
          <View style={styles.imageContainer}>
            <View style={styles.imageGlow} />
            <Image
              source={require('../assets/onboarding_vector.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.welcomeTitle}>Welcome to Doctor Reply</Text>
            <Text style={styles.welcomeSubtitle}>
              Let's start by getting to know you to provide the best care for your baby.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.countryCode}>
                  <Text style={styles.flag}>🇮🇳</Text>
                  <Text style={styles.code}>+91</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="00000 00000"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Relationship to Child</Text>
              <View style={styles.dropdownWrapper}>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => {/* In a real app, open a picker */}}
                >
                  <Text style={[styles.dropdownText, !relationship && styles.placeholderText]}>
                    {relationship || 'Select relationship'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Action Area */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#0f172a',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Poppins',
    flex: 1,
    textAlign: 'center',
  },
  backButtonPlaceholder: {
    width: 48,
  },
  progressSection: {
    padding: 24,
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Poppins',
  },
  stepCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    fontFamily: 'Poppins',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(120, 194, 164, 0.2)',
    borderRadius: 4,
    marginHorizontal: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#78C2A4',
    borderRadius: 4,
  },
  imageContainer: {
    width: width,
    aspectRatio: 4 / 3,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageGlow: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(120, 194, 164, 0.05)',
    borderRadius: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    lineHeight: 34,
    fontFamily: 'Poppins',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
  form: {
    padding: 24,
    gap: 24,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    gap: 8,
    height: 56,
  },
  flag: {
    fontSize: 18,
  },
  code: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f172a',
  },
  dropdownWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  dropdownText: {
    fontSize: 16,
    color: '#0f172a',
  },
  placeholderText: {
    color: '#94a3b8',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#94a3b8',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#78C2A4',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#78C2A4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  termsText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
    lineHeight: 18,
  },
});

export default UserOnboardingStep1Screen;
