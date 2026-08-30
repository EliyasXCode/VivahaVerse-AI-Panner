import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [compareVenuesList, setCompareVenuesList] = useState([]);

  useEffect(() => {
    if (user && user.favorites) {
      setFavoriteDestinations(user.favorites);
    }
  }, [user]);

  const toggleFavoriteDestination = async (destinationId) => {
    if (!user) {
      toast.error('Please login to save destinations to your account');
      return false;
    }

    try {
      const res = await API.post(`/destinations/favorite/${destinationId}`);
      if (res.data.success) {
        setFavoriteDestinations(res.data.favorites);
        if (res.data.isFavorite) {
          toast.success('Destination saved to favorites');
        } else {
          toast.success('Destination removed from favorites');
        }
        return res.data.isFavorite;
      }
    } catch (err) {
      toast.error('Failed to update favorites');
    }
    return false;
  };

  const isDestinationFavorite = (destId) => {
    return favoriteDestinations.some(f => (typeof f === 'string' ? f : f._id) === destId);
  };

  const toggleCompareVenue = (venue) => {
    const exists = compareVenuesList.some(v => v._id === venue._id || v.slug === venue.slug);
    if (exists) {
      setCompareVenuesList(compareVenuesList.filter(v => v._id !== venue._id && v.slug !== venue.slug));
      toast.success(`Removed ${venue.name} from venue compare`);
    } else {
      if (compareVenuesList.length >= 3) {
        toast.error('You can compare up to 3 venues at a time');
        return;
      }
      setCompareVenuesList([...compareVenuesList, venue]);
      toast.success(`Added ${venue.name} to venue compare`);
    }
  };

  const isVenueInCompare = (venueId) => {
    return compareVenuesList.some(v => v._id === venueId || v.slug === venueId);
  };

  return (
    <SavedContext.Provider value={{
      favoriteDestinations,
      favoriteVenues,
      toggleFavoriteDestination,
      isDestinationFavorite,
      compareVenuesList,
      toggleCompareVenue,
      isVenueInCompare,
      clearCompare: () => setCompareVenuesList([])
    }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
