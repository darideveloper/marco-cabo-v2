import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ url }) => {
    const imageUrl = url.searchParams.get('url')

    if (!imageUrl) {
        return new Response('Missing image URL parameter', { status: 400 })
    }

    try {
        // Decode the URL in case it's double-encoded
        const decodedUrl = decodeURIComponent(imageUrl)

        // Validate that the URL is from Google
        if (!decodedUrl.includes('googleusercontent.com') && !decodedUrl.includes('google.com')) {
            return new Response('Invalid image source', { status: 400 })
        }

        // Google images often need referer and user-agent headers
        const response = await fetch(decodedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://www.google.com/',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            },
        })

        if (!response.ok) {
            console.error(`Failed to fetch image: ${response.status} ${response.statusText}`)
            return new Response(`Failed to fetch image: ${response.status}`, { status: response.status })
        }

        const imageBuffer = await response.arrayBuffer()
        const contentType = response.headers.get('content-type') || 'image/jpeg'

        return new Response(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400, s-maxage=86400',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
        })
    } catch (error) {
        console.error('Error proxying image:', error)
        return new Response(`Error fetching image: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
    }
}

