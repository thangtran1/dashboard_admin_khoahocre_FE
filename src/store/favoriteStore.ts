export interface Course {
  id: string;
  title: string;
  subTitle?: string;
  image: string;
  oldPrice?: string | number;
  price: string | number;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: Course[];
  addFavorite: (course: Course) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (course) => {
        const exists = get().favorites.find((item) => item.id === course.id);
        if (!exists) {
          set({ favorites: [...get().favorites, course] });
        }
      },
      removeFavorite: (id) => {
        set({
          favorites: get().favorites.filter((item) => item.id !== id),
        });
      },
    }),
    {
      name: "favorite-courses", // key trong localStorage
    }
  )
);
