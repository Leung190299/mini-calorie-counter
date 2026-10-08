import { MiniAppThemeProvider, type MiniAppTheme } from '@exercise/mini-app-sdk';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import miniApp from '..';

// Same colors the exercise-app host passes down (src/constants/theme.ts), so the mini app
// looks here exactly as it will inside the host.
const THEMES: Record<'light' | 'dark', MiniAppTheme> = {
  light: {
    colors: {
      text: '#000000',
      textSecondary: '#60646C',
      background: '#ffffff',
      surface: '#F0F0F3',
      surfaceSelected: '#E0E1E6',
    },
  },
  dark: {
    colors: {
      text: '#ffffff',
      textSecondary: '#B0B4BA',
      background: '#000000',
      surface: '#212225',
      surfaceSelected: '#2E3135',
    },
  },
};

export default function App() {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');
  const theme = THEMES[scheme];
  const MiniApp = miniApp.component;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {miniApp.emoji} {miniApp.name}
          </Text>
          <Text style={{ color: theme.colors.textSecondary }}>
            standalone · v{miniApp.version}
            {miniApp.requires?.length ? ` · requires ${miniApp.requires.join(', ')}` : ''}
          </Text>
          <Pressable
            onPress={() => setScheme((s) => (s === 'light' ? 'dark' : 'light'))}
            style={[styles.toggle, { backgroundColor: theme.colors.surface }]}>
            <Text style={{ color: theme.colors.text }}>
              {scheme === 'light' ? '🌙 Chế độ tối' : '☀️ Chế độ sáng'}
            </Text>
          </Pressable>
        </View>
        <MiniAppThemeProvider theme={theme}>
          <MiniApp />
        </MiniAppThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  toggle: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
});
