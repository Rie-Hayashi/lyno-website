import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/file.html";
  }, []);

  return null;
}
