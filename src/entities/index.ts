/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: artists
 * Interface for Artists
 */
export interface Artists {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  artistName?: string;
  /** @wixFieldType text */
  biography?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profileImage?: string;
  /** @wixFieldType text */
  genre?: string;
  /** @wixFieldType url */
  officialWebsite?: string;
  /** @wixFieldType number */
  debutYear?: number;
}


/**
 * Collection ID: playlists
 * Interface for Playlists
 */
export interface Playlists {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  playlistName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
  /** @wixFieldType date */
  creationDate?: Date | string;
}


/**
 * Collection ID: songs
 * Interface for Songs
 */
export interface Songs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  artistName?: string;
  /** @wixFieldType number */
  duration?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  albumArt?: string;
  /** @wixFieldType text */
  genre?: string;
  /** @wixFieldType url */
  audioFileUrl?: string;
}
