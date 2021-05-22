import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const calculateTimeLeft = (endTime) => {
  let difference = +endTime - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const BoxTime = ({ time }) => {
  return (
    <Box
      h="34px"
      w="22px"
      boxSizing="border-box"
      p="8px"
      borderRadius="4px"
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="12px"
      lineHeight="18px"
      fontWeight="500"
      mr="2px"
    >
      {time}
    </Box>
  );
};

const SegmentTime = ({ time, hasTwoBoxTime, text, mr }) => {
  let timeInt = Number(time);
  let timeString = timeInt + "";
  if (timeInt < 10) {
    timeString = "0" + timeInt;
  }

  return (
    <Box mr={mr} display="flex" alignItems="center">
      <BoxTime time={hasTwoBoxTime ? timeString.substring(0, 1) : timeInt} />
      {hasTwoBoxTime && <BoxTime time={timeString.substring(1, 2)} />}
      <Text color="white">{text}</Text>
    </Box>
  );
};

const CountDownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <Box display={{ base: "flex", md: "none" }} alignItems="center">
      <SegmentTime
        time={timeLeft.days}
        hasTwoBoxTime={false}
        text="Hari"
        mr="8px"
      />
      <SegmentTime
        time={timeLeft.hours}
        hasTwoBoxTime={true}
        text="Jam"
        mr="8px"
      />
      <SegmentTime
        time={timeLeft.minutes}
        hasTwoBoxTime={true}
        text="Menit"
        mr="8px"
      />
      <SegmentTime
        time={timeLeft.seconds}
        hasTwoBoxTime={true}
        text="Detik"
        mr="8px"
      />
    </Box>
  );
};

export default CountDownTimer;
