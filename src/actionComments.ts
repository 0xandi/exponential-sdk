import type { TrpcClient } from './client.js';
import type { ActionComment } from './types/comment.js';

export interface ActionCommentAddInput {
  actionId: string;
  content: string;
}

export interface ActionCommentUpdateInput {
  commentId: string;
  content: string;
}

export class ActionCommentsApi {
  constructor(private client: TrpcClient) {}

  async list(actionId: string): Promise<ActionComment[]> {
    return await this.client.actionComment.getComments.query({
      actionId,
    }) as ActionComment[];
  }

  async add(input: ActionCommentAddInput): Promise<ActionComment> {
    return await this.client.actionComment.addComment.mutate(input) as ActionComment;
  }

  async update(input: ActionCommentUpdateInput): Promise<ActionComment> {
    return await this.client.actionComment.updateComment.mutate(input) as ActionComment;
  }

  async delete(commentId: string): Promise<ActionComment> {
    return await this.client.actionComment.deleteComment.mutate({
      commentId,
    }) as ActionComment;
  }
}
