"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


export default function Profile() {
  const router = useRouter();

  // Mock User Data
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    profilePic: '/default-avatar.png', // Placeholder image
  });

  const handleEditProfile = () => {
    alert('Edit Profile clicked!');
    // In a real app, navigate to an edit profile page
    // router.push('/profile/edit');
  };

  const handleLogout = () => {
    alert('Logged out!');
    // In a real app, clear authentication tokens/session
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
    
      <main className="flex-grow p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-pink-500 mb-6">Profil Pengguna</h1>

          <div className="mb-6 flex justify-center">
            {/* TODO: Add actual user profile image */}
            <Image
              src={user.profilePic}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-pink-200"
            />
          </div>

          <div className="mb-6 space-y-2">
            <p className="text-2xl font-semibold text-gray-800">{user.name}</p>
            <p className="text-lg text-gray-600">{user.email}</p>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={handleEditProfile}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Edit Profil
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
  
    </div>
  );
}