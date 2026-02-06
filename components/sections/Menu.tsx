import { getMenu } from "@/lib/data/menu";
import MenuClient from "./MenuClient";

export default async function Menu() {
  const items = await getMenu();
  return <MenuClient items={items} />;
}