import React, { useState } from 'react';
import { Post as PostComponent } from './Post';
import { Post, User } from '../types';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    userId: '2',
    username: 'petlover123',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=petlover123',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    caption: 'Meet my adorable cat Luna! 🐱✨',
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '3',
    username: 'dogwhisperer',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dogwhisperer',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    caption: 'Sunday funday with Max 🐕',
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  },
];

interface FeedProps {
  currentUser: User;
}

export const Feed: React.FC<FeedProps> = ({ currentUser }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const likes = post.likes.includes(currentUser.id)
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now().toString(),
          userId: currentUser.id,
          username: currentUser.username,
          content,
          createdAt: new Date().toISOString(),
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      {posts.map(post => (
        <PostComponent
          key={post.id}
          post={post}
          currentUser={currentUser}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </div>
  );
};