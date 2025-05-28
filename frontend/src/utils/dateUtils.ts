// frontend/src/utils/dateUtils.ts
export const dateUtils = {
  // Format date for display
  formatDisplay: (dateString: string): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  },

  // Format date for input field
  formatForInput: (dateString: string): string => {
    return new Date(dateString).toISOString().split("T")[0];
  },

  // Get today's date in YYYY-MM-DD format
  getTodayString: (): string => {
    return new Date().toISOString().split("T")[0];
  },

  // Check if date is today
  isToday: (dateString: string): boolean => {
    const today = new Date().toDateString();
    const date = new Date(dateString).toDateString();
    return today === date;
  },

  // Check if date is this week
  isThisWeek: (dateString: string): boolean => {
    const today = new Date();
    const date = new Date(dateString);
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    return date >= startOfWeek && date <= endOfWeek;
  },

  // Check if date is this month
  isThisMonth: (dateString: string): boolean => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  },

  // Get relative time string (e.g., "2 days ago")
  getRelativeTime: (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  },
};
