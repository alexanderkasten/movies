import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { ListPagination } from "@/components/list-pagination"
import { MediaCard } from "@/components/media-card"
import { Poster } from "@/components/poster"
import { Rating } from "@/components/rating"

interface DetailRecommendationsProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export async function generateMetadata({ params }: DetailRecommendationsProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Recommendations - ${title}`,
  }
}

export default async function DetailRecommendations({
  params,
  searchParams,
}: DetailRecommendationsProps) {
  const {
    results: movies,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.movie.recommendations({
    id: params.id,
    page: searchParams.page,
  })

  if (!movies?.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <div className="space-y-4">
      <section className="grid-list">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} prefetch={false}>
            <MediaCard.Root>
              <Poster image={movie.poster_path} alt={movie.title} />
              <MediaCard.Content>
                <Rating average={movie.vote_average} count={movie.vote_count} />
                <MediaCard.Title>{movie.title}</MediaCard.Title>
                <MediaCard.Excerpt>
                  {format.year(movie.release_date)}
                </MediaCard.Excerpt>
              </MediaCard.Content>
            </MediaCard.Root>
          </Link>
        ))}
      </section>
      <ListPagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  )
}
