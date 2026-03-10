import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import { OnboardingFactsScreen } from '@/screens/OnboardingFactsScreen';
import { useOnboardingStore } from '@/store/useOnboardingStore';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const hasSeenOnboarding = useOnboardingStore((state) => state.hasSeenOnboarding);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding ? (
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingFactsScreen} 
        />
      ) : (
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'MythyApp', headerShown: true }} 
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
