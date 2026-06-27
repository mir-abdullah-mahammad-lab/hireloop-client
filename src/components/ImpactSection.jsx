
import Image from "next/image";
import globe from '../../public/images/globe.png'
import {
  Briefcase,
  Factory,
  Persons,
  Star,
} from "@gravity-ui/icons";

const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Factory,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Persons,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

const ImpactSection =() => {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Globe Background */}
      <div className="absolute inset-0 flex justify-center">
        <Image
          src={globe}
          alt="Global Hiring Network"
          fill
          className="object-cover object-top opacity-70"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Purple Glow */}
      <div className="absolute top-24 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white md:text-5xl">
            Assisting over{" "}
            <span className="text-violet-400">
              15,000 job seekers
            </span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                  rounded-3xl
                  border border-white/10
                  bg-gradient-to-b
                  from-white/[0.04]
                  to-white/[0.02]
                  backdrop-blur-xl
                  p-6
                  shadow-[0_10px_40px_rgba(0,0,0,0.3)]
                "
              >
                <Icon className="mb-10 h-5 w-5 text-white/70" />

                <h3 className="text-5xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-3 text-sm text-white/70">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ImpactSection