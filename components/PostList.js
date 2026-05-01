import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postsApi';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { globalStyles, colors } from '../styles/styles';

export default function PostList({ userId }) {
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [selectedPost, setSelectedPost] = useState(null);

  const { data: posts, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts', userId ?? null],
    queryFn: () => fetchPosts(userId),
    staleTime: 1000 * 60 * 2,
  });

  function openCreate() {
    setSelectedPost(null);
    setFormMode('create');
    setFormVisible(true);
  }

  function openEdit(post) {
    setSelectedPost(post);
    setFormMode('edit');
    setFormVisible(true);
  }

  function openPatch(post) {
    setSelectedPost(post);
    setFormMode('patch');
    setFormVisible(true);
  }

  function closeForm() {
    setFormVisible(false);
    setSelectedPost(null);
  }

  if (isLoading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.stateText}>Loading posts...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.emptyIcon}>⚠️</Text>
        <Text style={globalStyles.errorText}>{error.message}</Text>
        <TouchableOpacity
          style={[globalStyles.btn, globalStyles.btnPrimary, { marginTop: 16 }]}
          onPress={() => refetch()}
          activeOpacity={0.8}
        >
          <Text style={globalStyles.btnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PostItem post={item} onEdit={openEdit} onPatch={openPatch} />
        )}
        contentContainerStyle={globalStyles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <View>
            <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}>
              <TouchableOpacity
                style={[globalStyles.btnLarge, globalStyles.btnSuccess]}
                onPress={openCreate}
                activeOpacity={0.85}
              >
                <Text style={globalStyles.btnLargeText}>+ Create New Post</Text>
              </TouchableOpacity>
            </View>
            {posts && (
              <View style={globalStyles.countBadge}>
                <Text style={globalStyles.countText}>
                  {posts.length} post{posts.length !== 1 ? 's' : ''}
                  {userId ? ` for User ${userId}` : ''}
                </Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={globalStyles.centerContainer}>
            <Text style={globalStyles.emptyIcon}>📭</Text>
            <Text style={globalStyles.stateText}>
              {userId ? `No posts found for User ${userId}` : 'No posts found'}
            </Text>
          </View>
        }
      />

      <PostForm
        visible={formVisible}
        mode={formMode}
        post={selectedPost}
        onClose={closeForm}
      />
    </View>
  );
}
