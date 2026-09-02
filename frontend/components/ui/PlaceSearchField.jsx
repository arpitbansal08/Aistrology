import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const PlaceSearchField = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  // Debounced version to avoid too many API calls
  const fetchPlaceSuggestions = (input) => {
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input, types: ['(cities)'] }, (predictions, status) => {
      if (status === 'OK') {
        setOptions(predictions.map(p => ({ label: p.description, placeId: p.place_id })));
      }
    });
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      fetchPlaceSuggestions(newInputValue);
    } else {
      setOptions([]);
    }
  };

  const handleSelectionChange = (event, selectedOption) => {
    // If a place is selected, set the input field with the selected place
    if (selectedOption) {
      setInputValue(selectedOption.label);
      console.log("Selected Place:", selectedOption);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleSelectionChange}
      renderInput={(params) => <TextField {...params} label="Search for a place" className='bg-white' />}
      getOptionLabel={(option) => option.label}  // Ensure proper label is shown
    />
  );
};

export default PlaceSearchField;
