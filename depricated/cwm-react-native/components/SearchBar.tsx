import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void; // Callback function to handle search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const placeholderTexts = ['Find activities', 'Find people', 'Search for something'];

  // Function to handle text input change
  const handleInputChange = (query: string) => {
    setSearchQuery(query);
  };

  // Function to handle search submission
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  // Use useEffect to update placeholder text every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [placeholderTexts.length]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholderTexts[placeholderIndex]}
        value={searchQuery}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '90%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 3,
    paddingLeft: 10,
    borderRadius: 20,
  },
});

export default SearchBar;
