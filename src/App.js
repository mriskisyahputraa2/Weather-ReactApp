import React, { useState, useEffect } from "react";

// import axios
import axios from "axios";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsSnow,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

// API Key
const APIkey = "9584d976b8574be575e30159269ba03e";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Aceh");

  // fetch the data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  // jika data api tidak ada
  if (!data) {
    return (
      <div>
        <div>
          {/* tampilkan icons loading */}
          <ImSpinner8 className="text-5xl animate-spin " />
        </div>
      </div>
    );
  }

  // set the icon according to the weather
  let icon;
  console.log(data.weather);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/* form */}
      <form>form</form>
      {/* card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop:blur-[32px] rounded-[32px] py-12 px-6 ">
        {/* card top */}
        <div className="flex items-center gap-x-5">
          {/* icon */}
          <div className="text-[87px]">{icon}</div>
          <div>
            {/* country name */}
            <div className="text-2xl font-semibold">
              {data.name}, {data.sys.country}
            </div>

            {/* date */}
            <div>
              {date.getUTCDate()}/{date.getUTCMonth() + 1}/
              {date.getUTCFullYear()}
            </div>
          </div>
        </div>
        {/* card body */}
        <div className="my-20">
          <div className="flex justify-center items-center">
            {/* temp(suhu) now */}
            <div className="text-[144px] leading-none font-light">
              {parseInt(data.main.temp)}
            </div>
            {/* celsius icon */}
            <div className="text-4xl">
              <TbTemperatureCelsius />
            </div>
          </div>
          {/* weather description */}
          <div>{data.weather[0].description}</div>
        </div>
        {/* card bottom */}
        <div>card bottom</div>
      </div>
    </div>
  );
};

export default App;
