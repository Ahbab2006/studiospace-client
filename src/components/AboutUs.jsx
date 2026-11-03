
const features = [
  {
    icon: "🏢",
    title: "Quality Studio Spaces",
    description:
      "Discover creative spaces for photography, video production, events, and more.",
  },
  {
    icon: "📅",
    title: "Easy Online Booking",
    description:
      "Explore studios, choose your preferred schedule, and submit booking requests easily.",
  },
  {
    icon: "🔒",
    title: "Reliable Booking",
    description:
      "Track your booking requests and stay updated on their confirmation status.",
  },
];

export default function AboutUs() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white px-4 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="font-semibold uppercase tracking-wider text-indigo-600">
              About StudioSpace
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Your Space, Your Creativity
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              StudioSpace connects creators and professionals
              with creative studio spaces. Whether you are a
              photographer, content creator, or event organizer,
              discover and book the perfect space for your next project.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Our mission is to make finding and booking creative
              spaces simple, convenient, and accessible.
            </p>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-3xl bg-indigo-50 p-10">
            <div className="text-center">
              <span className="text-8xl">🎬</span>
              <h3 className="mt-5 text-2xl font-bold text-indigo-700">
                Create Without Limits
              </h3>
              <p className="mt-2 text-gray-600">
                Find the space that inspires your creativity.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
