'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';
import css from './EditProfilePage.module.css';

export default function ProfileEditPage() {
  const router = useRouter();

  const setUser = useAuthStore(s => s.setUser); 


  const [user, setLocalUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      setLocalUser(data);
      setUsername(data.username);
    };
    fetchUser();
  }, []);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    const updatedUser = await updateMe({ username });

    setUser(updatedUser); 
    router.push('/profile');
    router.refresh();
  };

  const handleCancel = () => router.push('/profile');

  if (!user) return <div className={css.loader}>Loading...</div>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || 'https://ac.goit.global/fullstack/react/avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
