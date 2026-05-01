import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../styles/styles';

export default function Filter({ onFilterChange }) {
  const [inputValue, setInputValue] = useState('');

  function handleApply() {
    const trimmed = inputValue.trim();
    onFilterChange(trimmed ? trimmed : null);
  }

  function handleClear() {
    setInputValue('');
    onFilterChange(null);
  }

  return (
    <View style={globalStyles.filterContainer}>
      <Text style={globalStyles.label}>Filter by User ID</Text>
      <View style={globalStyles.filterRow}>
        <TextInput
          style={globalStyles.filterInput}
          placeholder="Enter user ID (e.g. 1)"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleApply}
          returnKeyType="search"
          maxLength={3}
        />
        <TouchableOpacity
          style={[globalStyles.btn, globalStyles.btnPrimary]}
          onPress={handleApply}
          activeOpacity={0.8}
        >
          <Text style={globalStyles.btnText}>Search</Text>
        </TouchableOpacity>
        {inputValue.length > 0 && (
          <TouchableOpacity
            style={globalStyles.filterClearBtn}
            onPress={handleClear}
            activeOpacity={0.7}
          >
            <Text style={globalStyles.filterClearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
