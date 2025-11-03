export interface ContraceptionType {
  id: number;
  name: string;
  description: string;
  image: string;
  moreInfo: string;
  pros: string[];
  cons: string[];
}



export interface SearchResult {
  source: string;
  title: string;
  snippet: string;
  type?: string;
  url: string;
}
