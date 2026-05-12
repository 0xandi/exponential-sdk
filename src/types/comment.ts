// Comment types matching the Exponential API responses

export interface CommentAuthor {
  id: string;
  name: string | null;
  image: string | null;
}

export interface ActionComment {
  id: string;
  actionId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: CommentAuthor;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: CommentAuthor;
}
