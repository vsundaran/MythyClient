import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardBanner from '@/components/DashboardBanner';
import QuickActionCard from '@/components/QuickActionCard';
import HealthCheckupCard from '@/components/HealthCheckupCard';
import BottomNavBar from '@/components/BottomNavBar';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('Home');
  const user = useAuthStore((state) => state.user);
  const babyProfile = useAuthStore((state) => state.babyProfile);

  const userName = user?.displayName || user?.name || 'Sarah';
  const babyName = babyProfile?.nickname || 'Leo';

  const handleAskDoctor = () => {
    console.log('Ask Doctor pressed');
  };

  const handleMythBuster = () => {
    navigation.navigate('AiMythBuster');
  };

  const dashboardActions = [
    {
      title: 'Ask AI\nMyth-Buster',
      subtitle: 'Science-based facts',
      icon: '🧠',
      backgroundColor: 'rgba(121, 195, 165, 0.1)',
      iconBackgroundColor: '#79c3a5',
      textColor: '#0f172a',
      subtitleColor: '#64748b',
      onPress: handleMythBuster,
    },
    {
      title: 'Chat with\nDoctor',
      subtitle: '24/7 Availability',
      icon: '💬',
      backgroundColor: 'rgba(252, 213, 181, 0.2)',
      iconBackgroundColor: '#FCD5B5',
      textColor: '#0f172a',
      subtitleColor: '#64748b',
    },
    {
      title: 'Community\nGroups',
      subtitle: 'Connect with moms',
      icon: '👥',
      backgroundColor: 'rgba(74, 144, 226, 0.1)',
      iconBackgroundColor: '#4A90E2',
      textColor: '#0f172a',
      subtitleColor: '#64748b',
    },
    {
      title: 'Daily\nMilestone',
      subtitle: `${babyName} is 6 months`,
      icon: '📅',
      backgroundColor: '#ffffff',
      iconBackgroundColor: '#f1f5f9',
      textColor: '#0f172a',
      subtitleColor: '#64748b',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f7f7" />
      
      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader 
          userName={userName} 
          babyName={babyName}
          avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCekdOlX2iHN81bMcBwKNFv__WW_4J2KaDzcn3-ECp5CWbK16cN6YnN7-dhQDztOHNI3KW6saHWXqwQ7PXyNv7MXqJ94prpYjdDSESD3o-X9JrstcTrG2qJdQZ9AS-0vDo7ywgc1fF2aO7-75Yqf7oPG9Jp_dXAeoOIBtp16Kj5gt541myc-l7B1vVHU-dkFdDJZhSrXRPJ2Daz1yX4dK1Z6zj2a7LCC8c04bj7pet6Q3Q0mtaHdJ2gpFgMi_PitZlycnUhhBkNnS4"
        />

        <View style={styles.section}>
          <DashboardBanner 
            tag="EXPERT ADVICE"
            title={`Verified pediatric\ncare for ${babyName}.`}
            buttonText="Ask a Doctor"
            onPress={handleAskDoctor}
            subtitle=""
          />
        </View>

        {/* Bento Grid Action Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bentoGrid}>
            {dashboardActions.map((action, index) => (
              <QuickActionCard 
                key={index}
                {...action}
              />
            ))}
          </View>
        </View>

        {/* Health Status Card */}
        <View style={styles.section}>
          <HealthCheckupCard 
            title="Health Checkup"
            subtitle="Upcoming vaccination in 3 days"
            progress={70}
          />
        </View>

        {/* Extra spacing for BottomNavBar */}
        <View style={{ height: 100 + insets.bottom }} />
      </ScrollView>

      {/* Persistent Bottom Tab Bar */}
      <BottomNavBar 
        activeTab={activeTab} 
        onTabPress={setActiveTab} 
      />
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
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Poppins',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#79c3a5',
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
