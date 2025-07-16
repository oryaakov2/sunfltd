/**
 * Formats a date string into a human-readable label.
 * Returns 'Today' if the date is today, 'Tomorrow' if the date is tomorrow,
 * or a formatted string like 'Mon, Jan 1' otherwise.
 *
 * @param dateString - The date string to format (ISO format recommended).
 * @returns A human-readable string representing the date.
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  else {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
};