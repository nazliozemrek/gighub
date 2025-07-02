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
    const [searchTerm,setSearchTerm] =useState("");

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


if(loading) return <div className="text-center mt-6 text-gray-500">Loading ...</div>
if(!loading && gigs.length  === 0) return <div className="text-center mt-6 text-gray-500">No gigs found.</div>;

// filter gigs

const filteredGigs = gigs.filter((gig) =>
    gig.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.location?.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <div className="mt-8">
        <input
        type="text"
        placeholder="Search by title,type,or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />

    {filteredGigs.length === 0 ? (
        <div className="text-center text-gray-500">No gigs found</div>
    ) : (
        <div className="grid gap-6 mt-8">
            {filteredGigs.map((gig) => (
             
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
             )}  
        </div>
    );
}
        
    
    

        
 


