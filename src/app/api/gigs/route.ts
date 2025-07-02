import { NextResponse } from 'next/server';


export async function GET(){
    try{
        const res = await fetch('https://remoteok.com/api',{
            headers:{
                'Accept':'application/json',
            },
            // Force fresh fetch

            next:{revalidate:60},//Next.js 13 +
        });

        const data = await res.json();
        console.log("Raw RemoteOk data:",data.slice(0,2));

        // First item is metadata, skip it

        const jobs = data.slice(1).map((job: any) => ({
            id: job.id.toString(),
            title: job.position || job.title,
            type: "Remote",
            location: job.location || "Worldwide",
            pay: job.salary || "N/A",
            description: job.description?.replace(/<[^>]+>/g, '').slice(0,200) || "No description.",
            url: job.url,
        }));

        return NextResponse.json(jobs.slice(0,15));

    }   catch (error) {
        console.error("RemoteOK API error:",error);
        return NextResponse.json({error:"Failed to fetch gigs"},{status: 500});
    }
}