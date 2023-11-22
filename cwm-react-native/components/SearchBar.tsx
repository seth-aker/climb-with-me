
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void; // Callback function to handle search
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Function to handle text input change
  const handleInputChange = (query: string) => {
    setSearchQuery(query);
  };

  // Function to handle search submission
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
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
    width: '40%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 3,
    paddingLeft: 10,
  },
});


export default SearchBar;
