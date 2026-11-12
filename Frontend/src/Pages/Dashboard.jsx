
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const courses = [
  { id: 1, title: "Handmade Crafts Business", category: "Handmade Crafts", icon: "🧶", description: "Learn to create and sell handmade products." },
  { id: 2, title: "Digital Marketing Basics", category: "Digital Skills", icon: "📱", description: "Promote your products online and reach customers." },
  { id: 3, title: "Financial Literacy", category: "Finance", icon: "💰", description: "Learn saving, budgeting and money management." },
  { id: 4, title: "Product Photography", category: "Creative Skills", icon: "📸", description: "Take attractive photos of your products." },
  { id: 5, title: "Start Your Own Business", category: "Entrepreneurship", icon: "🌱", description: "Learn the basics of starting a small business." },
  { id: 6, title: "Digital Payments and Safety", category: "Digital Skills", icon: "🔒", description: "Learn safe online payments and digital security." }
];

export default function Courses() {
  const [enrolled, setEnrolled] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("smartSakhiEnrolled") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("smartSakhiEnrolled", JSON.stringify(enrolled));
  }, [enrolled]);

  const enroll = (id) => {
    setEnrolled((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="font-semibold text-[#47764B]">
          ← Back to Home
        </Link>

        <div className="mb-8 mt-6">
          <p className="font-semibold text-[#47764B]">LEARN • GROW • EARN</p>
          <h1 className="mt-2 text-3xl font-bold text-[#304632] sm:text-4xl">
            Explore Courses 🌿
          </h1>
          <p className="mt-3 text-gray-600">
            Build new skills and take the next step towards your business.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col rounded-2xl border border-[#E5F0DF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F0DF] text-3xl">
                {course.icon}
              </div>

              <p className="text-sm font-semibold text-[#47764B]">
                {course.category}
              </p>

              <h2 className="mt-2 text-xl font-bold text-[#304632]">
                {course.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                {course.description}
              </p>

              <button
                onClick={() => enroll(course.id)}
                disabled={enrolled.includes(course.id)}
                className="mt-5 rounded-xl bg-[#47764B] px-4 py-3 font-semibold text-white transition hover:bg-[#355E3B] disabled:cursor-default disabled:bg-[#E5F0DF] disabled:text-[#304632]"
              >
                {enrolled.includes(course.id) ? "✓ Enrolled" : "Enroll Now"}
              </button>

              <Link
                to={`/courses/${course.id}`}
                className="mt-3 text-center font-semibold text-[#47764B] hover:underline"
              >
                View Course & Lessons →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="font-semibold text-[#47764B] hover:underline"
          >
            Go to My Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
