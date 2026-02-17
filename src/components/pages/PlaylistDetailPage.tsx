import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Playlists, Songs } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlists | null>(null);
  const [songs, setSongs] = useState<Songs[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlaylist();
  }, [id]);

  const loadPlaylist = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [playlistData, songsResult] = await Promise.all([
        BaseCrudService.getById<Playlists>('playlists', id),
        BaseCrudService.getAll<Songs>('songs', {}, { limit: 20 })
      ]);
      setPlaylist(playlistData);
      setSongs(songsResult.items);
    } catch (error) {
      console.error('Error loading playlist:', error);
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
          ) : !playlist ? (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Playlist not found</h2>
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
                      src={playlist.coverImage || 'https://static.wixstatic.com/media/37b007_89b104b2d16944a5a3b8a1e76fa1b086~mv2.png?originWidth=256&originHeight=256'}
                      alt={playlist.playlistName || 'Playlist'}
                      className="w-64 h-64 object-cover rounded-lg shadow-2xl"
                      width={256}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground mb-2">PLAYLIST</p>
                      <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                        {playlist.playlistName}
                      </h1>
                      {playlist.description && (
                        <p className="text-muted-foreground mb-4">{playlist.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-foreground">
                        <span className="font-bold">spotify.com</span>
                        <span>•</span>
                        <span>{songs.length} songs</span>
                      </div>
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

                  <div className="mb-4 pb-2 border-b border-border">
                    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 text-muted-foreground text-sm font-bold">
                      <span className="w-8 text-center">#</span>
                      <span>TITLE</span>
                      <span className="hidden md:block">GENRE</span>
                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {songs.map((song, index) => (
                      <Link
                        key={song._id}
                        to={`/songs/${song._id}`}
                        className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <span className="text-muted-foreground w-8 text-center">{index + 1}</span>
                        <div className="flex items-center gap-4 min-w-0">
                          <Image
                            src={song.albumArt || 'https://static.wixstatic.com/media/37b007_a5f7a00f2d5940b5adb304a7cc814b0e~mv2.png?originWidth=128&originHeight=128'}
                            alt={song.title || 'Song'}
                            className="w-12 h-12 object-cover rounded"
                            width={48}
                          />
                          <div className="min-w-0">
                            <h3 className="text-foreground font-bold truncate">{song.title}</h3>
                            <p className="text-muted-foreground text-sm truncate">{song.artistName}</p>
                          </div>
                        </div>
                        <span className="text-muted-foreground text-sm hidden md:block">{song.genre || '-'}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground text-sm">
                            {song.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}` : '0:00'}
                          </span>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="text-foreground" size={20} />
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
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
