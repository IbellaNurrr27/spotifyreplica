import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Songs } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SongDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Songs | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSong();
  }, [id]);

  const loadSong = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Songs>('songs', id);
      setSong(data);
    } catch (error) {
      console.error('Error loading song:', error);
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
          ) : !song ? (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Song not found</h2>
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
                      src={song.albumArt || 'https://static.wixstatic.com/media/37b007_81f4c64676db49978738c21af509840f~mv2.png?originWidth=256&originHeight=256'}
                      alt={song.title || 'Song'}
                      className="w-64 h-64 object-cover rounded-lg shadow-2xl"
                      width={256}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground mb-2">SONG</p>
                      <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                        {song.title}
                      </h1>
                      <div className="flex items-center gap-2 text-foreground">
                        <span className="font-bold">{song.artistName}</span>
                        {song.duration && (
                          <>
                            <span>•</span>
                            <span>{Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}</span>
                          </>
                        )}
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

                  <div className="bg-card rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-muted-foreground text-sm font-bold mb-2">Artist</h3>
                        <p className="text-foreground text-lg">{song.artistName || 'Unknown Artist'}</p>
                      </div>
                      {song.genre && (
                        <div>
                          <h3 className="text-muted-foreground text-sm font-bold mb-2">Genre</h3>
                          <p className="text-foreground text-lg">{song.genre}</p>
                        </div>
                      )}
                      {song.duration && (
                        <div>
                          <h3 className="text-muted-foreground text-sm font-bold mb-2">Duration</h3>
                          <p className="text-foreground text-lg">
                            {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
                          </p>
                        </div>
                      )}
                      {song.audioFileUrl && (
                        <div>
                          <h3 className="text-muted-foreground text-sm font-bold mb-2">Audio</h3>
                          <a
                            href={song.audioFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Listen on external player
                          </a>
                        </div>
                      )}
                    </div>
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
