import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@sologems.com' },
        update: {},
        create: {
            email: 'admin@sologems.com',
            name: 'Super Admin',
            passwordHash: adminPassword,
            role: 'ADMIN',
        },
    })
    console.log(`Created admin user: admin@sologems.com / admin123`)

    // Setup Cities
    const citiesData = [
        {
            name: 'Agra', slug: 'agra', state: 'Uttar Pradesh', country: 'India',
            description: 'Beyond the Taj. Find the secret viewpoints and less crowded monuments.',
            imageUrl: 'https://images.unsplash.com/photo-1564507592208-0270e9b9222c?q=80&w=800&auto=format&fit=crop',
        },
        {
            name: 'Goa', slug: 'goa', state: 'Goa', country: 'India',
            description: 'Forget Baga and Calangute. Discover secluded beaches and hidden jungle trails.',
            imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
        },
        {
            name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', country: 'India',
            description: 'The Pink City has secrets hidden in its Aravalli hills and old alleyways.',
            imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop',
        },
        {
            name: 'Kochi', slug: 'kochi', state: 'Kerala', country: 'India',
            description: 'A blend of history and art. Secret cafes and quiet backwaters await.',
            imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
        },
        {
            name: 'Shillong', slug: 'shillong', state: 'Meghalaya', country: 'India',
            description: 'The Scotland of the East. Pristine lakes, root bridges, and cozy corners.',
            imageUrl: 'https://images.unsplash.com/photo-1596482181730-ac9f78d6556e?q=80&w=800&auto=format&fit=crop',
        }
    ]

    for (const c of citiesData) {
        const city = await prisma.city.upsert({
            where: { slug: c.slug },
            update: {},
            create: c,
        })
        console.log(`Created city: ${city.name}`)

        // Create 5 hidden gems for each
        const places = []
        for (let i = 1; i <= 5; i++) {
            places.push({
                name: `${city.name} Hidden Gem ${i}`,
                slug: `${city.slug}-gem-${i}`,
                cityId: city.id,
                description: `This is an amazing hidden spot in ${city.name} that most tourists completely miss. Great for solo travelers looking for peace!`,
                lat: 20.0 + (Math.random() * 5),
                lng: 75.0 + (Math.random() * 5),
                type: i % 2 === 0 ? 'CAFE' : 'VIEWPOINT' as any,
                costLevel: i % 3 === 0 ? 'FREE' : 'CHEAP' as any,
                soloFriendly: true,
                bestTime: 'Early morning',
                safetyNotes: 'Well lit during the day. Go before sunset.',
                photos: [c.imageUrl]
            })
        }

        for (const p of places) {
            await prisma.place.upsert({
                where: { slug: p.slug },
                update: {},
                create: p
            })
        }
        console.log(`Created 5 places for ${city.name}`)
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
