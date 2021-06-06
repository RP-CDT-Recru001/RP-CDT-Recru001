import execCall from '../utils/execCall';

const omdbUrl = process.env.REACT_APP_OMDB_URL as string;
const apiKey = process.env.REACT_APP_OMDB_APIKEY as string;

export interface ImdbRating {
  Source: string;
  Value: string;
}

export interface ImdbMovie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string; //url-string
  Production: string;
  Rated: string;
  Ratings: ImdbRating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface OmdbError {
  Response: string;
  Error: string;
}

const checkApi = (): void => {
  if (!omdbUrl || !apiKey) throw new Error('OMDB Info corrupted');
};

checkApi();

//eslint-disable-next-line
export const instanceOfImdbMovie = (object: any): object is ImdbMovie => {
  return (object as ImdbMovie).imdbID !== undefined;
};

//eslint-disable-next-line
export const instanceOfOmdbError = (object: any): object is OmdbError => {
  return (object as OmdbError).Error !== undefined;
};

const queryById = async (id: string): Promise<ImdbMovie | OmdbError> => {
  const urlParams = {
    apiKey,
    i: id
  };
  const reqOpts: RequestInit = { method: 'GET' };
  return await execCall(omdbUrl, reqOpts, urlParams);
};

//could simplify to 1 method by identifying IMDB id (regex)
const queryByTitle = async (searchString: string): Promise<ImdbMovie | OmdbError> => {
  const urlParams = {
    apiKey,
    t: searchString
  };
  const reqOpts: RequestInit = { method: 'GET' };
  return await execCall(omdbUrl, reqOpts, urlParams);
};

const omdbApi = {
  queryById,
  queryByTitle
};

export default omdbApi;
