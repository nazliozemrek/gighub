'use client'


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
    const gigs: Gig[] = [
  {
    id: "1",
    title: "DoorDash Delivery",
    type: "Delivery",
    location: "Austin, TX",
    pay: "$120/day",
    description: "Deliver food with your own car. Set your own hours.",
    url: "https://doordash.com",
  },
  {
    id: "2",
    title: "Babysitting for Weekend",
    type: "Childcare",
    location: "Round Rock, TX",
    pay: "$200/weekend",
    description: "Looking for a friendly babysitter for 2 kids (Sat-Sun).",
    url: "#",
  },
  {
    id: "3",
    title: "Remote Data Entry",
    type: "Remote",
    location: "Online",
    pay: "$15/hour",
    description: "Part-time data entry role. No experience needed.",
    url: "#",
  },
];
return (

    <div className="grid gap-6 mt-8">
  {gigs.map((gig) => (
    <div key={gig.id} className="bg-white rounded-xl shadow p-5 border">
      <h2 className="text-xl font-semibold">{gig.title}</h2>
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