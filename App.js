import React, { useState } from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import PostList from './components/PostList';
import Filter from './components/Filter';
import { globalStyles, colors } from './styles/styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExpoStatusBar style="light" />
      <AppContent />
    </QueryClientProvider>
  );
}

function AppContent() {
  const [userId, setUserId] = useState(null);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={globalStyles.header}>
        <View>
          <Text style={globalStyles.headerTitle}>CRUD Query App</Text>
          <Text style={globalStyles.headerSubtitle}>
            Powered by TanStack Query + JSONPlaceholder
          </Text>
        </View>
      </View>

      {/* User ID Filter */}
      <Filter onFilterChange={setUserId} />

      {/* Post List */}
      <PostList userId={userId} />
    </SafeAreaView>
  );
}
