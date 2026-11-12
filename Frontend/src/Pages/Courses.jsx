
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialCourses = [
  {
    id: 1,
    icon: "🧵",
    category: "Handicrafts",
    title: "Handmade Crafts Business",
    description:
      "Learn to make handmade products and turn your creativity into a business.",
    level: "Beginner",
    duration: "3 weeks",
  },
  {
    id: 2,
    icon: "📱",
    category: "Marketing",
    title: "Digital Marketing Basics",
    description:
      "Learn to promote your products using social media and online platforms.",
    level: "Beginner",
    duration: "2 weeks",
  },
  {
    id: 3,
    icon: "💰",
    category: "Finance",
    title: "Financial Literacy",
    description:
      "Understand pricing, budgeting, savings and basic business finances.",
    level: "Beginner",
    duration: "2 weeks",
  },
  {
    id: 4,
    icon: "📸",
    category: "Marketing",
    title: "Product Photography",
    description:
      "Take attractive product photos using your smartphone.",
    level: "Beginner",
    duration: "1 week",
  },
  {
    id: 5,
    icon: "🛍️",
    category: "Business",
    title: "Start Your Own Business",
    description:
      "Learn business planning, customer handling and product selling.",
    level: "Intermediate",
    duration: "4 weeks",
  },
  {
    id: 6,
    icon: "💻",
    category: "Business",
    title: "Digital Payments and Safety",
    description:
      "Understand digital payments and essential online safety practices.",
    level: "Beginner",
    duration: "1 week",
  },
];

const categories = [
  "All Courses",
  "Handicrafts",
  "Marketing",
  "Finance",
  "Business",
];

export default function Courses() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState("All Courses");

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const filteredCourses =
    selectedCategory === "All Courses"
      ? initialCourses
      : initialCourses.filter(
          (course) => course.category === selectedCategory
        );

  const handleEnroll = (courseId) => {
    setEnrolledCourses((previous) =>
      previous.includes(courseId)
        ? previous
        : [...previous, courseId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-[#304632]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eee5db] bg-white px-5 py-4 md:px-12">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-[#355E3B]"
        >
          🌿 Smart Sakhi
        </button>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full border border-[#47764B] px-5 py-2 text-sm font-semibold text-[#47764B]"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-[#47764B] px-5 py-2 text-sm font-semibold text-white"
          >
            Home
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-12 md:py-14">
        <section className="rounded-3xl bg-[#E5F0DF] p-7 md:p-10">
          <p className="font-semibold text-[#47764B]">
            🌸 LEARN • CREATE • GROW
          </p>

          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Learn Skills. Build Your Business.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Explore practical courses designed to help women entrepreneurs
            develop new skills and grow their businesses at their own pace.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white px-4 py-2">
              📚 6 Learning Courses
            </span>
            <span className="rounded-full bg-white px-4 py-2">
              🌱 Beginner Friendly
            </span>
            <span className="rounded-full bg-white px-4 py-2">
              ⭐ Learn at Your Pace
            </span>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Explore Courses</h2>

          <p className="mt-2 text-gray-600">
            Choose a category to find the right course for you.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "border-[#47764B] bg-[#47764B] text-white"
                    : "border-[#dce5d5] bg-white text-[#355E3B] hover:bg-[#E5F0DF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course.id);

            return (
              <article
                key={course.id}
                className="flex flex-col rounded-3xl border border-[#eee5db] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4E7D9] text-3xl">
                    {course.icon}
                  </div>

                  <span className="rounded-full bg-[#E5F0DF] px-3 py-1 text-xs font-semibold text-[#355E3B]">
                    {course.level}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {course.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                  {course.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#eee5db] pt-4 text-sm text-gray-500">
                  <span>⏱ {course.duration}</span>
                  <span>{course.category}</span>
                </div>

                <button
                  onClick={() => handleEnroll(course.id)}
                  className={`mt-5 w-full rounded-xl px-5 py-3 font-semibold transition ${
                    isEnrolled
                      ? "border border-[#47764B] bg-[#E5F0DF] text-[#355E3B]"
                      : "bg-[#47764B] text-white hover:bg-[#355E3B]"
                  }`}
                >
                  {isEnrolled ? "✓ Enrolled" : "Enroll Now →"}
                </button>

                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="mt-3 w-full rounded-xl border border-[#47764B] px-5 py-3 font-semibold text-[#355E3B] transition hover:bg-[#E5F0DF]"
                >
                  View Course & Lessons →
                </button>
              </article>
            );
          })}
        </section>

        <section className="mt-12 rounded-3xl border border-[#eee5db] bg-white p-7 text-center md:p-10">
          <div className="text-4xl">🌻</div>

          <h2 className="mt-4 text-2xl font-bold">
            Every Skill Is a New Opportunity
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            Start learning today and take one step closer to building your
            own successful business.
          </p>

          <button
            onClick={() => navigate("/marketplace")}
            className="mt-6 rounded-full bg-[#47764B] px-7 py-3 font-semibold text-white hover:bg-[#355E3B]"
          >
            Explore Marketplace →
          </button>
        </section>
      </main>

      <footer className="border-t border-[#eee5db] bg-white px-5 py-6 text-center text-sm text-gray-500">
        © 2026 Smart Sakhi · Learn, Create and Grow Together 🌿
      </footer>
    </div>
  );
}
