export type ProfilePhoto = {
  src: string;
  alt: string;
};

// Homepage portrait carousel. Add/remove/reorder photos here — the
// carousel adapts automatically. Source files live in
// public/images/profile/.
export const profilePhotos: ProfilePhoto[] = [
  {
    src: "/images/profile/portrait.png",
    alt: "Yash smiling and giving a thumbs up in his ASU graduation gown.",
  },
  {
    src: "/images/profile/IMG_1047.jpeg",
    alt: "Yash on a sunrise hike with Mt. Rainier glowing pink in the background.",
  },
  {
    src: "/images/profile/YASH_BYALEXLAURICE-5.jpeg",
    alt: "Yash making a peace sign in front of a giant \"2026\" sign at his ASU graduation.",
  },
  {
    src: "/images/profile/IMG_1226.jpeg",
    alt: "Yash with friends at a food market.",
  },
];
