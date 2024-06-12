import Image from "next/image";
import { Inter } from "next/font/google";
import NavigationBar from "@/components/Admin/Navbar/NavigationBar";
import EmpleadosList from "@/components/Empleados/EmpleadosList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <NavigationBar/>
      <EmpleadosList/>
    </main>
  );
}
