import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Artists, Songs } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artists | null>(null);
  const [songs, setSongs] = useState<Songs[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArtist();
  }, [id]);

  const loadArtist = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [artistData, songsResult] = await Promise.all([
        BaseCrudService.getById<Artists>('artists', id),
        BaseCrudService.getAll<Songs>('songs', {}, { limit: 50 })
      ]);
      setArtist(artistData);
      
      // Filter songs by this artist
      const artistSongs = songsResult.items.filter(
        song => song.artistName?.toLowerCase() === artistData?.artistName?.toLowerCase()
      );
      setSongs(artistSongs);
    } catch (error) {
      console.error('Error loading artist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="ml-64 min-h-screen">
        <div style={{ minHeight: isLoading ? '600px' : 'auto' }}>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !artist ? (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Artist not found</h2>
              <Link to="/" className="text-primary hover:underline">
                Return to home
              </Link>
            </div>
          ) : (
            <>
              <section className="relative bg-gradient-to-b from-primary/30 via-background to-background pt-20 pb-12 px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-8 items-end">
                    <Image
                      src={artist.profileImage || 'https://static.wixstatic.com/media/37b007_ef0cf79fbfa44e6aaeead9a34bf2b032~mv2.png?originWidth=256&originHeight=256'}
                      alt={artist.artistName || 'Artist'}
                      className="w-64 h-64 object-cover rounded-full shadow-2xl"
                      width={256}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground mb-2">ARTIST</p>
                      <h1 className="text-4xl md:text-7xl font-heading font-bold text-foreground mb-6">
                        {artist.artistName}
                      </h1>
                      {artist.genre && (
                        <p className="text-foreground text-lg">{artist.genre}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="px-8 py-8 bg-gradient-to-b from-background/50 to-background">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center gap-6 mb-8">
                    <button className="bg-primary hover:bg-primary/90 rounded-full p-4 transition-all hover:scale-105 shadow-lg">
                      <Play className="text-black fill-black" size={28} />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Heart size={32} />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal size={32} />
                    </button>
                  </div>

                  {artist.biography && (
                    <div className="bg-card rounded-lg p-6 mb-8">
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-4">About</h2>
                      <p className="text-muted-foreground leading-relaxed">{artist.biography}</p>
                      {artist.debutYear && (
                        <p className="text-muted-foreground mt-4">
                          <span className="font-bold">Debut Year:</span> {artist.debutYear}
                        </p>
                      )}
                      {artist.officialWebsite && (
                        <a
                          href={artist.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline mt-2 inline-block"
                        >
                          Visit official website
                        </a>
                      )}
                    </div>
                  )}

                  {songs.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Popular tracks</h2>
                      <div className="space-y-2">
                        {songs.map((song, index) => (
                          <Link
                            key={song._id}
                            to={`/songs/${song._id}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
                          >
                            <span className="text-muted-foreground w-8 text-center">{index + 1}</span>
                            <Image
                              src={song.albumArt || 'https://static.wixstatic.com/media/37b007_fd4eea061cd84284acf5aa61221b6688~mv2.png?originWidth=128&originHeight=128'}
                              alt={song.title || 'Song'}
                              className="w-12 h-12 object-cover rounded"
                              width={48}
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-foreground font-bold truncate">{song.title}</h3>
                              <p className="text-muted-foreground text-sm truncate">{song.artistName}</p>
                            </div>
                            <span className="text-muted-foreground text-sm">
                              {song.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}` : '0:00'}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="text-foreground" size={20} />
                            </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <Footer />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
