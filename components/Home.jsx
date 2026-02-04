import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, Pressable, Linking } from 'react-native';
import { styles, buttons, text } from './styles/styles';

export default function Home({ navigation }) {
  const privacyPolicyUrl = 'https://katieweinstein.github.io/TriviaScorekeeper/privacypolicy'

  const handlePress = React.useCallback(async () => {
    try {
      await Linking.openURL(privacyPolicyUrl);
    } catch (err) {
      console.error('Failed to open URL:', err);
    }
  }, [privacyPolicyUrl]);

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Image
        source={require('../images/logo.png')}
        style={styles.logo}
      />
      <Text style={text.mainText}>Scorekeeper</Text>
      <StatusBar style="auto" />
      <Pressable
        style={buttons.newGameButton}
        onPress={() =>
          navigation.navigate('AddPlayers', { name: 'AddPlayers' })
        }
      >
        <Text style={text.mainText}>New Game</Text>
      </Pressable>
      <Pressable onPress={handlePress} style={[buttons.addPlayerButton, { padding: 7 }]}>
        <Text style={text.smallCentered}>Privacy Policy</Text>
      </Pressable>
    </View>
  );
}
