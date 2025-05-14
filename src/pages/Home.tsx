import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
    setAnnouncement(localStorage.getItem('announcement') || '');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {announcement && (
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-700">{announcement}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <Link to={`/post/${post.id}`} className="block">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-gray-600 line-clamp-3">{post.content.substring(0, 150)}...</p>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <div className="text-center text-gray-500">
            Nenhuma postagem ainda. Fique ligado!
          </div>
        )}
      </div>
    </div>
  );
}