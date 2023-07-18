import Link from "next/link";
import { Box, Text, Icon, Flex, Image, Badge, Divider, IconButton, AspectRatio } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaPercent, FaShippingFast } from "react-icons/fa";
import { IoHeartOutline, IoTimeSharp, IoHeart } from "react-icons/io5";

import { useAuthContext } from "../contexts/authProvider";
import { useWishlistContext } from "../contexts/wishlistProvider";
import styles from "../styles/Product.module.scss";
import { getImageLink } from "../utils/functions";
import label1 from "../public/images/labels/1.svg"
import {
  calculateTimeLeft,
  currencyFormat,
  getPriceAfterDiscount,
  parseNumber,
} from "../utils/functions";

const CardProduct = ({
  image_path,
  image_medium,
  products_event,
  products_name,
  flash_sale_expires_date,
  products_id,
  products_slug,
  price,
  price_after_discount,
  customers_discount,
  responsive,
  is_free_shipping,
  products_jenis,
  products_features,
  products_features_colors,
  sales_products,
  flash_sale_price,
  flash_sale_discount,
  special_products_price,
  flash_sale_name,
  is_liked_product,
  vendors_name,
  manufacturer_name,
  is_instalment,
  po_closedate,
  is_official,
}) => {
  const { isLoggedIn, userData } = useAuthContext();
  const userId = isLoggedIn ? userData?.id : "";
  const { wishlistData } = useWishlistContext();
  const timeLeft = flash_sale_expires_date && calculateTimeLeft(flash_sale_expires_date);
  const timeLeftPO = po_closedate && calculateTimeLeft((new Date(po_closedate)).getTime() / 1000);
  const promo_price = products_event == 'flash_sale' ? flash_sale_price : products_event == 'special' ? special_products_price : price;

  let final_price = 0;
  let text_promo_price, text_discount;
  let final_discount = 0;
  if (products_event == 'flash_sale') {
    text_promo_price = 'FS Price';
    final_price = promo_price - (promo_price * ((customers_discount + flash_sale_discount) / 100));
    final_discount = customers_discount + flash_sale_discount;
    if (flash_sale_discount > 0 && customers_discount > 0) {
      text_discount = `${customers_discount}% + ${flash_sale_discount}%`;
    } else if (flash_sale_discount > 0) {
      text_discount = `${flash_sale_discount}%`;
    } else if (customers_discount > 0) {
      text_discount = `${customers_discount}%`;
    }
  } else if (products_event == 'special') {
    text_promo_price = 'S Price';
    final_price = promo_price - (promo_price * (customers_discount / 100))
    final_discount = customers_discount;
    text_discount = `${customers_discount}%`;
  } else {
    final_price = price - (price * (customers_discount / 100));
    final_discount = customers_discount;
    text_discount = `${customers_discount}%`;
  }

  const [isLikedProduct, setIsLikedProduct] = useState(is_liked_product);

  // const [liked, setLiked] = useState(
  //   wishlistData?.length > 0
  //     ? wishlistData?.map((e) => e.id).includes(liked_products_id)
  //     : false,
  // );

  // useEffect(() => {
  //   setLiked(
  //     wishlistData?.length > 0
  //       ? wishlistData?.map((e) => e.id).includes(liked_products_id)
  //       : false,
  //   );
  // }, [wishlistData]);

  const { addItem, deleteItem } = useWishlistContext();
  const handleClickWishlist = (e) => {
    e.preventDefault();
    if (isLikedProduct) {
      deleteItem(products_id, userData?.id);
    } else {
      addItem(products_id, userData?.id);
    }
    setIsLikedProduct((val) => !val);
  };


  const [hover, setHover] = useState(false);

  return (
      <a href={`/product-detail/${products_slug}`} target="_blank">
        <Flex
          h={'100%'}
          flexDirection={'column'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          overflow={'hidden'}
          display={'flex'}
          border={'1px'}
          borderColor={'gray.200'}
          borderRadius="8px"
          cursor={"pointer"}
          shadow={'md'}
          bg={'white'}
          justifyContent={'space-between'}
          _hover={{ textStyle: "none" }}>
          <Box>
            <AspectRatio ratio={1 / 1}>
              <Box position={'relative'}>
                <Image fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" src={getImageLink(image_medium == '' ? image_path : image_medium)} position={'absolute'} width={'100%'} height={'100%'} top={0} right={0} bottom={0} left={0} />
                <Flex direction={'column'} position={'absolute'} right={0} top={0} p={'5px 0px 0px 0px'} gridGap={'2px'}>
                  {
                    products_features?.split(',').map((item, index) =>
                      <Box key={index}>
                        <Text color={'white'} p={'2.5px 0px'} lineHeight={'1.2'} bg={products_features_colors.split(',')[index]} fontSize={'10px'} px={'2'} style={{ transform: `translate(${hover ? '0%' : '95%'})`, transitionDuration: '100ms' }}>
                          {item}
                        </Text>
                      </Box>
                    )
                  }
                </Flex>
              </Box>
            </AspectRatio>
            {flash_sale_expires_date && timeLeft && (

              <Box
                bg="red.500"
                fontSize={{ base: "10px", md: "12px" }}
                textAlign="center"
                lineHeight={{ base: "15px", md: "18px" }}
                fontWeight="500"
                color={'white'}
                p={'5px'}
              >
                <span style={{ whiteSpace: 'nowrap' }}><Icon as={IoTimeSharp} />&nbsp;</span>

                {timeLeft.days > 0 && <span style={{ whiteSpace: 'nowrap' }}>{`${timeLeft.days} Hari`}&nbsp;</span>}

                <span style={{ whiteSpace: 'nowrap' }}>{`${timeLeft.hours} Jam`}&nbsp;</span>

                <span style={{ whiteSpace: 'nowrap' }}>{`${timeLeft.minutes} Menit`}</span>

              </Box>
            )}
            {po_closedate && timeLeftPO && (
              <Box
                bg={products_event == 'special' ? '#FC5E00' : '#df4580'}
                fontSize={{ base: "10px", md: "12px" }}
                textAlign="center"
                lineHeight={{ base: "15px", md: "18px" }}
                fontWeight="500"
                color={'white'}
                p={'5px'}
              >
                <span style={{ whiteSpace: 'nowrap' }}><Icon as={IoTimeSharp} />&nbsp;</span>
                {timeLeftPO.days > 0 && <span style={{ whiteSpace: 'nowrap' }}>{`${timeLeftPO.days} Hari`}&nbsp;</span>}

                <span style={{ whiteSpace: 'nowrap' }}>{`${timeLeftPO.hours} Jam`}&nbsp;</span>

                <span style={{ whiteSpace: 'nowrap' }}>{`${timeLeftPO.minutes} Menit`}</span>

              </Box>
            )}
            <BoxLabel products_jenis={products_jenis} products_event={products_event} flash_sale_name={flash_sale_name} po_closedate={po_closedate} />


            <Box px={'5px'} py="10px">
              {/* <Text fontSize="0.8em" fontWeight="400" lineHeight="16px" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}> */}
              <Text fontSize="0.8em" fontWeight="400" lineHeight="16px" >
                {products_name?.toUpperCase()}
              </Text>
              <Box h={'10px'}></Box>
              <Box
                className={styles.primaryFont}
                w="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                fontWeight="700"
                fontSize="16px"
                lineHeight="20.8px"
              >
                <Text>{currencyFormat(final_price)}</Text>
                <Flex align="center">
                  {isLoggedIn && (
                    <Icon
                      width="1.15em"
                      height="1.15em"
                      onClick={handleClickWishlist}
                      as={isLikedProduct ? IoHeart : IoHeartOutline}
                      color={isLikedProduct ? "red.500" : "black"}
                    />
                  )}
                </Flex>
              </Box>
              <Box h={'5px'}></Box>
              <Flex direction={"column"} gridGap={'2px'}>
                {Number(final_price) !== Number(promo_price) && (
                  <Box
                    w="100%"
                    display="flex"
                    alignItems="center"
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="18px"
                  >
                    <Text as="del" color="gray.500">
                      {currencyFormat(promo_price)}
                    </Text>
                    <Text
                      ml={"5px"}
                      h="100%"
                      bg="red.200"
                      px="4px"
                      borderRadius="4px"
                      color="red.700"
                      display="flex"
                      alignItems="center"
                    >
                      {text_discount}
                    </Text>
                  </Box>
                )}
                {Number(price) !== Number(promo_price) && (
                  <Box
                    w="100%"
                    display="flex"
                    alignItems="center"
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="18px"
                  >
                    <Text as="del" color="gray.500">
                      {currencyFormat(price)}
                    </Text>
                    <Text
                      ml={"5px"}
                      h="100%"
                      bg="red.200"
                      px="4px"
                      borderRadius="4px"
                      color="red.700"
                      display="flex"
                      alignItems="center"
                    >
                      {text_promo_price}
                    </Text>
                  </Box>

                )}
              </Flex>
            </Box>
          </Box>
          <Flex p={'5px'} justifyContent={'space-between'} alignItems={'center'} bg={'gray.100'} borderBottomRadius={'8px'}>
            <Text fontSize={'xs'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{manufacturer_name} </Text>
            
            <Box width={'20px'} />
            <Flex direction={"row"} alignItems={'center'} gridGap={'5px'}>
              {
                is_official === 1 && (
                  <Badge colorScheme="red" variant="solid" rounded={'full'} textTransform={'unset'} fontSize="0.6rem">Official</Badge>
                )
              }
              {is_instalment && (
                <Icon as={FaPercent} w="12px" src="/images/free-ongkir.svg" color={'blueviolet'} />
              )}
              {is_free_shipping == 1 && (
                <Image w="35px" mb={'-0.5'} src="/images/free-ongkir.svg" />
              )}
            </Flex>
          </Flex>
        </Flex>
      </a>
  );
};

const BoxLabel = ({
  products_jenis,
  products_event,
  flash_sale_name,
  po_closedate
}) => {
  if (products_event == 'flash_sale') {
    if (products_jenis == 'po') {
      return <LabelPOAndFlashSale flash_sale_name={flash_sale_name} po_closedate={po_closedate} />
    } else {
      return <LabelFlashSale />
    }
  } else if (products_event == 'special') {
    if (products_jenis == 'po') {
      return <LabelPOAndSpecial po_closedate={po_closedate} />
    } else {
      return <LabelSpecial />
    }
  } else if (products_jenis == 'po') {
    return <LabelPO po_closedate={po_closedate} />
  }

  return <></>

}

const LabelPO = ({ po_closedate }) => {
  return (
    <Box color="white" style={{ backgroundImage: `url('/images/labels/3.svg')` }} textColor={'white'} bgSize={'cover'} backgroundPosition={'right'} backgroundSize={'340px'} mr={'-9px'}>
      <Text p={'2px 5px'} fontSize={'xs'} fontWeight={'600'} display={'flex'}>
        {po_closedate != null ? (<Text>Pre Order - Open</Text>) : <Text>Pre Order - Close</Text>}
      </Text>
    </Box>
  )
}

const LabelFlashSale = ({ flash_sale_name }) => {
  return (
    <Box color="white" style={{ backgroundImage: `url('/images/labels/2.svg')` }} textColor={'white'} bgSize={'cover'} backgroundPosition={'right'} backgroundSize={'340px'} mr={'-11.5px'}>
      <Text p={'2px 5px'} fontSize={'xs'} fontWeight={'600'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}>
        Flash Sale {flash_sale_name != null ? " - " + flash_sale_name : ''}
      </Text>
    </Box>
  )
}

const LabelPOAndFlashSale = ({ po_closedate }) => {
  return (
    <Box color="white" style={{ backgroundImage: `url('/images/labels/4.svg')` }} textColor={'black'} bgSize={'cover'} backgroundPosition={'right'} backgroundSize={'340px'} mr={'-11.5px'}>
      <Text p={'2px 5px'} fontSize={'xs'} fontWeight={'600'}>
        {po_closedate != null ? (<Text>Pre Order & Flash Sale - Open</Text>) : <Text>Pre Order & Flash Sale - Close</Text>}
      </Text>
    </Box>
  )
}

const LabelPOAndSpecial = ({ po_closedate }) => {
  return (
    <Box color="white" style={{ backgroundImage: `url('/images/labels/1.svg')` }} textColor={'white'} bgSize={'cover'} backgroundPosition={'right'} backgroundSize={'340px'} mr={'-11.5px'}>
      <Text p={'2px 5px'} fontSize={'xs'} fontWeight={'600'}>
        {po_closedate != null ? (<Text>Pre Order & Special - Open</Text>) : <Text>Pre Order & Special - Close</Text>}
      </Text>
    </Box>
  )
}

const LabelSpecial = () => {
  return (
    <Box color="white" style={{ backgroundImage: `url('/images/labels/5.svg')` }} textColor={'black'} bgSize={'cover'} backgroundPosition={'right'} backgroundSize={'340px'} mr={'-11.5px'}>
      <Text p={'2px 5px'} fontSize={'xs'} fontWeight={'600'}>
        Special
      </Text>
    </Box>
  )
}

export default CardProduct;
