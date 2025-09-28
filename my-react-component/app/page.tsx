import Link from "next/link";

// Define the available components for interview practice
const interviewComponents = [
  {
    name: "Todo List",
    route: "/todo-list",
    description: "A todo list",
    difficulty: "Beginner" // Beginner, Intermediate, else
  },

  {
    name: "Timer",
    route: "/timer",
    description:"",
    difficulty: "Beginner"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            React Server Components Interview Practice
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Practice building server-side React components for technical interviews.
            Focus on the Todo List component with isolated route, API, and utilities.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          {interviewComponents.map((component) => (
            <Link
              key={component.route}
              href={component.route}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {component.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  component.difficulty === 'Beginner'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : component.difficulty === 'Intermediate'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {component.difficulty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {component.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                <span>View Component</span>
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Built with Next.js App Router and Server Components</p>
        </footer>
      </div>
    </div>
  );
}
