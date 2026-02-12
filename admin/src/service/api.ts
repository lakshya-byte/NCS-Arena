/* ─── Admin API Endpoints ─── */

export const API = {
    // Contests
    GET_CONTESTS: "/contest",
    CREATE_CONTEST: "/contest/create",

    // Question pools (admin only — for Create Contest dropdowns)
    QUESTION_POOLS: "/admin/question-pool",

    // Participants (enriched with LevelAttempt data)
    LIST_PARTICIPANTS: (contestId: string) =>
        `/admin/participant/${contestId}`,

    // Submissions (code viewer)
    LIST_SUBMISSIONS: (contestId: string, participantId: string) =>
        `/admin/${contestId}/${participantId}`,

    // Actions
    DISQUALIFY: (participantId: string) =>
        `/admin/participant/${participantId}/disqualify`,

    OVERRIDE_ATTEMPT: (attemptId: string) =>
        `/admin/attempt/${attemptId}/override`,
};
