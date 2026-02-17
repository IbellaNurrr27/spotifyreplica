import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Play } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Songs, Artists, Playlists } from '@/entities';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState<Songs[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [playlists, setPlaylists] = useState<Playlists[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredSongs = songs.filter(song =>
    song.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artistName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.genre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = artists.filter(artist =>
    artist.artistName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.genre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.playlistName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredSongs.length > 0 || filteredArtists.length > 0 || filteredPlaylists.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="ml-64 min-h-screen">
        <section className="pt-20 pb-12 px-8 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8">Search</h1>
            
            <div className="relative max-w-2xl">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        {searchQuery && (
          <section className="py-12 px-8">
            <div className="max-w-7xl mx-auto">
              {!hasResults && !isLoading && (
                <div className="text-center py-20">
                  <p className="text-2xl text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
                  <p className="text-muted-foreground mt-2">Try searching for something else</p>
                </div>
              )}

              {filteredSongs.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Songs</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredSongs.slice(0, 10).map((song) => (
                      <Link
                        key={song._id}
                        to={`/songs/${song._id}`}
                        className="bg-card hover:bg-secondary rounded-lg p-4 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="relative mb-4">
                          <Image
                            src={song.albumArt || 'https://static.wixstatic.com/media/37b007_fa93cbcc33384dd5b5b6c4850f5046df~mv2.png?originWidth=128&originHeight=128'}
                            alt={song.title || 'Song'}
                            className="w-full aspect-square object-cover rounded-md"
                            width={180}
                          />
                          <button className="absolute bottom-2 right-2 bg-primary rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                            <Play className="text-black fill-black" size={20} />
                          </button>
                        </div>
                        <h3 className="text-foreground font-bold mb-1 truncate">{song.title}</h3>
                        <p className="text-muted-foreground text-sm truncate">{song.artistName}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredArtists.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Artists</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredArtists.slice(0, 10).map((artist) => (
                      <Link
                        key={artist._id}
                        to={`/artists/${artist._id}`}
                        className="bg-card hover:bg-secondary rounded-lg p-4 transition-all duration-300 hover:scale-105"
                      >
                        <div className="relative mb-4">
                          <Image
                            src={artist.profileImage || 'https://static.wixstatic.com/media/37b007_657a713335e948238ff1b57e794e9a05~mv2.png?originWidth=128&originHeight=128'}
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
                </div>
              )}

              {filteredPlaylists.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Playlists</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredPlaylists.slice(0, 10).map((playlist) => (
                      <Link
                        key={playlist._id}
                        to={`/playlists/${playlist._id}`}
                        className="bg-card hover:bg-secondary rounded-lg p-4 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="relative mb-4">
                          <Image
                            src={playlist.coverImage || 'https://static.wixstatic.com/media/37b007_7ed3a1ac7e1944f08394c0fa7625fccd~mv2.png?originWidth=128&originHeight=128'}
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
                </div>
              )}
            </div>
          </section>
        )}

        {!searchQuery && (
          <section className="py-12 px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Browse all</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B'].map((genre) => (
                  <div
                    key={genre}
                    className="bg-gradient-to-br from-primary/20 to-secondary rounded-lg p-6 h-32 flex items-end cursor-pointer hover:scale-105 transition-transform"
                  >
                    <h3 className="text-foreground font-bold text-xl">{genre}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </div>
  );
}
