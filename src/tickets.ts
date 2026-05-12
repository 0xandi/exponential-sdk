import type { TrpcClient } from './client.js';
import type { TicketComment } from './types/comment.js';

export interface TicketCommentAddInput {
  ticketId: string;
  content: string;
}

export class TicketsApi {
  constructor(private client: TrpcClient) {}

  async addComment(input: TicketCommentAddInput): Promise<TicketComment> {
    return await this.client.product.ticket.addComment.mutate(input) as TicketComment;
  }

  async deleteComment(id: string): Promise<{ success: boolean }> {
    return await this.client.product.ticket.deleteComment.mutate({
      id,
    }) as { success: boolean };
  }
}
