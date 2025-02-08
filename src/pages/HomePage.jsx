import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/e/all-events');
                setEvents(response.data.events);
            } catch (error) { 
                console.error('Fetch Error:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 px-4 py-10">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">🎉 Discover Amazing Events 🎊</h1>
                    <p className="text-lg sm:text-xl text-gray-600 mt-2">
                        Explore and attend the most exciting events happening near you!
                    </p>
                </div>

                {/* Events Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div 
                                key={event._id} 
                                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => navigate(`/e/${event._id}`)}
                            > 
                                <div className="p-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
                                    <p className="text-gray-600 mt-2">{event.description.substring(0, 80)}...</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{event.type}</span>
                                        <span className="text-gray-500 text-sm">{new Date(event.startDateTime).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg mt-10">No events available right now. Check back later! ⏳</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
