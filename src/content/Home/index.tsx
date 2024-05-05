import Headerbasic from "@/layout/Header/Headerbasic";
import { FC } from "react";
// import Background from "@/assets/Thumbnail.png";

const Home: FC = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-background-pattern bg-cover bg-no-repeat">
      <Headerbasic />
      <div className="w-full h-full flex flex-col gap-4 justify-center items-start p-[10%] md:p-24">
        <h1 className="font-semibold w-full md:w-[600px] text-4xl">
          Optimalkan Kelancaran Bisnis Anda dengan Aplikasi Kasir & Pembukuan
          Profesional!
        </h1>
        <p className="w-full md:w-[600px]">
          Nikmati kemudahan dalam mengelola transaksi, stok, dan keuangan bisnis
          Anda dengan aplikasi kami yang intuitif dan andal.
        </p>
      </div>
    </div>
  );
};

export default Home;
