import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const API_KEY = "b994fce496fc0f962a6908ff2a4ba539"; // Replace with your TMDB API Key
// const MOVIE_ID = "603692"; // Example Movie ID (John Wick: Chapter 4)

export default function BoxOfficeChart({ movieId }) {
    const [earnings, setEarnings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoxOfficeData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
                const data = await response.json();

                if (data.revenue) {
                    setEarnings([
                        { name: "Budget", amount: data.budget },
                        { name: "Revenue", amount: data.revenue },
                    ]);
                } else {
                    setEarnings(null);
                }
            } catch (err) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchBoxOfficeData();
    }, []);

    if (loading) return <p className="loading">Loading earnings...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="box-office-container">
            <h2>📊 Box Office Earnings</h2>
            {earnings ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={earnings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#f8fafc" />
                        <YAxis stroke="#f8fafc" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#facc15" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>No earnings data available.</p>
            )}
        </div>
    );
}
