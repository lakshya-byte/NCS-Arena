export interface Contest {
    _id: string;
    title: string;
    description: string;
    levels: number[];
    questions: { level: number; questionId: string }[];
    startTime: string;
    endTime: string;
    isActive?: boolean;
    createdAt?: string;
}

export interface Participant {
    _id: string;
    contestId: string;
    name: string;
    rollNo: string;
    branch?: string;
    year?: string;
    levelsPassed: number;
    totalTime: number;
    status: "active" | "disqualified";
}

export interface Submission {
    _id: string;
    participantId: string;
    contestId: string;
    level: number;
    questionId?: string;
    html: string;
    css: string;
    js: string;
    result: "accepted" | "rejected" | "pending";
    submittedAt: string;
}

export interface LevelAttempt {
    _id: string;
    participantId: string;
    contestId: string;
    level: number;
    startTime: string;
    autoResult?: "accepted" | "rejected" | "pending";
    adminResult?: "accepted" | "rejected" | null;
}
