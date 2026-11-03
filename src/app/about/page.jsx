
// const features = [
//   {
//     icon: "🏢",
//     title: "Quality Studio Spaces",
//     description:
//       "Discover creative spaces designed for photography, video production, events, and more.",
//   },
//   {
//     icon: "📅",
//     title: "Easy Online Booking",
//     description:
//       "Find your preferred studio, choose a schedule, and submit your booking request easily.",
//   },
//   {
//     icon: "🔒",
//     title: "Reliable Booking Process",
//     description:
//       "Our booking process helps users manage their requests and track booking status.",
//   },
//   {
//     icon: "✨",
//     title: "Creative Opportunities",
//     description:
//       "We make it easier for creators and professionals to find spaces for their next projects.",
//   },
// ];

// export default function AboutPage() {
//   return (
//     <main className="min-h-screen bg-white">
//       {/* Hero */}
//       <section className="bg-indigo-600 px-4 py-20 text-center text-white">
//         <div className="mx-auto max-w-3xl">
//           <span className="font-semibold uppercase tracking-widest text-indigo-200">
//             About StudioSpace
//           </span>

//           <h1 className="mt-4 text-4xl font-bold md:text-5xl">
//             Your Space, Your Creativity
//           </h1>

//           <p className="mt-5 text-lg leading-8 text-indigo-100">
//             StudioSpace helps you discover and book creative spaces
//             for photography, content creation, events, and more.
//           </p>
//         </div>
//       </section>

//       {/* Mission */}
//       <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center">
//         <div>
//           <span className="font-semibold text-indigo-600">
//             WHO WE ARE
//           </span>

//           <h2 className="mt-3 text-3xl font-bold text-gray-900">
//             Making Studio Booking Simple
//           </h2>

//           <p className="mt-5 leading-8 text-gray-600">
//             StudioSpace is a platform designed to connect people
//             with creative studio spaces. Whether you are a
//             photographer, content creator, or event organizer,
//             you can explore available studios and submit booking
//             requests in one place.
//           </p>

//           <p className="mt-4 leading-8 text-gray-600">
//             Our goal is to make finding and booking the right
//             creative space easier and more convenient.
//           </p>
//         </div>

//         <div className="flex min-h-72 items-center justify-center rounded-3xl bg-indigo-50 p-10">
//           <div className="text-center">
//             <span className="text-8xl">🎬</span>
//             <h3 className="mt-5 text-2xl font-bold text-indigo-700">
//               Create Without Limits
//             </h3>
//             <p className="mt-2 text-gray-600">
//               Find the space that inspires your creativity.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="bg-gray-50 px-4 py-20">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-12 text-center">
//             <span className="font-semibold text-indigo-600">
//               WHY CHOOSE US
//             </span>

//             <h2 className="mt-3 text-3xl font-bold text-gray-900">
//               What Makes StudioSpace Special?
//             </h2>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {features.map((feature) => (
//               <div
//                 key={feature.title}
//                 className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
//               >
//                 <span className="text-4xl">{feature.icon}</span>

//                 <h3 className="mt-5 text-xl font-bold text-gray-900">
//                   {feature.title}
//                 </h3>

//                 <p className="mt-3 leading-7 text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Closing */}
//       <section className="px-4 py-20 text-center">
//         <h2 className="text-3xl font-bold text-gray-900">
//           Let s Create Something Amazing
//         </h2>

//         <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
//           Find your ideal creative space and take the next step
//           toward bringing your ideas to life.
//         </p>
//       </section>
//     </main>
//   );
// }
