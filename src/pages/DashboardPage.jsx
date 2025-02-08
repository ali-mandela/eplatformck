import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Ensure you import useNavigate




const DashboardPage = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [attendingEvents, setAttendingEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyEvents = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Unauthorized: Please log in.");
                return;
            }

            try {
                const response = await axios.get("/e/my-event", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMyEvents(response.data.events);
            } catch (error) { 
                console.error("Fetch Error:", error);
            }
        };

        const fetchAttendingEvents = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            try {
                const response = await axios.get("/e/attending", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAttendingEvents(response.data.events);
            } catch (error) { 
                console.error("Fetch Error:", error);
            }
        };

        fetchMyEvents();
        fetchAttendingEvents();
    }, []);

   
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.error("No authentication token found. Please log in.");
            return;
        }
    
        try {
            const response = await axios.delete(`/e/event/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.status === 200) {
                console.log("Event deleted successfully!");
                navigate("/");  
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
        }
    };
    

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 px-4 py-10">
                {/* My Events Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">🎉 My Events Dashboard 🎊</h1>
                    <p className="text-lg text-gray-600 mt-2">Manage all the events you've created!</p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myEvents.length > 0 ? (
                        myEvents.map((event) => (
                            <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-5">
                                <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
                                <p onClick={()=>handleDelete(event._id)} className="text-red-900"><Trash2/></p>

                                <p className="text-gray-600 mt-2">{event.description || "No description provided."}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                        {event.type}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(event.startDateTime).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg mt-10">No events found. Create one now! 🚀</p>
                    )}
                </div>

                {/* Attending Events Section */}
                <div className="text-center mt-20">
                    <h1 className="text-3xl font-bold text-gray-800">🎟️ Events I'm Attending 🎟️</h1>
                    <p className="text-lg text-gray-600 mt-2">Here are the events you're attending!</p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attendingEvents.length > 0 ? (
                        attendingEvents.map((event) => (
                            <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-5">
                                <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
                                <p className="text-gray-600 mt-2">{event.description || "No description provided."}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                                        {event.type}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(event.startDateTime).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg mt-10">You're not attending any events yet! 🎭</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
