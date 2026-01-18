import type { Route } from "./+types/home";
import { MainScreen } from "../main/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Imagine" },
    { name: "description", content: "Re-Imagining the desktop experience!" },
  ];
}

export default function Home() {
  return <MainScreen />;
}
