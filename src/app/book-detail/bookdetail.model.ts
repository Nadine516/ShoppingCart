export interface Book {
  _id: string;
  name: string;
  author: string;
  price: number;
  image?: string;
  description?: string;
  category?: {
    _id: string;
    title: string;
    status: string;
    updatedAt: string;
    createdAt: string;
    __v: number;
  };
  status?: string;
}

  