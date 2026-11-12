
import { Routes, Route, useNavigate } from "react-router-dom";
import handcraftHero from "./assets/handcraft-hero.png";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Courses from "./Pages/Courses";
import CoursesDetail from "./Pages/CoursesDetail";
import Marketplace from "./Pages/Marketplace";

import LanguageSwitcher from "./Components/LanguageSwitcher";
import { useLanguage } from "./Context/LanguageContext";

import VerifyOtp from "./Pages/VerifyOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    {
      icon: "🧵",
      title: t("handmadeCrafts"),
      desc: t("handmadeDesc"),
      color: "bg-[#F9E5D9]",
    },
    {
      icon: "👗",
      title: t("clothingFashion"),
      desc: t("clothingDesc"),
      color: "bg-[#E5EBD9]",
    },
    {
      icon: "🍯",
      title: t("homemadeFoods"),
      desc: t("foodsDesc"),
      color: "bg-[#F6EACB]",
    },
    {
      icon: "🌿",
      title: t("beautyWellness"),
      desc: t("beautyDesc"),
      color: "bg-[#E9E1F2]",
    },
  ];

  const benefits = [
    {
      icon: "📚",
      title: t("learnSkills"),
      desc: t("learnSkillsDesc"),
    },
    {
      icon: "📸",
      title: t("photoStudio"),
      desc: t("photoStudioDesc"),
    },
    {
      icon: "💰",
      title: t("growBusinessTitle"),
      desc: t("growBusinessDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-[#304632]">
      <nav className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#eee5db] bg-white/95 px-5 py-4 backdrop-blur md:px-12">
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F0DF] text-2xl">
            🌿
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#355E3B]">
              Smart Sakhi
            </h1>
            <p className="text-xs text-gray-500">
              {t("learnCreateEarn")}
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="#home" className="text-[#47764B]">
            {t("home")}
          </a>
          <a href="#explore" className="hover:text-[#47764B]">
            {t("explore")}
          </a>
          <a href="#learn" className="hover:text-[#47764B]">
            {t("learn")}
          </a>
          <a href="#marketplace" className="hover:text-[#47764B]">
            {t("marketplace")}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <button
            onClick={() => navigate("/login")}
            className="rounded-full bg-[#47764B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#355E3B]"
          >
            {t("login")}
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full border border-[#47764B] px-4 py-2.5 text-sm font-semibold text-[#47764B] hover:bg-[#E5F0DF]"
          >
            Dashboard
          </button>
        </div>
      </nav>

      <main id="home">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-12 md:py-20">
          <div>
            <span className="inline-block rounded-full bg-[#E5F0DF] px-4 py-2 text-sm font-medium text-[#47764B]">
              ✨ {t("heroBadge")}
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {t("heroLine1")}
              <br />
              {t("heroLine2")}
              <br />
              <span className="text-[#D78369]">
                {t("heroLine3")}
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 md:text-lg">
              {t("heroDescription")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/courses")}
                className="rounded-full bg-[#47764B] px-7 py-3.5 font-semibold text-white shadow-md hover:bg-[#355E3B]"
              >
                {t("startJourney")} →
              </button>

              <button
                onClick={() => navigate("/marketplace")}
                className="rounded-full border border-[#47764B] bg-white px-7 py-3.5 font-semibold text-[#47764B] hover:bg-[#E5F0DF]"
              >
                {t("exploreMarketplace")}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
              <span>✓ {t("learnAtPace")}</span>
              <span>✓ {t("growBusiness")}</span>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-[#eadfd4] pt-6">
              <div className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFF9F4] bg-[#F3D9C7]">
                  👩🏽
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFF9F4] bg-[#E0E9D7]">
                  👩🏻
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFF9F4] bg-[#F3E6B8]">
                  👩🏾
                </span>
              </div>

              <p className="text-sm text-gray-600">
                <strong className="text-[#355E3B]">
                  {t("communityTitle")}
                </strong>
                <br />
                {t("communityDescription")}
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-4 top-8 h-28 w-28 rounded-full bg-[#F5D8C8] opacity-70 blur-2xl" />
            <div className="absolute -bottom-4 right-0 h-36 w-36 rounded-full bg-[#DCE9D4] opacity-80 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white bg-[#F4E7D9] p-3 shadow-xl md:p-5">
              <img
                src={handcraftHero}
                alt={t("handmadeCrafts")}
                className="h-[350px] w-full rounded-[1.5rem] object-cover md:h-[470px]"
              />

              <div className="absolute right-0 top-8 rotate-3 rounded-2xl bg-[#FFF3DF] px-4 py-3 shadow-lg md:-right-4">
                <p className="font-semibold text-[#355E3B]">
                  {t("handmadeLove")}
                </p>
                <p className="text-center text-lg">🪡 🌸</p>
              </div>

              <div className="absolute bottom-8 left-0 rounded-2xl bg-white p-4 shadow-lg md:-left-8">
                <p className="text-sm text-gray-500">
                  {t("yourPotential")}
                </p>
                <p className="mt-1 font-bold text-[#355E3B]">
                  {t("learnCreateEarn")} 🌿
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="explore"
          className="bg-white px-6 py-16 md:px-12 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D78369]">
                {t("passionPath")}
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                {t("createTitle")}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                {t("createDescription")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.title}
                  onClick={() => navigate("/marketplace")}
                  className="group rounded-3xl border border-[#f0e7dd] bg-[#FFF9F4] p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${category.color}`}
                  >
                    {category.icon}
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {category.desc}
                  </p>

                  <span className="mt-5 inline-block text-sm font-semibold text-[#47764B]">
                    {t("exploreMore")} →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="learn" className="px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-end gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D78369]">
                  {t("everythingPlace")}
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                  {t("ideasGrow")}
                </h2>
              </div>

              <p className="leading-7 text-gray-600">
                {t("learningDescription")}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-3xl border border-[#eee4d8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F0DF] text-2xl">
                    {benefit.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {benefit.desc}
                  </p>

                  <button
                    onClick={() => navigate("/courses")}
                    className="mt-5 font-semibold text-[#47764B]"
                  >
                    {t("discoverMore")} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="marketplace"
          className="px-6 pb-20 md:px-12"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#355E3B] p-8 text-white md:flex-row md:items-center md:p-14">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DDE9D5]">
                {t("marketplaceTitle")}
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                {t("beautifulMade")}
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                {t("marketplaceDescription")}
              </p>
            </div>

            <button
              onClick={() => navigate("/marketplace")}
              className="shrink-0 rounded-full bg-white px-7 py-3.5 font-semibold text-[#355E3B] hover:bg-[#E5F0DF]"
            >
              {t("exploreProducts")} →
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#eee5db] bg-white px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold text-[#355E3B]">
              🌿 Smart Sakhi
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {t("learnCreateEarn")}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {t("footerDescription")} © 2026 Smart Sakhi
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CoursesDetail />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
