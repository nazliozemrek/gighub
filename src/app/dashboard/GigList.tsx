'use client'

import { useEffect, useState } from "react";


type Gig = {
  id: string;
  title: string;
  type: string;
  location: string;
  pay: string;
  description: string;
  url: string;
};

export default function GigList() {
    const [gigs,setGigs ] = useState<Gig[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchGigs = async () => {
        try {
            const res = await fetch('/api/gigs');
            const data = await res.json();

            setGigs(data);
        }   catch (error) {
            console.error('Error fetching gigs:',error);
        }   finally {
            setLoading(false);
        }
    };

    fetchGigs();

}, []);

if(!loading && gigs.length  === 0) {
    return <div className="text-center mt-6 text-gray-500">No gigs found.</div>;
}

return (
    <div className="grid gap-6 mt-8">
        {gigs.map((gig)=>(
            <div key={gig.id} className="bg-white rounded-xl shadow p-5 border">
                <h2 className="text-xl text-black font-semibold">{gig.title}</h2>
                <p className="text-gray-500 text-sm">{gig.type} • {gig.location}</p>
                <p className="text-green-600 font-semibold mt-1">{gig.pay}</p>
                <p className="text-gray-600 mt-2">{gig.description}</p>
                <a
                    href={gig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-600 hover:underline text-sm"
                >
                    View Details
                    
                </a>
            </div>
            
        ))}
    </div>
    );
}
 


