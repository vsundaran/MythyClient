import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const login = useAuthStore((state) => state.login);

  const handleGoogleLogin = () => {
    // Mock login logic
    login({ name: 'Test User', email: 'test@example.com' }, 'mock-token');
    console.log('Google Login Pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
        >
          <View style={styles.googleIconPlaceholder}>
            {/* You would typically use an SVG or Image for the Google logo here */}
            <View style={styles.googleDotRed} />
            <View style={styles.googleDotBlue} />
            <View style={styles.googleDotYellow} />
            <View style={styles.googleDotGreen} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  googleIconPlaceholder: {
    width: 24,
    height: 24,
    marginRight: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleDotRed: { width: 8, height: 8, backgroundColor: '#EA4335', borderRadius: 2 },
  googleDotBlue: { width: 8, height: 8, backgroundColor: '#4285F4', borderRadius: 2 },
  googleDotYellow: { width: 8, height: 8, backgroundColor: '#FBBC05', borderRadius: 2 },
  googleDotGreen: { width: 8, height: 8, backgroundColor: '#34A853', borderRadius: 2 },
  googleButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});

export default LoginScreen;
