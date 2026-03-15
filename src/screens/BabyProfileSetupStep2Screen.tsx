import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
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

const BabyProfileSetupStep2Screen = () => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<'girl' | 'boy'>('girl');
  const [weight, setWeight] = useState(3.4);
  const setBabyProfile = useAuthStore((state) => state.setBabyProfile);
  const setBabyProfileComplete = useAuthStore((state) => state.setBabyProfileComplete);
  const navigation = useNavigation();

  const handleContinue = () => {
    setBabyProfile({
      nickname,
      gender,
      dob: '2024-01-01', // Mock DOB for now
      weight,
    });
    setBabyProfileComplete(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8f8" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerSubtitle}>DOCTOR REPLY</Text>
            <View style={styles.backButtonPlaceholder} />
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.stepTitle}>STEP 2 OF 3</Text>
              <Text style={styles.stepLabel}>Profile Details</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '66.66%' }]} />
            </View>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Tell us about{'\n'}your baby</Text>
            <Text style={styles.subtitle}>
              Help us personalize your experience with expert advice tailored to your little one.
            </Text>
          </View>

          {/* Form Content */}
          <View style={styles.form}>
            {/* Nickname */}
            <View style={styles.glassCard}>
              <Text style={styles.label}>Baby's Nickname</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Charlie"
                  placeholderTextColor="#94a3b8"
                  value={nickname}
                  onChangeText={setNickname}
                />
                <Text style={styles.inputIcon}>😊</Text>
              </View>
            </View>

            {/* Gender */}
            <View style={styles.glassCard}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderSelector}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'girl' && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender('girl')}
                >
                  <Text style={[styles.genderIcon, gender === 'girl' && styles.genderIconActive]}>♀</Text>
                  <Text style={[styles.genderText, gender === 'girl' && styles.genderTextActive]}>Girl</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'boy' && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender('boy')}
                >
                  <Text style={[styles.genderIcon, gender === 'boy' && styles.genderIconActive]}>♂</Text>
                  <Text style={[styles.genderText, gender === 'boy' && styles.genderTextActive]}>Boy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* DOB Selector Placeholder */}
            <View style={styles.glassCard}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity style={styles.dobSelector}>
                <Text style={styles.dobIcon}>📅</Text>
                <Text style={styles.dobText}>Select Date</Text>
                <Text style={styles.expandIcon}>⌵</Text>
              </TouchableOpacity>
            </View>

            {/* Birth Weight */}
            <View style={styles.glassCard}>
              <View style={styles.weightHeader}>
                <Text style={styles.label}>Birth Weight</Text>
                <View style={styles.weightValueContainer}>
                  <Text style={styles.weightValue}>{weight.toFixed(1)} kg</Text>
                </View>
              </View>
              {/* Simple Mock Slider */}
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack} />
                <View style={[styles.sliderFill, { width: `${(weight - 1) * 20}%` }]} />
                <View style={[styles.sliderThumb, { left: `${(weight - 1) * 20}%` }]} />
              </View>
              <View style={styles.weightLabels}>
                <Text style={styles.weightLabel}>1 kg</Text>
                <Text style={styles.weightLabel}>3 kg</Text>
                <Text style={styles.weightLabel}>6 kg+</Text>
              </View>
            </View>
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Continue to Nutrition</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          <Text style={styles.footerTag}>VERIFIED BY PEDIATRIC SPECIALISTS</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f8',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  backIcon: {
    fontSize: 24,
    color: '#334155',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 1.5,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  progressSection: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#78C2A4',
    letterSpacing: 1,
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#78C2A4',
    borderRadius: 4,
  },
  titleSection: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 38,
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 20,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 16,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#78C2A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
  inputIcon: {
    fontSize: 20,
    opacity: 0.4,
  },
  genderSelector: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 30,
    padding: 6,
    gap: 8,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    gap: 8,
  },
  genderButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  genderIcon: {
    fontSize: 20,
    color: '#64748b',
  },
  genderIconActive: {
    color: '#78C2A4',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  genderTextActive: {
    color: '#78C2A4',
    fontWeight: '700',
  },
  dobSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dobIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  dobText: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
  expandIcon: {
    fontSize: 16,
    color: '#94a3b8',
  },
  weightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weightValueContainer: {
    backgroundColor: 'rgba(120, 194, 164, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  weightValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#78C2A4',
  },
  sliderContainer: {
    height: 24,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  sliderFill: {
    position: 'absolute',
    left: 12,
    height: 6,
    backgroundColor: '#78C2A4',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: '#78C2A4',
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: -12, // Offset half of thumb width
  },
  weightLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  weightLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  spacer: {
    height: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(246, 248, 248, 0.95)',
    paddingTop: 32,
  },
  primaryButton: {
    backgroundColor: '#78C2A4',
    height: 64,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#78C2A4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  arrowIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  footerTag: {
    fontSize: 10,
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 16,
    letterSpacing: 2,
    fontWeight: '600',
  },
});

export default BabyProfileSetupStep2Screen;
