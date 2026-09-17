import Link from "next/link";

export const dynamic = 'force-dynamic';

interface CompletePageProps {
  params: {
    token: string;
  };
}

export default function CompletePage({ params }: CompletePageProps) {
  return (
    <div className="min-h-screen bg-gray-light dark:bg-gray-dark">
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
            Thank You!
          </h1>
          <p className="mb-2 text-xl text-body-color dark:text-body-color-dark">
            Your assessment has been submitted successfully.
          </p>
          <p className="mb-8 text-body-color dark:text-body-color-dark">
            We&apos;ll review your submission and reach out to you soon.
          </p>

          {/* Information Card */}
          <div className="mb-8 rounded-lg bg-white p-8 shadow-lg dark:bg-dark">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
              What happens next?
            </h2>
            <ul className="space-y-3 text-left text-body-color dark:text-body-color-dark">
              <li className="flex items-start">
                <svg
                  className="mr-3 mt-1 h-5 w-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Your assessment will be reviewed by our hiring team
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-3 mt-1 h-5 w-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                AI insights will help us evaluate your fit for the role
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-3 mt-1 h-5 w-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                You&apos;ll hear back from us within 5-7 business days
              </li>
            </ul>
          </div>

          {/* Additional Actions */}
          <div className="space-y-4">
            <p className="text-sm text-body-color dark:text-body-color-dark">
              Need to make changes? This link will expire in 24 hours.
            </p>
            <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/"
                className="rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:bg-opacity-90"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

