import Headerbasic from "@/layout/Header/Headerbasic";
import { FC } from "react";
// import Background from "@/assets/Thumbnail.png";

const Home: FC = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-background-pattern bg-cover bg-no-repeat">
      <Headerbasic />
      <div className="w-full h-full flex flex-col gap-4 justify-center items-start p-[10%] md:p-24">
        <h1 className="font-semibold w-full md:w-[600px] text-4xl">
          Optimize the smooth running of your business with the cashier &
          bookkeeping application Professional!
        </h1>
        <p className="w-full md:w-[600px]">
          Enjoy the convenience of managing transactions, stock and business
          finances you with our intuitive and reliable application.
        </p>
      </div>
    </div>
  );
};

export default Home;
