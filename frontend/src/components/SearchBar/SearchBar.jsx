import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, Clock, TrendingUp, Mic, Camera, Upload } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({
  placeholder = "Search for food, restaurants, cuisines...",
  onSearch,
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  showSuggestions = true,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // debouncing
  useEffect(()=> {
    const timer = setTimeout(()=> {
      setDebounceQuery(query);
      console.log("✅ Debounced value set:", query);
    },400);                   // 400ms delay
    return () => {
      clearTimeout(timer)       // to avoid memory leak
    }
  },[query])

  // ✅ Enhanced Voice search
  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setQuery(transcript);
      
      // Auto search when final result is ready
      if (event.results[event.results.length - 1].isFinal) {
        onSearch && onSearch(transcript);
        setIsListening(false);
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error", err);
      setIsListening(false);
      alert("Speech recognition failed. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // ✅ Image upload functionality
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      return;
    }

    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Process image for search
    processImageForSearch(file);
  };

  // ✅ Process image for search
  const processImageForSearch = async (file) => {
    setIsProcessingImage(true);
    
    try {
      // Simulate image recognition API call
      // In a real implementation, you would call an actual image recognition service
      const formData = new FormData();
      formData.append('image', file);
      
      // Mock API call - replace with actual implementation
      const mockResults = [
        "Pizza Margherita",
        "Italian Cuisine", 
        "Cheese Pizza",
        "Traditional Pizza"
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use the first result as search query
      const searchQuery = mockResults[0];
      setQuery(searchQuery);
      onSearch && onSearch(searchQuery);
      
    } catch (error) {
      console.error('Image processing error:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // ✅ Remove uploaded image
  const removeUploadedImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Sample data for demonstration
  const defaultSuggestions = useMemo(
    () => [
      "Pizza Margherita",
      "Chicken Biryani",
      "Pasta Carbonara",
      "Sushi Roll",
      "Burger Deluxe",
      "Thai Green Curry",
      "Caesar Salad",
      "Fish and Chips",
      "Tacos",
      "Ramen Noodles",
    ],
    []
  );

  const defaultRecentSearches = useMemo(
    () => ["Pizza", "Chinese food", "Desserts"],
    []
  );

  const defaultPopularSearches = useMemo(
    () => ["Pizza", "Burger", "Sushi", "Biryani", "Pasta"],
    []
  );

  const allSuggestions = useMemo(
    () => (suggestions.length > 0 ? suggestions : defaultSuggestions),
    [suggestions, defaultSuggestions]
  );

  const allRecentSearches = useMemo(
    () => (recentSearches.length > 0 ? recentSearches : defaultRecentSearches),
    [recentSearches, defaultRecentSearches]
  );

  const allPopularSearches = useMemo(
    () =>
      popularSearches.length > 0 ? popularSearches : defaultPopularSearches,
    [popularSearches, defaultPopularSearches]
  );

  // debounced search filter
  useEffect(() => {
    if (debounceQuery.trim()) {
      const filtered = allSuggestions.filter((item) =>
        item.toLowerCase().includes(debounceQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8));
    } else {
      setFilteredSuggestions([]);
    }
  }, [debounceQuery, allSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSearch = (searchQuery = debounceQuery) => {
    if (searchQuery.trim()) {
      onSearch && onSearch(searchQuery.trim());
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    removeUploadedImage();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className={`search-bar-container ${className}`} ref={searchRef}>
      <div className="search-bar">
        <div className="search-input-wrapper">
          <div className="search-icon-sb">
            <Search size={20} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={placeholder}
            className="search-input"
          />

          {/* ✅ Image Upload Button */}
          <button 
            className="image-upload-button" 
            onClick={() => fileInputRef.current?.click()}
            title="Upload image to search"
          >
            <Camera size={20} />
          </button>

          {/* ✅ Voice Search Button */}
          <button 
            className={`voice-button ${isListening ? 'listening' : ''}`} 
            onClick={handleVoiceSearch}
            title={isListening ? "Stop listening" : "Voice search"}
          >
            <Mic size={20} />
          </button>

          {(query || uploadedImage) && (
            <button className="clear-button" onClick={handleClear}>
              <X size={20} />
            </button>
          )}
        </div>
        <button className="search-button" onClick={() => handleSearch()}>
          Search
        </button>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* Image preview and processing status */}
      {imagePreview && (
        <div className="image-preview-container">
          <div className="image-preview">
            <img src={imagePreview} alt="Uploaded" />
            <button 
              className="remove-image-btn" 
              onClick={removeUploadedImage}
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          {isProcessingImage && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <span>Processing image...</span>
            </div>
          )}
        </div>
      )}

      {isOpen && showSuggestions && (
        <div className="search-dropdown">
          {query.trim() ? (
            <div className="suggestions-section">
              {filteredSuggestions.length > 0 ? (
                <>
                  <div className="section-header">
                    <Search size={16} />
                    <span>Suggestions</span>
                  </div>
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Search size={16} className="suggestion-icon" />
                      <span className="suggestion-text">
                        {suggestion
                          .split(new RegExp(`(${query})`, "gi"))
                          .map((part, i) =>
                            part.toLowerCase() === query.toLowerCase() ? (
                              <mark key={i}>{part}</mark>
                            ) : (
                              part
                            )
                          )}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="no-results">
                  <span>No suggestions found for "{query}"</span>
                </div>
              )}
            </div>
          ) : (
            <div className="default-suggestions">
              {allRecentSearches.length > 0 && (
                <div className="suggestions-section">
                  <div className="section-header">
                    <Clock size={16} />
                    <span>Recent Searches</span>
                  </div>
                  {allRecentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="suggestion-item recent-item"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      <Clock size={16} className="suggestion-icon" />
                      <span className="suggestion-text">{search}</span>
                    </div>
                  ))}
                </div>
              )}

              {allPopularSearches.length > 0 && (
                <div className="suggestions-section">
                  <div className="section-header">
                    <TrendingUp size={16} />
                    <span>Popular Searches</span>
                  </div>
                  {allPopularSearches.map((search, index) => (
                    <div
                      key={index}
                      className="suggestion-item popular-item"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      <TrendingUp size={16} className="suggestion-icon" />
                      <span className="suggestion-text">{search}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
