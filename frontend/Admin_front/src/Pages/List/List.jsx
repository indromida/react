import React, { useEffect, useState } from 'react';
import './List.css';

function List() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Edit event state
  const [showEditForm, setShowEditForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    startDate: '',
    endDate: '',
    capacity: 0,
    image: ''
  });

  // Success notification state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 2;

  useEffect(() => {
    fetchEvents();
  }, []);

  // Auto-hide success popup after delay
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000); // Hide after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5207/api/events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Validate data is an array
      if (!Array.isArray(data)) {
        throw new Error('Expected array but received different data structure');
      }

      // Ensure events have required fields
      const validatedEvents = data.map(event => ({
        id: event.id || event.ID || Math.random().toString(36).substr(2, 9),
        title: event.titre || 'Untitled Event',
        description: event.description || event.description || '',
        category: event.category || event.category || 'Uncategorized',
        location: event.lieu || event.location || 'Location not specified',
        startDate: event.dateDebut || event.startDate,
        endDate: event.dateFin || event.endDate,
        capacity: event.capaciteMax || event.capacity || 0,
        image: event.imageUrl || null
      }));

      setEvents(validatedEvents);
      setFilteredEvents(validatedEvents);

      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(validatedEvents.map(event => event.category))];
      setCategories(uniqueCategories);

    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date) ? 'Invalid date' : date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Format date for input field (yyyy-MM-ddThh:mm)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date)) return '';
      
      return date.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
    setFilteredEvents(
      category === 'All' 
        ? events 
        : events.filter(event => event.category === category)
    );
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Delete functionality
  const openDeleteConfirm = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setEventToDelete(null);
    setDeleteError(null);
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;
    
    try {
      setDeleteLoading(true);
      setDeleteError(null);
      
      const response = await fetch(`http://localhost:5207/api/events/${eventToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event. Status: ${response.status}`);
      }

      // Update the events list after successful deletion
      setEvents(events.filter(event => event.id !== eventToDelete.id));
      setFilteredEvents(filteredEvents.filter(event => event.id !== eventToDelete.id));
      
      // Close confirmation dialog
      closeDeleteConfirm();
      
      // Show success message
      setSuccessMessage(`Event "${eventToDelete.title}" was successfully deleted`);
      setShowSuccessPopup(true);
      
      // Check if current page is now empty and adjust if needed
      const remainingEventsInCategory = 
        selectedCategory === 'All' 
          ? events.filter(event => event.id !== eventToDelete.id)
          : events.filter(event => event.category === selectedCategory && event.id !== eventToDelete.id);
      
      const newTotalPages = Math.ceil(remainingEventsInCategory.length / eventsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
    } catch (error) {
      console.error('Delete error:', error);
      setDeleteError(error.message || 'Failed to delete event. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Edit functionality
  const openEditForm = (event) => {
    setEventToEdit(event);
    setEditFormData({
      title: event.title || '',
      description: event.description || '',
      category: event.category || '',
      location: event.location || '',
      startDate: formatDateForInput(event.startDate) || '',
      endDate: formatDateForInput(event.endDate) || '',
      capacity: event.capacity || 0,
      image: event.image || ''
    });
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setEventToEdit(null);
    setEditError(null);
    setEditFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      startDate: '',
      endDate: '',
      capacity: 0,
      image: ''
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'capacity' ? parseInt(value, 10) || 0 : value
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (!eventToEdit) return;
    
    try {
      setEditLoading(true);
      setEditError(null);
      
      // Format the data for the API
      const eventData = {
        id: eventToEdit.id,
        titre: editFormData.title,
        description: editFormData.description,
        category: editFormData.category,
        lieu: editFormData.location,
        dateDebut: new Date(editFormData.startDate).toISOString(),
        dateFin: new Date(editFormData.endDate).toISOString(),
        capaciteMax: editFormData.capacity,
        imageUrl: editFormData.image
      };
      
      const response = await fetch(`http://localhost:5207/api/events/${eventToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update event. Status: ${response.status}`);
      }

      // Update the events list after successful edit
      const updatedEvents = events.map(event => 
        event.id === eventToEdit.id 
          ? {
              ...event,
              title: editFormData.title,
              description: editFormData.description,
              category: editFormData.category,
              location: editFormData.location,
              startDate: editFormData.startDate,
              endDate: editFormData.endDate,
              capacity: editFormData.capacity,
              image: editFormData.image
            } 
          : event
      );
      
      setEvents(updatedEvents);
      
      // Update filtered events too
      setFilteredEvents(
        selectedCategory === 'All' 
          ? updatedEvents 
          : updatedEvents.filter(event => event.category === selectedCategory)
      );
      
      // Close edit form
      closeEditForm();
      
      // Show success message
      setSuccessMessage(`Event "${editFormData.title}" was successfully updated`);
      setShowSuccessPopup(true);
      
    } catch (error) {
      console.error('Edit error:', error);
      setEditError(error.message || 'Failed to update event. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="events-page">
      <h1 className="page-title">Upcoming Events</h1>

      <div className="category-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {currentEvents.length === 0 ? (
        <div className="no-events-container">
          <p className="no-events">
            {events.length === 0 
              ? 'No events available.' 
              : `No events in category "${selectedCategory}"`}
          </p>
        </div>
      ) : (
        <div className="events-grid">
          {currentEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-card-header">
                <h2 className="event-title">{event.title}</h2>
                <div className="event-capacity">
                  <span className="capacity-count">{event.capacity}</span>
                  <span className="capacity-label">Max Capacity</span>
                </div>
              </div>

              <div className="event-image">
                {event.image ? (
                  <img src={event.image} alt={event.title} />
                ) : (
                  <div className="placeholder-image">
                    <span>📅</span>
                  </div>
                )}
              </div>

              <div className="event-details">
                <p className="event-description">
                  {event.description || 'No description available'}
                </p>

                <div className="event-info">
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <span className="info-text">{event.location}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-icon">🕒</span>
                    <span className="info-text">{formatDate(event.startDate)}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-icon">⏱️</span>
                    <span className="info-text">Until {formatDate(event.endDate)}</span>
                  </div>
                </div>
              </div>

              <div className="event-footer">
                <button 
                  className="register-button"
                  onClick={() => openDeleteConfirm(event)}
                >
                  Delete
                </button>
                <button 
                  className="details-button"
                  onClick={() => openEditForm(event)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            className="pagination-button" 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="pagination-button" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-content">
            <span className="success-icon">✓</span>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="close-button" onClick={closeDeleteConfirm}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the event "{eventToDelete?.title}"?</p>
              <p className="warning-text">This action cannot be undone.</p>
              
              {deleteError && (
                <div className="error-message">
                  <p>{deleteError}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button" 
                onClick={closeDeleteConfirm}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button 
                className="delete-button" 
                onClick={handleDeleteEvent}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-container edit-modal">
            <div className="modal-header">
              <h3>Edit Event</h3>
              <button className="close-button" onClick={closeEditForm}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditFormSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="title">Event Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      name="startDate"
                      value={editFormData.startDate}
                      onChange={handleEditFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      name="endDate"
                      value={editFormData.endDate}
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="capacity">Max Capacity</label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      min="0"
                      value={editFormData.capacity}
                      onChange={handleEditFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={editFormData.image || ''}
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>

                {editError && (
                  <div className="error-message">
                    <p>{editError}</p>
                  </div>
                )}

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={closeEditForm}
                    disabled={editLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={editLoading}
                  >
                    {editLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;