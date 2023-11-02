import React from "react";
import { Title, Text } from "rizzui";
import {
  SwatchIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    id: 1,
    icon: <SwatchIcon className="w-6 h-auto" />,
    title: "Fully Customizable",
    description:
      "If you need to customize a component beyond what is available through TailwindCSS classes, you can easily do so by using the component's props.",
  },
  {
    id: 2,
    icon: <RocketLaunchIcon className="w-6 h-auto" />,
    title: "Easy to Use",
    description:
      "Our components have a simple and intuitive API that makes them easy to use in your React application.",
  },
  {
    id: 3,
    icon: <ShieldCheckIcon className="w-6 h-auto" />,
    title: "TypeScript Based",
    description:
      "Build type safe applications, all components export types it easier to use TypeScript in your project and provide better type support",
  },
  {
    id: 4,
    icon: <MegaphoneIcon className="w-6 h-auto" />,
    title: "Accessibility",
    description:
      "We have made sure that our components meet accessibility standards so that they can be used by people with disabilities",
  },
];

export default function FeatureBlock() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto">
        <header className="text-center mb-8 sm:mb-10 md:mb-12">
          <Text className="!mb-3 sm:!mb-5 !text-[11px] sm:!text-xs lg:!text-sm font-medium tracking-[4px] uppercase text-gray-500">
            Why Rizz UI?
          </Text>
          <Title
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl leading-[1.35] sm:leading-[1.3]"
          >
            A Next Gen UI Library with <br className="hidden sm:inline-block" />{" "}
            Limitless Customization Options
          </Title>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-5">
          {features.map((feature) => (
            <div
              key={feature.title + feature.id}
              className="border border-gray-200 shadow-sm rounded-xl pt-8 pb-7 px-6"
            >
              <div className="h-11 w-11 rounded-md bg-gray-900 mb-6 text-gray-50 flex items-center justify-center">
                {feature.icon}
              </div>
              <Title as="h5" className="font-semibold">
                {feature.title}
              </Title>
              <Text className="leading-loose">{feature.description}</Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
