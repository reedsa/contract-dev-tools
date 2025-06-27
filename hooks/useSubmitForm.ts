"use client"; // This hook uses client-side state, so it must be in a client component file.

import { useState, useCallback } from "react";

/**
 * Defines the structure of the object returned upon successful or failed submission.
 */
interface SubmitResult {
  success: boolean;
  message?: string;
}

/**
 * Defines the structure of the object returned by the hook itself.
 */
interface UseSubmitFormReturn {
  submit: (formData: any) => Promise<SubmitResult>; // The function to call to trigger submission.
  isLoading: boolean; // A boolean to indicate if the submission is in progress.
  error: string | null; // A string to hold any error message.
}

/**
 * A custom hook to manage the state and logic for submitting a form to an API endpoint.
 * @param apiEndpoint - The URL of the API endpoint to which the form will be submitted.
 */
export function useSubmitForm(apiEndpoint: string): UseSubmitFormReturn {
  // State to track if the API request is currently in flight.
  // This is useful for disabling the submit button to prevent double-submissions.
  const [isLoading, setIsLoading] = useState(false);

  // State to store any error message that occurs during the submission process.
  // This can be displayed to the user in the UI.
  const [error, setError] = useState<string | null>(null);

  /**
   * The core submission function. It's wrapped in `useCallback` to ensure it has a stable
   * reference across re-renders, which is a performance optimization.
   *
   * It accepts the form data, sends it to the specified API endpoint, and manages state.
   */
  const submit = useCallback(
    async (formData: any): Promise<SubmitResult> => {
      // 1. Reset state before starting a new submission.
      setIsLoading(true);
      setError(null);

      try {
        // 2. Make the API request using the native `fetch` API.
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        // 3. Check if the HTTP response status is not successful (e.g., 400, 404, 500).
        if (!response.ok) {
          // Try to parse the error message from the server's response body.
          const errorData = await response
            .json()
            .catch(() => ({ message: "An unknown error occurred." }));
          // Throw an error to be caught by the `catch` block below.
          throw new Error(
            errorData.message || `Request failed with status ${response.status}`
          );
        }

        // 4. If the submission was successful, return a success result.
        return { success: true };
      } catch (err: any) {
        // 5. If any error occurred (network failure or thrown error from above), update the error state.
        setError(err.message);
        // Return a failure result, including the error message.
        return { success: false, message: err.message };
      } finally {
        // 6. No matter what happens (success or failure), always set loading back to false.
        setIsLoading(false);
      }
    },
    [apiEndpoint]
  ); // The function will only be recreated if the apiEndpoint changes.

  // 7. Return the state variables and the submit function so the component can use them.
  return { submit, isLoading, error };
}
