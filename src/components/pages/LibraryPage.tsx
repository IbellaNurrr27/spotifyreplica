import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Music, User, ListMusic } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Songs, Artists, Playlists } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LibraryPage() {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [playlists, setPlaylists] = useState<Playlists[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'playlists' | 'artists' | 'songs'>('playlists');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [songsResult, artistsResult, playlistsResult] = await Promise.all([
        BaseCrudService.getAll<Songs>('songs', {}, { limit: 50 }),
        BaseCrudService.getAll<Artists>('artists', {}, { limit: 50 }),
        BaseCrudService.getAll<Playlists>('playlists', {}, { limit: 50 })
      ]);
      setSongs(songsResult.items);
      setArtists(artistsResult.items);
      setPlaylists(playlistsResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="ml-64 min-h-screen">
        <section className="pt-20 pb-12 px-8 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8">Your Library</h1>
            
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveTab('playlists')}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${
                  activeTab === 'playlists'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                <ListMusic className="inline mr-2" size={18} />
                Playlists
              </button>
              <button
                onClick={() => setActiveTab('artists')}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${
                  activeTab === 'artists'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                <User className="inline mr-2" size={18} />
                Artists
              </button>
              <button
                onClick={() => setActiveTab('songs')}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${
                  activeTab === 'songs'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                <Music className="inline mr-2" size={18} />
                Songs
              </button>
            </div>
          </div>
        </section>

        <section className="py-12 px-8">
          <div className="max-w-7xl mx-auto" style={{ minHeight: isLoading ? '400px' : 'auto' }}>
            {isLoading ? null : (
              <>
                {activeTab === 'playlists' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {playlists.map((playlist) => (
                      <Link
                        key={playlist._id}
                        to={`/playlists/${playlist._id}`}
                        className="bg-card hover:bg-secondary rounded-lg p-4 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="relative mb-4">
                          <Image
                            src={playlist.coverImage || 'https://static.wixstatic.com/media/37b007_21fb70bd83cf40d0a15ef15f30200481~mv2.png?originWidth=128&originHeight=128'}
                            alt={playlist.playlistName || 'Playlist'}
                            className="w-full aspect-square object-cover rounded-md"
                            width={180}
                          />
                          <button className="absolute bottom-2 right-2 bg-primary rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                            <Play className="text-black fill-black" size={20} />
                          </button>
                        </div>
                        <h3 className="text-foreground font-bold mb-1 truncate">{playlist.playlistName}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{playlist.description}</p>
                      </Link>
                    ))}
                  </div>
                )}

                {activeTab === 'artists' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {artists.map((artist) => (
                      <Link
                        key={artist._id}
                        to={`/artists/${artist._id}`}
                        className="bg-card hover:bg-secondary rounded-lg p-4 transition-all duration-300 hover:scale-105"
                      >
                        <div className="relative mb-4">
                          <Image
                            src={artist.profileImage || 'https://static.wixstatic.com/media/37b007_82cd09ad3fdb4b6ab3867d32afad5ec0~mv2.png?originWidth=128&originHeight=128'}
                            alt={artist.artistName || 'Artist'}
                            className="w-full aspect-square object-cover rounded-full"
                            width={180}
                          />
                        </div>
                        <h3 className="text-foreground font-bold mb-1 truncate">{artist.artistName}</h3>
                        <p className="text-muted-foreground text-sm">Artist</p>
                      </Link>
                    ))}
                  </div>
                )}

                {activeTab === 'songs' && (
                  <div className="space-y-2">
                    {songs.map((song, index) => (
                      <Link
                        key={song._id}
                        to={`/songs/${song._id}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <span className="text-muted-foreground w-8 text-center">{index + 1}</span>
                        <Image
                          src={song.albumArt || 'https://static.wixstatic.com/media/37b007_45b604ea474e4170a3a2dde03798b6a0~mv2.png?originWidth=128&originHeight=128'}
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
                )}
              </>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
