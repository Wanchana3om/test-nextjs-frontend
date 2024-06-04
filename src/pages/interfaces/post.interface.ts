interface UserInterface {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentInterface {
  id: string;
  message: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  user?: UserInterface;
}

export default interface PostInterface {
  id: string;
  title: string;
  content: string;
  communityType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: UserInterface;
  comments: CommentInterface[];
}
