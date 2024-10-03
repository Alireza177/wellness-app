interface User {
    fullname: string;
    age: number;
    weight: number;
    height: number;
    images: string[];
    waterintakes: number[];
    mood: string[];
    dailySteps: number[];
    workouts: string[];
}

export const user: User =
{
    fullname: "Charlie Brown",
    age: 22,
    weight: 70.8,
    height: 175.0,
    images: ["https://th.bing.com/th/id/OIP.OEw5PzxzFp4eOmKQUp6Q-AAAAA?rs=1&pid=ImgDetMain"],
    waterintakes: [2.8],
    mood: ["Energetic", "Happy", "Relaxed", "Focused", "Motivated", "Calm", "Excited", "Content", "Optimistic", "Peaceful", "Inspired"],
    dailySteps: [12000],
    workouts: ["Cycling", "Running", "Swimming", "Yoga", "Weightlifting", "Hiking", "Dancing", "Pilates", "Boxing", "Rowing", "Jump Rope"]
};