export const API = "http://localhost:5000/api";

export const ENDPOINTS = {
    CONTESTS: "/contest",
    REGISTER: "/participant/register",
    START_LEVEL: "/level/start",
    SUBMIT_CODE: "/submission/submit",
    LEADERBOARD: (contestId: string) => `/leaderboard/${contestId}`,
    QUESTION: (questionId: string) => `/question/${questionId}`,
    PARTICIPANTS: (contestId: string) => `/participant/${contestId}`,
};
