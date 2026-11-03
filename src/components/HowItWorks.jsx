
const steps = [
  {
    number: "01",
    title: "Explore Studios",
    description:
      "Browse our collection of creative studios and find the perfect space for your project.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Choose Your Schedule",
    description:
      "Select your preferred booking date, starting time, and ending time.",
    icon: "📅",
  },
  {
    number: "03",
    title: "Submit Your Booking",
    description:
      "Send your booking request and wait for the studio owner's confirmation.",
    icon: "📝",
  },
  {
    number: "04",
    title: "Enjoy Your Studio",
    description:
      "Once your booking is confirmed, get ready to enjoy your creative space.",
    icon: "🎉",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-gray-50 px-4 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-semibold text-indigo-600">
            SIMPLE BOOKING PROCESS
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            How It Works
          </h2>

          <p className="mt-4 text-gray-600">
            Booking your perfect creative space is simple.
            Follow these four easy steps to get started.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{step.icon}</span>

                <span className="text-3xl font-bold text-indigo-100">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
