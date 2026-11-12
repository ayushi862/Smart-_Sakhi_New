
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const courses = [
  { id: 1, title: "Handmade Crafts Business", icon: "🧶" },
  { id: 2, title: "Digital Marketing Basics", icon: "📱" },
  { id: 3, title: "Financial Literacy", icon: "💰" },
  { id: 4, title: "Product Photography", icon: "📸" },
  { id: 5, title: "Start Your Own Business", icon: "🌱" },
  { id: 6, title: "Digital Payments and Safety", icon: "🔒" }
];

function readProgress(id) {
  try {
    const saved = JSON.parse(
      localStorage.getItem(`smartSakhiCourse_${id}`) || "{}"
    );

    const completed = saved.completedLessons || [];
    const totalLessons = 3;

    return {
      completedLessons: completed.length,
      progress: Math.min(
        100,
        Math.round((completed.length / totalLessons) * 100)
      ),
      quizScore: saved.quizSubmitted ? saved.quizScore : null,
      quizSubmitted: Boolean(saved.quizSubmitted),
      completed: completed.length >= totalLessons && Boolean(saved.quizSubmitted)
    };
  } catch {
    return {
      completedLessons: 0,
      progress: 0,
      quizScore: null,
      quizSubmitted: false,
      completed: false
    };
  }
}

export default function Dashboard() {
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const loadDashboard = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("smartSakhiEnrolled") || "[]"
        );
        setEnrolledIds(saved);
      } catch {
        setEnrolledIds([]);
      }

      const data = {};
      courses.forEach((course) => {
        data[course.id] = readProgress(course.id);
      });
      setProgressData(data);
    };

    loadDashboard();
    window.addEventListener("focus", loadDashboard);
    window.addEventListener("storage", loadDashboard);

    return () => {
      window.removeEventListener("focus", loadDashboard);
      window.removeEventListener("storage", loadDashboard);
    };
  }, []);

  const enrolledCourses = courses.filter((course) =>
    enrolledIds.includes(course.id)
  );

  const completedCount = enrolledCourses.filter(
    (course) => progressData[course.id]?.completed
  ).length;

  const lessonsCompleted = enrolledCourses.reduce(
    (total, course) =>
      total + (progressData[course.id]?.completedLessons || 0),
    0
  );

  const averageProgress = enrolledCourses.length
    ? Math.round(
        enrolledCourses.reduce(
          (total, course) =>
            total + (progressData[course.id]?.progress || 0),
          0
        ) / enrolledCourses.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-xl font-bold text-[#304632]">
            🌿 Smart Sakhi
          </Link>
          <div className="flex gap-4 text-sm font-semibold text-[#47764B]">
            <Link to="/">Home</Link>
            <Link to="/courses">Explore Courses</Link>
            <Link to="/marketplace">Marketplace</Link>
          </div>
        </nav>

        <section className="mt-10 rounded-3xl bg-[#E5F0DF] p-6 sm:p-10">
          <p className="font-semibold text-[#47764B]">
            YOUR LEARNING SPACE
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#304632] sm:text-4xl">
            Welcome to your Dashboard! 🌸
          </h1>
          <p className="mt-3 max-w-2xl text-gray-700">
            Every new skill brings you one step closer to growing your own business.
            Keep learning and keep moving forward.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-block rounded-xl bg-[#47764B] px-6 py-3 font-semibold text-white hover:bg-[#355E3B]"
          >
            Explore Courses →
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Enrolled Courses", value: enrolledCourses.length, icon: "📚" },
            { label: "Lessons Completed", value: lessonsCompleted, icon: "✅" },
            { label: "Courses Completed", value: completedCount, icon: "🏆" },
            { label: "Overall Progress", value: `${averageProgress}%`, icon: "🌱" }
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#E5F0DF] bg-white p-5 shadow-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="mt-3 text-sm text-gray-600">{item.label}</p>
              <p className="mt-1 text-3xl font-bold text-[#304632]">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[#304632]">
                My Learning
              </h2>
              <p className="mt-1 text-gray-600">
                Continue where you left off.
              </p>
            </div>
            <Link
              to="/courses"
              className="font-semibold text-[#47764B] hover:underline"
            >
              View All Courses →
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#B8D0B1] bg-white p-8 text-center">
              <div className="text-4xl">📖</div>
              <h3 className="mt-3 text-xl font-bold text-[#304632]">
                Start Your Learning Journey
              </h3>
              <p className="mx-auto mt-2 max-w-md text-gray-600">
                You haven't enrolled in any courses yet. Choose a course and
                start learning new skills today.
              </p>
              <Link
                to="/courses"
                className="mt-5 inline-block rounded-xl bg-[#47764B] px-5 py-3 font-semibold text-white"
              >
                Find Your First Course
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {enrolledCourses.map((course) => {
                const data = progressData[course.id] || {
                  completedLessons: 0,
                  progress: 0,
                  quizScore: null,
                  completed: false
                };

                return (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-[#E5F0DF] bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E5F0DF] text-3xl">
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[#304632]">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {data.completed
                            ? "Course completed 🎉"
                            : `${data.completedLessons} of 3 lessons completed`}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-600">
                        Learning Progress
                      </span>
                      <span className="font-bold text-[#47764B]">
                        {data.progress}%
                      </span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#E5F0DF]">
                      <div
                        className="h-full rounded-full bg-[#47764B] transition-all"
                        style={{ width: `${data.progress}%` }}
                      />
                    </div>

                    {data.quizScore !== null && data.quizScore !== undefined && (
                      <p className="mt-3 text-sm font-medium text-[#47764B]">
                        Quiz Score: {data.quizScore}
                      </p>
                    )}

                    <Link
                      to={`/courses/${course.id}`}
                      className="mt-5 block rounded-xl bg-[#47764B] px-4 py-3 text-center font-semibold text-white hover:bg-[#355E3B]"
                    >
                      {data.completed ? "Review Course" : "Continue Learning →"}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-[#E5F0DF] py-6 text-center text-sm text-gray-500">
          Keep growing, keep learning, keep shining. 🌿
          <p className="mt-1">Smart Sakhi — Empowering Women Entrepreneurs</p>
        </footer>
      </div>
    </div>
  );
}
