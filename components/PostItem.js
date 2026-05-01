import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/postsApi';
import { globalStyles, colors } from '../styles/styles';

export default function PostItem({ post, onEdit, onPatch }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['posts', null], (old) =>
        old ? old.filter((p) => p.id !== deletedId) : old
      );
      // Also invalidate any userId-filtered queries
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  function handleDelete() {
    deleteMutation.mutate(post.id);
  }

  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardId}>
        Post #{post.id} · User {post.userId}
      </Text>
      <Text style={globalStyles.cardTitle} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={globalStyles.cardBody} numberOfLines={3}>
        {post.body}
      </Text>

      <View style={globalStyles.cardActions}>
        <TouchableOpacity
          style={[globalStyles.btn, globalStyles.btnPrimary]}
          onPress={() => onEdit(post)}
          activeOpacity={0.8}
        >
          <Text style={globalStyles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.btn, globalStyles.btnPatch]}
          onPress={() => onPatch(post)}
          activeOpacity={0.8}
        >
          <Text style={globalStyles.btnText}>Patch Title</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.btn, globalStyles.btnDanger]}
          onPress={handleDelete}
          disabled={deleteMutation.isPending}
          activeOpacity={0.8}
        >
          {deleteMutation.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={globalStyles.btnText}>Delete</Text>
          )}
        </TouchableOpacity>
      </View>

      {deleteMutation.isError && (
        <Text style={[globalStyles.errorText, { marginTop: 6 }]}>
          {deleteMutation.error.message}
        </Text>
      )}
    </View>
  );
}
