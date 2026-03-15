import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

const LegalConsentStep3Screen = () => {
  const insets = useSafeAreaInsets();
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const setConsentGiven = useAuthStore((state) => state.setConsentGiven);
  const navigation = useNavigation();

  const handleStartJourney = () => {
    if (consent1 && consent2) {
      setConsentGiven(true);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f7f7" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Step 3 of 3</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.stepTitle}>Final Step: Legal & Consent</Text>
            <Text style={styles.progressText}>100%</Text>
          </View>
          <View style={styles.progressBarWrapper}>
            <View style={[styles.progressBar, { width: '100%' }]} />
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.heroIcon}>🛡️</Text>
          </View>
          <Text style={styles.title}>Trust & Safety</Text>
          <Text style={styles.description}>
            Your data and child's privacy are our top priorities. Please review and consent to the following to start your journey.
          </Text>
        </View>

        {/* Agreements Selection */}
        <View style={styles.agreementsContainer}>
          {/* Agreement Item 1 */}
          <View style={styles.agreementItem}>
            <TouchableOpacity 
              style={[styles.checkbox, consent1 && styles.checkboxActive]} 
              onPress={() => setConsent1(!consent1)}
            >
              {consent1 && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
            <View style={styles.agreementTextContainer}>
              <Text style={styles.agreementTitle}>Verifiable Parental Consent</Text>
              <Text style={styles.agreementDescription}>
                I confirm I am the parent or legal guardian and consent to the collection of necessary pediatric health data.
              </Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>READ FULL DOCUMENT</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Agreement Item 2 */}
          <View style={styles.agreementItem}>
            <TouchableOpacity 
              style={[styles.checkbox, consent2 && styles.checkboxActive]} 
              onPress={() => setConsent2(!consent2)}
            >
              {consent2 && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
            <View style={styles.agreementTextContainer}>
              <Text style={styles.agreementTitle}>Data Privacy Agreement</Text>
              <Text style={styles.agreementDescription}>
                I agree to the Terms of Service and Privacy Policy, including secure cloud storage of my baby's milestones.
              </Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>VIEW PRIVACY POLICY</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Health Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🏥</Text>
            <Text style={styles.badgeText}>Clinically reviewed and HIPAA compliant</Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!consent1 || !consent2) && styles.primaryButtonDisabled
            ]}
            onPress={handleStartJourney}
            disabled={!consent1 || !consent2}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Start My Journey</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          <Text style={styles.footerNote}>
            By tapping "Start My Journey", you acknowledge that this app provides informational support and does not replace professional medical advice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f7',
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
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#334155',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Poppins',
  },
  backButtonPlaceholder: {
    width: 48,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  progressText: {
    fontSize: 14,
    color: '#334155',
  },
  progressBarWrapper: {
    height: 8,
    backgroundColor: 'rgba(120, 194, 164, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#78C2A4',
    borderRadius: 4,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(120, 194, 164, 0.1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Poppins',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
  agreementsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
  agreementItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(120, 194, 164, 0.1)',
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(120, 194, 164, 0.3)',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: '#78C2A4',
    borderColor: '#78C2A4',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  agreementTextContainer: {
    flex: 1,
    gap: 4,
  },
  agreementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  agreementDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78C2A4',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: 'rgba(120, 194, 164, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(120, 194, 164, 0.2)',
    marginTop: 16,
  },
  badgeIcon: {
    fontSize: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    height: 56,
    backgroundColor: '#78C2A4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#78C2A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
    backgroundColor: '#94a3b8',
    shadowOpacity: 0,
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
  footerNote: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 14,
    paddingHorizontal: 24,
  },
});

export default LegalConsentStep3Screen;
