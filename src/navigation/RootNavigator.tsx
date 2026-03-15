import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import { OnboardingFactsScreen } from '@/screens/OnboardingFactsScreen';
import LoginScreen from '@/screens/LoginScreen';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useAuthStore } from '@/store/useAuthStore';

import UserOnboardingStep1Screen from '@/screens/UserOnboardingStep1Screen';
import BabyProfileSetupStep2Screen from '@/screens/BabyProfileSetupStep2Screen';
import LegalConsentStep3Screen from '@/screens/LegalConsentStep3Screen';
import AiMythBusterScreen from '@/screens/AiMythBusterScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const hasSeenOnboarding = useOnboardingStore((state) => state.hasSeenOnboarding);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isUserDataComplete = useAuthStore((state) => state.isUserDataComplete);
  const isBabyProfileComplete = useAuthStore((state) => state.isBabyProfileComplete);
  const isConsentGiven = useAuthStore((state) => state.isConsentGiven);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding ? (
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingFactsScreen} 
        />
      ) : !isAuthenticated ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
      ) : !isUserDataComplete ? (
        <Stack.Screen 
          name="UserOnboardingStep1" 
          component={UserOnboardingStep1Screen} 
        />
      ) : !isBabyProfileComplete ? (
        <Stack.Screen 
          name="BabyProfileSetupStep2" 
          component={BabyProfileSetupStep2Screen} 
        />
      ) : !isConsentGiven ? (
        <Stack.Screen 
          name="LegalConsentStep3" 
          component={LegalConsentStep3Screen} 
        />
      ) : (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="AiMythBuster" 
            component={AiMythBusterScreen} 
            options={{ headerShown: false }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
