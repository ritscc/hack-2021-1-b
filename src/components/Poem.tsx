import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { useState, VFC } from "react";
import { Logo } from "./Logo";
import { SupressTheBeast } from "./SupressTheBeast";

const poemElements = [
  <VStack alignItems="stretch" bgColor="black" color="white" p="8" key="energy">
    <Text>
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      の世界を体感せよ！
    </Text>
    <Text>
      ハッカソンで生まれ、RCC で一大ブームを巻き起こしている
      カフェイン管理アプリ、
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      ！ 誰もがハマる使用感とパンチのあるアプリです。
    </Text>
    <Text>
      日本のカフェインファンのために、独自のシステムを実現、
      <br />
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      ならではのゾクゾク感を体感ください！
    </Text>
    <Text>
      一度使えば、世界中のツイ廃や受験生、そして全ての
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      ファンが熱狂するワケを実感できるはず！
    </Text>
    <Text color="green.400" fontSize="6xl">
      <SupressTheBeast />
    </Text>
  </VStack>,
  <VStack
    alignItems="stretch"
    bgColor="black"
    color="white"
    p="8"
    key="pipline"
  >
    <Text>
      バンザイ・パイプラインはハワイ・オアフ島のノースショアを代表するサーフポイントで、冬になると危険な波が炸裂する。
    </Text>
    <Text>
      それはそうとして、我々は
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      を開発した。
    </Text>
    <Text>
      RCCで人気のカフェイン、React、Firebaseを絶妙にブレンドし、
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      独自の要素をふんだんにミックス。
    </Text>
    <Text>
      かのビッグウェーブのように、この
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      も伝説となるはず
    </Text>

    <Text color="red.300" fontSize="6xl">
      <SupressTheBeast />
    </Text>
  </VStack>,
  <VStack alignItems="stretch" bgColor="black" color="white" p="8" key="cuba">
    <Text>
      「身体を解放せよ！」カフェインからの独立の時、このRCC民の声とともに、かの有名な運動「
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      」は誕生した。
    </Text>
    <Text>
      時は経ち、RCC民は偉大な運動に代わる独自のアプリケーションを開発した。唯一無二のデザインはもちろん、Chakra
      UIをふんだんに加えたテイストだ。
    </Text>
    <Text>
      クレイジーなのは承知の上だがまずはトライしてみてくれ。きっとこの新感覚を気に入るはずだ。
      カフェインから解放せよ！
    </Text>
    <Text color="red.800" fontSize="6xl">
      <SupressTheBeast />
    </Text>
  </VStack>,
  <VStack
    alignItems="stretch"
    bgColor="black"
    color="white"
    p="8"
    key="pipline"
  >
    <Text>
      ついに
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      が完成した。 これはただのカフェイン管理アプリではない。
      RCCのRを名乗る、Webデザイン、システム作成の道のりは険しかった。
    </Text>
    <Text>
      デザインの改良、Firebaseの利用、何百回ものテストを繰り返し、ついに
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      に求めていた中身が完成した。
    </Text>
    <Text>
      <Box as="span" display="inline-block" color="orange.700">
        <Logo />
      </Box>
      は、開発や遊びで摂取したカフェインを丁寧に記録。 要するにヤバイ・・・。
      摂取量超え、睡眠時間も管理、湧き上がるゾクゾク感。
    </Text>
  </VStack>,
];

export const Poem: VFC = () => {
  const [index] = useState<number>(() =>
    Math.floor(Math.random() * poemElements.length)
  );

  return poemElements[index];
};
