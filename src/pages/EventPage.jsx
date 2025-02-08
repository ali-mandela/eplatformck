import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client'; 
import Layout from '../components/Layout';

const socket = io('http://localhost:8000');  

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [attending, setAttending] = useState(false);
    const [attendeesCount, setAttendeesCount] = useState(0);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/e/event/${id}`);
                setEvent(response.data.event);
                setAttendeesCount(response.data.event.attendees.length);
            } catch (error) {
                toast.error('Failed to load event details');
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
 
        socket.on("update_attendees", ({ eventId, attendeesCount }) => {
            if (eventId === id) {
                setAttendeesCount(attendeesCount);
            }
        });

        return () => {
            socket.off("update_attendees"); 
        };
    }, [id]);

    const handleAttendEvent = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Please log in to attend the event.');
            return;
        }

        try {
            const response = await axios.get(`/e/attend/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                toast.success('Successfully registered for the event!');
                setAttending(true);
 
                const userId = "dummy-user-id";  
                socket.emit("join_event", { eventId: id, userId });
            }
        } catch (error) {
            toast.error('Failed to register for the event.');
            console.error('Error attending event:', error);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-xl text-gray-600">Loading event details...</p>
                </div>
            </Layout>
        );
    }

    if (!event) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-xl text-red-500">Event not found! 😢</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-full bg-gray-100 p-6 md:p-10">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
                        <p className="text-gray-600 mt-2">{event.description}</p>

                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-gray-700">
                            <span className="text-lg font-medium">📍 {event.venue}</span>
                            <span className="text-lg font-medium">📅 {new Date(event.startDateTime).toLocaleString()}</span>
                        </div>

                        <div className="mt-6">
                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm uppercase">{event.type}</span>
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-700 text-sm">
                                Contact: <a href={`mailto:${event.contactEmail}`} className="text-blue-500">{event.contactEmail}</a>
                            </p>
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-700 text-sm">
                                📝 <strong>Planned By:</strong> {event.plannedBy?.name || 'Unknown'}
                            </p>

                            <p className="text-gray-700 text-sm">
                                🕒 **Created At:** {new Date(event.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-700 text-sm">
                                🔄 **Updated At:** {new Date(event.updatedAt).toLocaleString()}
                            </p>
                            <p className="text-gray-700 text-sm">
                                🎟 **Attendees:** {attendeesCount} {/* Updated count */}
                            </p>
                        </div>

                        <div className="mt-6">
                            <button
                                className={`px-6 py-3 rounded-lg text-white text-lg font-bold ${
                                    attending ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                }`}
                                onClick={handleAttendEvent}
                                disabled={attending}
                            >
                                {attending ? 'Already Attending' : 'Attend Event'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EventPage;
