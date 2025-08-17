// This file contains utility functions for formatting data (numbers, dates, etc.)

export const formatNumber = (num: number): string => {
  return num.toLocaleString(); // Example: Format with local separators
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString(); // Example: Format date based on locale
};

export const formatTimeAgo = (date: Date): string => {
  // Example: Implement logic to show time ago (e.g., '2 hours ago', '3 days ago')
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';

  return Math.floor(seconds) + ' seconds ago';
};

// Add other formatting functions as needed

console.log('Formatters utilities file created');