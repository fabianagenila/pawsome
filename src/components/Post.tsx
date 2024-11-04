import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { Post as PostType, User } from '../types';

interface PostProps {
  post: PostType;
  currentUser: User;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

export const Post: React.FC<PostProps> = ({ post, currentUser, onLike, onComment }) => {
  const [comment, setComment] = useState('');
  const isLiked = post.likes.includes(currentUser.id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      <div className="p-4 flex items-center">
        <img
          src={post.userAvatar}
          alt={post.username}
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-3 font-semibold">{post.username}</span>
      </div>

      <img
        src={post.imageUrl}
        alt="Post"
        className="w-full aspect-square object-cover"
      />

      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-1 ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes.length}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <MessageCircle className="w-6 h-6" />
            <span>{post.comments.length}</span>
          </button>
        </div>

        <p className="mb-2">
          <span className="font-semibold">{post.username}</span>{' '}
          {post.caption}
        </p>

        <div className="space-y-2">
          {post.comments.map((comment) => (
            <p key={comment.id} className="text-sm">
              <span className="font-semibold">{comment.username}</span>{' '}
              {comment.content}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmitComment} className="mt-4 flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="text-pink-500 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};