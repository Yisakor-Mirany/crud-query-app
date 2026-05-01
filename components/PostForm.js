import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost, patchPost } from '../api/postsApi';
import { globalStyles, colors } from '../styles/styles';

export default function PostForm({ visible, mode, post, onClose }) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (mode === 'edit' && post) {
      setTitle(post.title || '');
      setBody(post.body || '');
    } else if (mode === 'patch' && post) {
      setTitle(post.title || '');
      setBody('');
    } else {
      setTitle('');
      setBody('');
    }
  }, [visible, mode, post]);

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts', null], (old) =>
        old ? [{ ...newPost, id: Date.now() }, ...old] : [newPost]
      );
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updated) => {
      queryClient.setQueryData(['posts', null], (old) =>
        old
          ? old.map((p) =>
              p.id === updated.id ? { ...p, title: updated.title, body: updated.body } : p
            )
          : old
      );
      onClose();
    },
  });

  const patchMutation = useMutation({
    mutationFn: patchPost,
    onSuccess: (patched) => {
      queryClient.setQueryData(['posts', null], (old) =>
        old
          ? old.map((p) =>
              p.id === patched.id ? { ...p, title: patched.title } : p
            )
          : old
      );
      onClose();
    },
  });

  const isPending =
    createMutation.isPending || updateMutation.isPending || patchMutation.isPending;

  function handleSubmit() {
    if (mode === 'create') {
      if (!title.trim() || !body.trim()) return;
      createMutation.mutate({ title: title.trim(), body: body.trim(), userId: 1 });
    } else if (mode === 'edit') {
      if (!title.trim() || !body.trim()) return;
      updateMutation.mutate({ id: post.id, title: title.trim(), body: body.trim() });
    } else if (mode === 'patch') {
      if (!title.trim()) return;
      patchMutation.mutate({ id: post.id, title: title.trim() });
    }
  }

  const error =
    createMutation.error?.message ||
    updateMutation.error?.message ||
    patchMutation.error?.message;

  const formTitle =
    mode === 'create'
      ? 'Create New Post'
      : mode === 'edit'
      ? 'Edit Post'
      : 'Update Title Only';

  const submitLabel =
    mode === 'create' ? 'Create Post' : mode === 'edit' ? 'Save Changes' : 'Patch Title';

  const submitColor =
    mode === 'create'
      ? globalStyles.btnSuccess
      : mode === 'edit'
      ? globalStyles.btnPrimary
      : globalStyles.btnPatch;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={globalStyles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <View style={globalStyles.modalSheet}>
            <View style={globalStyles.modalHandle} />
            <Text style={globalStyles.modalTitle}>{formTitle}</Text>

            <Text style={globalStyles.label}>Title</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Enter post title"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
              autoCapitalize="sentences"
              returnKeyType={mode === 'patch' ? 'done' : 'next'}
            />

            {mode !== 'patch' && (
              <>
                <Text style={globalStyles.label}>Body</Text>
                <TextInput
                  style={[globalStyles.input, globalStyles.textArea]}
                  placeholder="Enter post body"
                  placeholderTextColor={colors.textMuted}
                  value={body}
                  onChangeText={setBody}
                  multiline
                  numberOfLines={4}
                  returnKeyType="default"
                />
              </>
            )}

            {error ? (
              <Text style={globalStyles.errorText}>{error}</Text>
            ) : null}

            <View style={globalStyles.formRow}>
              <TouchableOpacity
                style={[globalStyles.btn, globalStyles.btnOutline, globalStyles.formBtn]}
                onPress={onClose}
                disabled={isPending}
                activeOpacity={0.7}
              >
                <Text style={globalStyles.btnOutlineText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.btn, submitColor, globalStyles.formBtn]}
                onPress={handleSubmit}
                disabled={isPending}
                activeOpacity={0.8}
              >
                {isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={globalStyles.btnText}>{submitLabel}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
