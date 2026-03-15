import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isConfirmed?: boolean;
  source?: string;
}

const AiMythBusterScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Is it true that babies shouldn't have honey before age one? I heard it causes botulism.",
      sender: 'user',
      timestamp: '10:24 AM',
    },
    {
      id: '2',
      text: "Yes, that is correct. You should never give honey to a baby under 12 months old. Honey can contain spores of Clostridium botulinum, which can cause infant botulism—a rare but serious form of food poisoning.",
      sender: 'ai',
      timestamp: '10:25 AM',
      isConfirmed: true,
      source: 'American Academy of Pediatrics (AAP) - "Infant Food Safety Guidelines", 2023.',
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  const quickMyths = [
    "Can babies have honey?",
    "Teething & fever?",
    "Walker safety?",
    "Rice cereal in bottle?",
  ];

  const handleBack = () => navigation.goBack();

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(text),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isConfirmed: true,
        source: 'Clinically verified content from MythyApp Pediatric Board.',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const getMockResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('honey')) {
      return "Myth Confirmed! Honey is unsafe for infants under 1 year due to botulism spores. Their digestive system isn't mature enough to handle them.";
    }
    if (lowerInput.includes('fever')) {
      return "Myth Disproved! While common, teething usually doesn't cause a high fever (over 101°F). Consult a doctor if fever persists.";
    }
    return "This is a great question. Our database indicates that this is generally considered a myth, but always follow personalized medical advice from your pediatrician.";
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
      
      {/* Premium Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerActionBtn}>
          <Text style={styles.headerActionText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedDot}>●</Text>
            <Text style={styles.verifiedText}>DOCTOR VERIFIED</Text>
          </View>
          <Text style={styles.headerTitle}>Ai Myth-Buster</Text>
        </View>
        
        <TouchableOpacity style={styles.headerActionBtn}>
          <Text style={styles.headerActionText}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Chips Selection */}
      <View style={styles.chipsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContent}>
          <TouchableOpacity style={styles.sparkleChip}>
            <Text style={styles.sparkleIcon}>✨</Text>
          </TouchableOpacity>
          {quickMyths.map((myth, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.mythChip}
              onPress={() => handleSend(myth)}
            >
              <Text style={styles.mythChipText}>{myth}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.flex1}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.chatBackground}
        >
          {messages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageContainer, 
                message.sender === 'user' ? styles.userContainer : styles.aiContainer
              ]}
            >
              {message.sender === 'ai' && (
                <View style={styles.aiLabelRow}>
                  <View style={styles.aiIconSmall}>
                    <Text style={styles.aiIconEmoji}>🤖</Text>
                  </View>
                  <Text style={styles.aiLabelText}>AI MEDICAL ASSISTANT</Text>
                </View>
              )}
              
              <View style={[
                styles.bubble,
                message.sender === 'user' ? styles.userBubble : styles.aiBubble
              ]}>
                {message.sender === 'ai' && message.isConfirmed && (
                  <View style={styles.mythConfirmedBadge}>
                    <View style={styles.checkInner}>
                      <Text style={styles.checkIcon}>✓</Text>
                    </View>
                    <Text style={styles.mythConfirmedText}>Myth Confirmed</Text>
                  </View>
                )}
                
                <Text style={[
                  styles.messageText,
                  message.sender === 'ai' ? styles.aiText : styles.userText
                ]}>
                  {message.text}
                </Text>
                
                {message.sender === 'ai' && message.source && (
                  <View style={styles.sourceSection}>
                    <View style={styles.sourceLabelRow}>
                      <Text style={styles.sourceIcon}>🤱</Text>
                      <Text style={styles.sourceLabel}>MEDICAL SOURCE</Text>
                    </View>
                    <Text style={styles.sourceContent}>{message.source}</Text>
                  </View>
                )}
              </View>

              <View style={[
                styles.metaRow,
                message.sender === 'user' ? styles.userMeta : styles.aiMeta
              ]}>
                <Text style={styles.timestampText}>{message.timestamp}</Text>
                {message.sender === 'ai' && (
                  <View style={styles.feedbackRow}>
                    <TouchableOpacity style={styles.feedbackBtn}>
                      <Text style={styles.feedbackIcon}>👍</Text>
                      <Text style={styles.feedbackText}>Helpful</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.feedbackBtn}>
                      <Text style={styles.feedbackIcon}>👎</Text>
                      <Text style={styles.feedbackText}>Not helpful</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}

          {isTyping && (
            <View style={styles.typingBlock}>
              <ActivityIndicator size="small" color="#48A691" />
              <Text style={styles.typingText}>Ai is thinking...</Text>
            </View>
          )}
        </ScrollView>

        {/* Floating rounded input bar */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.bulbBtn}>
            <Text style={styles.bulbIcon}>💡</Text>
          </TouchableOpacity>
          
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.micIconBtn}>
              <Text style={styles.footerEmoji}>🎙️</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Ask another myth..."
              placeholderTextColor="#8E8E8E"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend(inputText)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Off-white/Slate background
  },
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FAF9F6',
  },
  headerActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerActionText: {
    fontSize: 20,
    color: '#1A1A1A',
    fontWeight: '300',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  verifiedDot: {
    color: '#48A691',
    fontSize: 8,
    marginRight: 4,
  },
  verifiedText: {
    color: '#48A691',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Montserrat',
  },
  chipsRow: {
    paddingVertical: 10,
  },
  chipsContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sparkleChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sparkleIcon: {
    fontSize: 18,
  },
  mythChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  mythChipText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  chatBackground: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  messageContainer: {
    marginBottom: 20,
    maxWidth: '100%',
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  aiLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiIconSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#48A691',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  aiIconEmoji: {
    fontSize: 14,
  },
  aiLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#48A691',
    letterSpacing: 0.5,
  },
  bubble: {
    padding: 16,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#FFDAB9', // Soft Peach
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#79c3a5', // Muted Teal
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  userText: {
    color: '#1A1A1A',
  },
  aiText: {
    color: '#FFFFFF',
  },
  mythConfirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  checkInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  checkIcon: {
    color: '#79c3a5',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mythConfirmedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sourceSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  sourceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sourceIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  sourceLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.5,
  },
  sourceContent: {
    fontSize: 11,
    color: '#FFFFFF',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  userMeta: {
    justifyContent: 'flex-end',
  },
  aiMeta: {
    justifyContent: 'space-between',
  },
  timestampText: {
    fontSize: 11,
    color: '#8E8E8E',
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  feedbackIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  feedbackText: {
    fontSize: 12,
    color: '#8E8E8E',
    fontWeight: '500',
  },
  typingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  typingText: {
    fontSize: 13,
    color: '#8E8E8E',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingTop: 10,
    backgroundColor: '#FAF9F6',
  },
  bulbBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 12,
  },
  bulbIcon: {
    fontSize: 20,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
  },
  micIconBtn: {
    marginRight: 10,
  },
  footerEmoji: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    height: '100%',
  },
});

export default AiMythBusterScreen;
