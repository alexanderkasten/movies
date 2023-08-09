import MediaCarousel from "@/components/carousel/static";
import MediaHero from "@/components/media/hero";
import { getRandomMedia, getTrending } from "@/lib/api";

export default async function Home() {
  const trendingMovie = await getTrending("movie");
  const trendingTv = await getTrending("tv");
  const randomItem = await getRandomMedia([
    ...trendingMovie.results,
    ...trendingTv.results,
  ]);

  return (
    <main>
      <MediaHero media={randomItem} />
      <MediaCarousel title="Trending Movies" items={trendingMovie.results} />
      <MediaCarousel title="Trending TV Shows" items={trendingTv.results} />
    </main>
  );
}