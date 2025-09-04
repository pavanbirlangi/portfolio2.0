import { ContainerScroll, CardSticky } from "@/components/blocks/cards-stack"

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Frontend Development",
    description:
      "Using frameworks like React and Next.js, I create responsive, sleek, and highly interactive interfaces. Every detail, from transitions to accessibility, is designed to improve the user experience.",
  },
  {
    id: "process-2",
    title: "Backend Systems",
    description:
      "I build strong foundations with Node.js and Express. APIs, authentication, and performance optimizations are crafted to support real-world applications at scale with speed and security in mind.",
  },
  {
    id: "process-3",
    title: "Databases That Scale",
    description:
      "With experience in MongoDB and PostgreSQL, I design database architectures that can handle growing amounts of data. Each schema is optimized for performance, reliability, and easy future expansion.",
  },
  {
    id: "process-4",
    title: "Cloud & Deployment",
    description:
      "AWS, Docker, and CI/CD pipelines ensure smooth deployments and reliable hosting. This means projects remain stable, resilient, and accessible across all devices.",
  },
  {
    id: "process-5",
    title: "AI & Integrations",
    description:
      "From OpenAI-powered insights to API-driven automation, I integrate smart tools into products. This opens doors to innovation while keeping solutions practical and business-ready.",
  },
]

const Process = () => {
  return (
    <div className="container min-h-svh place-content-center bg-transparent px-6 pb-24 text-gray-300 xl:px-12">
      <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
        <div className="left-0 top-0 md:sticky md:top-24 md:h-fit md:py-12">
          <h5 className="text-xs md:text-sm uppercase tracking-wide font-sans">The Tools I Trust</h5>
          <h2 className="mb-6 mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight font-fira">
            A modern toolkit that helps me build projects
          </h2>
          <p className="max-w-prose text-base md:text-lg font-sans">
          Building great products requires more than just creativity — it requires the right set of tools.
From frontend frameworks to cloud deployment, I rely on a modern, battle-tested stack that ensures
speed, scalability, and reliability for every project I work on.
          </p>
        </div>
        <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
          {PROCESS_PHASES.map((phase, index) => (
            <CardSticky
              key={phase.id}
              index={index + 2}
              incrementY={30}
              className="rounded-2xl border p-8 shadow-md backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="my-6 text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter font-fira">
                  {phase.title}
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-400 font-fira">
                  {String(index + 1).padStart(2, "0")}
                </h3>
              </div>

              <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed">{phase.description}</p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </div>
  )
}

export { Process }
