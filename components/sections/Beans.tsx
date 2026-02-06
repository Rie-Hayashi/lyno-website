import { getBeans } from "@/lib/data/beans";
import BeansClient from "./BeansClient";

export default async function Beans() {
  const beans = await getBeans();
  return <BeansClient items={beans} />;
}