import { ContainerScroll, CardSticky } from "@/components/blocks/cards-stack"

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Research and Analysis",
    description:
      "With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences. This informed approach ensures your website stands out and provides an excellent user experience.",
  },
  {
    id: "process-2",
    title: "Wireframing and Prototyping",
    description:
      "We move on to Wireframing and Prototyping, where we create skeletal representations of your website's pages. These visual indigoprints allow us to test and refine the user experience before diving into design.",
  },
  {
    id: "process-3",
    title: "Design Creation",
    description:
      "Now, it's time for the Design Creation phase. Our talented designers bring your vision to life. We focus on aesthetics, ensuring your website not only looks stunning but also aligns perfectly with your brand identity.",
  },
  {
    id: "process-4",
    title: "Development and Testing",
    description:
      "In the Development and Testing phase, our skilled developers turn designs into a fully functional website. Rigorous testing ensures everything works seamlessly, providing an exceptional user experience.",
  },
  {
    id: "process-5",
    title: "Launch and Support",
    description:
      "Our commitment continues beyond launch. We offer post-launch support to address questions, provide assistance, and ensure your website remains updated and optimized. The Website Design Process isn't just about creating a website; it's about crafting a digital experience that resonates, engages, and converts.",
  },
]

const Process = () => {
  return (
    <div className="container min-h-svh place-content-center bg-transparent px-4 md:px-6 pb-20 md:pb-40 lg:pb-200 text-gray-300 xl:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-12">
        <div className="left-0 top-0 lg:sticky lg:top-60 lg:h-svh lg:py-12 text-center lg:text-left">
          <h5 className="text-xs uppercase tracking-wide">our process</h5>
          <h2 className="mb-6 mt-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Planning your{" "}
            <span className="text-indigo-500">project development</span> journey
          </h2>
          <p className="max-w-prose text-sm md:text-base mx-auto lg:mx-0">
            Our journey begins with a deep dive into your vision. In the
            Discovery phase, we engage in meaningful conversations to grasp your
            brand identity, goals, and the essence you want to convey. This
            phase sets the stage for all that follows.
          </p>
        </div>
        <ContainerScroll className="min-h-[200vh] md:min-h-[300vh] lg:min-h-[400vh] space-y-4 md:space-y-6 lg:space-y-8 py-6 md:py-8 lg:py-12">
          {PROCESS_PHASES.map((phase, index) => (
            <CardSticky
              key={phase.id}
              index={index + 2}
              className="rounded-2xl border p-4 md:p-6 lg:p-8 shadow-md backdrop-blur-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 md:gap-3 lg:gap-4">
                <h2 className="my-3 md:my-4 lg:my-6 text-lg md:text-xl lg:text-2xl font-bold tracking-tighter">
                  {phase.title}
                </h2>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-indigo-500 self-start lg:self-auto">
                  {String(index + 1).padStart(2, "0")}
                </h3>
              </div>

              <p className="text-gray-300 text-sm md:text-base">{phase.description}</p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </div>
  )
}

export { Process }
