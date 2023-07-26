import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const { user } = await parent();
	const newReleases = fetch('/api/spotify/browse/new-releases?limit=6');
	const featuredPlaylist = fetch('/api/spotify/browse/featured-playlists?limit=6');
	const userPlaylist = fetch(`api/spotify/users/${user?.id}/playlists?limit=6`);
	const catsRes = await fetch(`api/spotify/browse/categories`);
	const catsResJSON: SpotifyApi.MultipleCategoriesResponse | undefined = catsRes.ok
		? await catsRes.json()
		: undefined;

	// console.log("CATEGORY ==>> ", catsResJSON)

	const randomCats = catsResJSON
		? catsResJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3)
		: [];

	// console.log("Random Category Selected ==>>", randomCats)

	const randomCatsPromises = randomCats.map((cat) =>
		fetch(`/api/spotify/browse/categories/${cat.id}/playlists?limit=6`)
	);

	const [newReleasesRes, featuredPlaylistRes, userPlaylistRes, ...randomCatsRes] =
		await Promise.all([newReleases, featuredPlaylist, userPlaylist, ...randomCatsPromises]);

	return {
		newReleases: newReleasesRes.ok
			? (newReleasesRes.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
			: undefined,
		featuredPlaylist: featuredPlaylistRes.ok
			? (featuredPlaylistRes.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
			: undefined,
		userPlaylist: userPlaylistRes.ok
			? (userPlaylistRes.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse>)
			: undefined,
		homeCategories: randomCats,
		categoriesPlaylist: Promise.all(
			randomCatsRes.map((res) =>
				res.ok ? (res.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>) : undefined
			)
		)
	};
};
