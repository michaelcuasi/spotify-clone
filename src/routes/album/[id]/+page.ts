import type { PageLoad } from "./$types";
import { fetchRefresh } from "$helpers";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({fetch, params}) => {
  const albumRes = await fetchRefresh(fetch, `/api/spotify/albums/${params.id}`)
  if(!albumRes.ok) {
    throw error(albumRes.status, 'Failed to load Albun')
  }
  const albumJson: SpotifyApi.SingleAlbumResponse = await albumRes.json()
  
  let color = null
  if(albumJson.images.length > 0) {
    const colorRes = await fetch(`/api/average-color?${new URLSearchParams({
      image: albumJson.images[0].url
    }).toString()}`
    )
    if(colorRes.ok) {
      color = (await colorRes.json()).color
    }
    
  }

  return {
    album: albumJson,
    title: albumJson.name,
    color
  }
}