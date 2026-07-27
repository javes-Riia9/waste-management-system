/**
 * Helper to trigger browser Vibration API for tactile haptic feedback on button clicks.
 * @param pattern Duration in ms (number) or vibration pattern array (number[])
 */
export const triggerVibration = (pattern: number | number[] = 30) => {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration failures if unsupported or blocked by browser policy
    }
  }
};
