import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';

const EventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '', 
        startDateTime: '',
        endDateTime: '',
        venue: '',
        contactEmail: '', 
        isOnline: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const { name, description, startDateTime, endDateTime } = formData;

        if (!name || !description || !startDateTime || !endDateTime) {
            toast.error('Please fill out all required fields.');
            return;
        }

        try {
            const token =  localStorage.getItem("token");
            const response = await axios.post(
                '/e/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        
            console.log(response);
            toast.success('Event Created Successfully!');
        
            setFormData({ // Reset form after submission
                name: '',
                description: '',
                type: '',
                startDateTime: '',
                endDateTime: '',
                venue: '',
                contactEmail: '',
                isOnline: false
            });
        } catch (error) {
            console.error('Error submitting form:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to create event.');
        }
        
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 py-2 px-4 sm:px-2 lg:px-2">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600">
                        <h2 className="text-3xl font-bold text-white">Create Event</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Event Name"
                                    required
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    required
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    onChange={handleChange}
                                >
                                    <option value="">Select Event Type</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Concert">Concert</option>
                                    <option value="Meetup">Meetup</option>
                                    <option value="Workshop">Workshop</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Event Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                placeholder="Event Description"
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="startDateTime"
                                    value={formData.startDateTime}
                                    required
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="endDateTime"
                                    value={formData.endDateTime}
                                    required
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Planner's Email</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    placeholder="Planner's Email"
                                    required
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Venue</label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    placeholder="Event Venue"
                                    required
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="isOnline"
                                checked={formData.isOnline}
                                onChange={handleChange}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <span className="text-sm text-gray-700">Online Event</span>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
                        >
                            Create Event
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default EventForm;
