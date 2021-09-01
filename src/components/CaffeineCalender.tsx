import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import firebase from "firebase/app";
import { useEffect, useMemo, useRef, useState, VFC } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Caffeine } from "../lib/caffeine";
import { useUser } from "../lib/user";

const now = dayjs();

const startOfToday = now.startOf("day");

const startDay = now.subtract(1, "year");
const dayCountInRange = now.diff(startDay, "day");

const dateStarts = Array.from({ length: dayCountInRange }, (_, i) =>
  startOfToday.subtract(i, "day")
).reverse();

const paddedDateStarts: (dayjs.Dayjs | undefined)[] = [
  ...Array.from<undefined>({
    length: dateStarts[0].diff(dateStarts[0].startOf("week"), "day"),
  }),
  ...dateStarts,
  ...Array.from<undefined>({
    length: now.endOf("week").diff(now, "day"),
  }),
];

const weeksCount = Math.ceil(paddedDateStarts.length / 7);

const calenderizedDateStarts = Array.from({ length: weeksCount }, (_, i) =>
  paddedDateStarts.slice(i * 7, (i + 1) * 7)
);

const getTotalCaffeinesInDay = (
  caffeines: Caffeine[],
  startOfDay: dayjs.Dayjs
) => {
  const endOfDay = startOfDay.endOf("day");

  return caffeines
    .filter((caffeine) =>
      dayjs(caffeine.time.toDate()).isBetween(startOfDay, endOfDay)
    )
    .reduce((acc, cur) => acc + cur.amount, 0);
};

export const CaffeineCalender: VFC = () => {
  const userState = useUser();

  const caffeinesQuery = useMemo(
    () =>
      userState.user &&
      firebase
        .firestore()
        .collection(`/users/${userState.user.id}/caffeine`)
        .where(
          "time",
          ">",
          firebase.firestore.Timestamp.fromDate(startDay.toDate())
        )
        .orderBy("time"),
    [userState.user]
  );

  const [caffeineList] = useCollectionDataOnce<Caffeine>(caffeinesQuery);

  const scrollOuterRef = useRef<HTMLDivElement>(null);
  const [scrollInnerElement, setScrollInnerElement] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollOuterRef.current === null || scrollInnerElement === null) {
      return;
    }

    scrollOuterRef.current.scrollTo({
      left:
        scrollOuterRef.current.scrollWidth - scrollOuterRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [scrollInnerElement]);

  return (
    <VStack p="4">
      <Heading size="md">カフェインカレンダー</Heading>
      <Box overflow="auto" w="100%" py="2" ref={scrollOuterRef}>
        {caffeineList === undefined && (
          <Center>
            <Spinner />
          </Center>
        )}
        {caffeineList !== undefined && (
          <HStack
            spacing="1"
            ref={setScrollInnerElement}
            p="4"
            rounded="lg"
            bgColor="gray.100"
            width="fit-content"
          >
            {calenderizedDateStarts.map((week, weekIndex) => (
              <VStack spacing="1" key={`weeks/${weekIndex}`}>
                {week.map((dayStart, dayIndex) => {
                  if (dayStart === undefined) {
                    return (
                      <Box
                        h="3"
                        w="3"
                        key={`weeks/${weekIndex}/days/${dayIndex}`}
                      />
                    );
                  }

                  const totalCaffeinesInDay = getTotalCaffeinesInDay(
                    caffeineList,
                    dayStart
                  );

                  return (
                    <Flex
                      h="3"
                      w="3"
                      borderWidth="thin"
                      borderColor="orange.100"
                      rounded="sm"
                      key={`weeks/${weekIndex}/days/${dayIndex}`}
                      title={`${dayStart.format(
                        "YYYY-MM-DD"
                      )} ${totalCaffeinesInDay} mg`}
                      bgColor="white"
                    >
                      <Box
                        bgColor="orange.900"
                        opacity={totalCaffeinesInDay / 400}
                        w="100%"
                        h="100%"
                      />
                    </Flex>
                  );
                })}
              </VStack>
            ))}
          </HStack>
        )}
      </Box>
    </VStack>
  );
};
