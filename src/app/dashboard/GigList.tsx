'use client'

import { useEffect, useState } from "react";
import { Search,Heart,HeartOff } from "lucide-react";
import { auth } from '../../../lib/firebase';
import { deleteDoc, doc,setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';



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
    const [debouncedSearch,setDebouncedSearch] = useState("");
    const [favorites,setFavorites] = useState<Gig[]>([]);
    
  
   

    const toggleFavorite = async (gig : Gig) => {
        const uid = auth.currentUser?.uid;
        if(!uid) return alert("You must be logged in");
        const gigRef = doc(db,'users',uid,'favorites',gig.id);
        const isFavorite = favorites.some((f) => f.id === gig.id);
         
        if(isFavorite) {
            await deleteDoc(gigRef);
            setFavorites(favorites.filter((f) => f.id !== gig.id));
        } else {
            await setDoc(gigRef,gig);
            setFavorites([...favorites,gig]);
        }
    };

    useEffect(() =>{
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);

        },400);

        return () => clearTimeout(handler);
    }, [searchTerm]);

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
    gig.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    gig.type?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    gig.location?.toLowerCase().includes(debouncedSearch.toLowerCase())
);

return (
    <div className="mt-8">
        <div className="relative mb-6 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
         <input
        type="text"
        placeholder="Search by title,type,or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        </div>
       

    {filteredGigs.length === 0 ? (
        <div className="text-center text-gray-500">No gigs found</div>
    ) : (
        <div className="grid gap-6 mt-8">
            {filteredGigs.map((gig) => (
             
                    
                <div  key={gig.id} className="relative bg-white rounded-xl shadow p-5 border">
                        <button
                        onClick={() => toggleFavorite(gig)}
                        className={`absolute top-3 right-3 text-xl z-20 ${favorites.some((f) => f.id === gig.id)  ? 'text-red-500'  : 'text-gray-400'}`}
                        title="Save gig"
                    >
                        {favorites.some((f) => f.id === gig.id) ? (
                            <Heart fill="currentColor" className="w-5 h-5"/>
                        ) : (
                            <HeartOff className="w-5 h-5 text-gray-400" />
                        )
                    }
                        
                    </button>   
                     <div className="relative z-10">
                         <h2 className="text-xl text-black font-semibold">{gig.title}</h2>
                         <p className="text-gray-500 text-sm">{gig.type} • {gig.location}</p>
                         <p className="text-green-600 font-semibold mt-1">{gig.pay}</p>
                         <p className="text-gray-600 mt-2">{gig.description}</p>
                
                         <a
                             href={gig.url}
                             target="_blank"
                             rel="noopener noreferrer"
                            className="inline-block mt-3 text-blue-600 hover:underline text-sm z-0"
                          >
                        View Details
                    
                        </a>
                     </div>
                </div>
                
              ))}
                
             </div>
             )}  
        </div>
    );
}
        
    
    

        
 


