import {
  Box,
  Text,
  Stack,
  StackDivider,
  Flex,
  Icon,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  UnorderedList,
  ListItem,
  Badge,
  Tooltip,
  Link
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline, IoIosCloseCircle } from "react-icons/io";
import {
  IoMenu,
  IoSearch,
  IoHeartSharp,
  IoNotifications,
  IoCart,
  IoFileTrayStacked,
  IoChevronDown,
} from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { RiCalendarEventFill } from "react-icons/ri";
import { useAuthContext } from "../contexts/authProvider";

import { numberWithDot } from "../utils/functions";
import {
  calculateTimeLeft,
  currencyFormat,
  getPriceAfterDiscount,
  parseNumber,
  pad,
} from "../utils/functions";

import moment from "moment";

const ProductHeader = ({
  holiday,
  holiday_reason,
  close_order,
  products_event,
  products_name,
  vendors_name,
  sales_products,
  products_stock,
  products_jenis,
  po_opendate,
  po_closedate,
  po_shippingdate,
  po_status,
  promo_flash_sale,
  special_name,
  price: normalPrice,
  special_products_price,
  flash_sale_price,
  customers_discount,
  flash_sale_name,
  flash_sale_expires_date,
  special_expires_date,
  flash_sale_discount,
  manufacturers_name,
  reviews,
  is_free_shipping,
  free_shipping_data,
}) => {
  const auth = useAuthContext();

  let isPromo = false;
  let promoData = {};
  let pricePromo = 0;
  let discountPromo = 0;
  let event = '';
  let promoExpiredTime = null;
  let [timer, setTimer] = useState(null);
  let color = '';
  let bgImage = '';

  let price = Number(normalPrice);

  if (products_event == 'flash_sale' && (flash_sale_price != price || flash_sale_discount > 0)) {
    isPromo = true;
    promoData = flash_sale_name
    pricePromo = Number(flash_sale_price);
    discountPromo = flash_sale_discount;
    event = flash_sale_discount == 0 ? '' : `Flash Sale ${discountPromo}%`;
    promoExpiredTime = flash_sale_expires_date;
    color = 'red.500';
    bgImage = '/images/labels/2.svg'
  } else if (products_event == 'special') {
    isPromo = true;
    promoData = special_name;
    pricePromo = Number(special_products_price);
    discountPromo = (price - pricePromo) / price * 100
    event = `Special ${parseInt(discountPromo)}%`;
    promoExpiredTime = special_expires_date;
    color = '#ED8936';
    bgImage = '/images/labels/5.svg'
  }

  console.log('Debug', pricePromo);

  const price_product_data = { price, pricePromo, discountPromo, isPromo, event, customers_discount, products_event };

  if (products_event != '') {
    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(calculateTimeLeft(promoExpiredTime));
      }, 1000);
      return () => clearInterval(interval);
    }, [null]);
  }

  const rating = JSON.parse(reviews ?? "[]");
  let avgRating = 0;

  if (rating.length > 0) {
    avgRating = rating.reduce((old, item) => old + item.reviews_rating, 0) / rating.length;
  }

  return (
    <Box>
      <Text
        fontSize={{ base: "18px", md: "24px" }}
        fontWeight="500"
        className="secondaryFont"
      >
        {products_name}
      </Text>

      <Stack
        divider={
          <StackDivider borderColor={{ base: "white", md: "gray.200" }} />
        }
        flexWrap="wrap"
        alignItems="center"
        direction="row"
        lineHeight="1.5rem"
        spacing="8px"
        className="secondaryFont"
        fontSize="0.875rem"
        mt={{ base: "8px", md: "16px" }}
        mb={{ base: "0.5rem", md: "12px" }}
      >
        <Flex alignItems="center">
          <FaStar color="gray" as="span" size={"1em"} />
          <Text color="gray.500" pl="0.3rem">
            {Number(avgRating).toFixed(1)}
          </Text>
        </Flex>
        <Text color="gray.500">{manufacturers_name}</Text>
        <Text color="gray.500">Terjual {sales_products}</Text>
        {holiday ? (
          <Flex alignItems="center">
            <RiCalendarEventFill size="1.4em" color="#DD6B20" as="span" />
            <Text color="orange.400" pl="0.5rem">
              Toko Libur
            </Text>
          </Flex>
        ) : (
          <Tooltip label={<Flex alignItems={'center'}><IoFileTrayStacked as="span" size="1.2em" />&ensp;Cek Stok</Flex>} placement={'top'}>
            <Link
              _hover={{ textStyle: "none" }}
              href={`/stok?product_name=${products_name}`}
              target="_blank"
            // onClick={(e) => router.push(`/product-detail/${products_slug}`)}
            >
              <Stack
                color={products_stock > 0 ? "green.400" : "red.400"}
                direction="row"
                align="center"
                cursor={'pointer'}
              >
                <IoIosCheckmarkCircleOutline as="span" size="1.2em" />
                <Text alignSelf="center">
                  {products_stock > 0 ? `Stok Tersedia (${products_stock})` : "Stok habis"}
                </Text>
              </Stack>
            </Link>
          </Tooltip>
        )}
        {products_jenis == 'po' && (
          <Flex alignItems="center">
            <IoTimeOutline size="1.4em" color="#ED477A" as="span" />
            <Text color="#ED477A" pl="0.5rem">
              Pre Order
            </Text>
          </Flex>
        )}
        {is_free_shipping == 1 && (
          <ShowDetailFreeShipping free_shipping_data={free_shipping_data} />
        )}
      </Stack>
      {
        products_jenis == 'po' && po_status != 1 && (
          <Box
            my="1rem"
            w={{ lg: "95%", xl: "full" }}
            color="white"
            p="0.5rem"
            borderRadius="8px"
            style={{ backgroundImage: `url('/images/labels/3.svg')` }}
            bgRepeat={'no-repeat'}
            backgroundSize={{ base: '1000%', md: '200%' }}
            bgPosition={'center'}
          >
            <Flex justifyContent="left" alignItems={"center"}>
              <IoIosCloseCircle size="1.2em" ></IoIosCloseCircle>
              <Text fontWeight={'600'} ml={1}> Pre Order Telah Berakhir</Text>
            </Flex>
          </Box>
        )
      }
      {
        products_jenis == 'po' && po_status == 1 && (
          <Box
            my="1rem"
            w={{ lg: "95%", xl: "full" }}
            color="white"
            p="0.5rem"
            borderRadius="8px"
            style={{ backgroundImage: `url('/images/labels/3.svg')` }}
            bgRepeat={'no-repeat'}
            backgroundSize={{ base: '1000%', md: '200%' }}
            bgPosition={'center'}
          >
            <Flex justifyContent="space-between" px="1rem" direction={{ base: 'column', md: 'row' }}>
              <Box>
                <Text fontWeight={'600'}>Periode Pemesanan</Text>
                <Text fontSize="1rem">
                  {moment(po_opendate).format('DD/MMM/YYYY HH:mm')} s.d. {moment(po_closedate).format('DD/MMM/YYYY HH:mm')}
                </Text>
              </Box>
              <Box>
                <Text fontWeight={'600'}>Estimasi Pengiriman</Text>
                <Text fontSize="1rem">
                  {moment(po_shippingdate).format('DD/MMM/YYYY')}
                </Text>
              </Box>
            </Flex>
          </Box>
        )
      }
      {
        isPromo && (
          <>
            <Box p={'5px'} borderRadius={'5px'} mb={'10px'} style={{ backgroundImage: `url('${bgImage}')` }} backgroundPosition={'70%'} bgRepeat={'no-repeat'} backgroundSize={{ base: '1000%', md: '175%' }}>
              <Flex justifyContent={'space-between'} alignItems={{ base: 'left', md: 'center' }} direction={{ base: 'column', md: 'row' }}>
                <Box>
                  {
                    products_event == 'flash_sale'
                      ?
                      <Image src="/images/logo/flash_sale.svg" h={'30px'} />
                      :
                      <Image src="/images/logo/special_price.svg" h={'38px'} mt="-4px" mb="-4px" />
                  }
                </Box>
                <Flex gridGap={'2px'} ml={'5px'} pb={{ base: '5px', md: '0px' }} >
                  <Text mr={'5px'} fontWeight={'600'} color={'white'}> <IoTimeOutline size="1.2em" color="white" style={{ 'display': 'inline', 'marginTop': '-2px' }} /> Berakhir Dalam</Text>
                  <Box px={'4px'} mx={'1px'} bg={'blackAlpha.700'} color={'white'} borderRadius={'2px'} fontWeight={'600'}>{pad(timer?.days ?? 0)}</Box>
                  <Text color={'white'}>:</Text>
                  <Box px={'4px'} mx={'1px'} bg={'blackAlpha.700'} color={'white'} borderRadius={'2px'} fontWeight={'600'}>{pad(timer?.hours ?? 0)}</Box>
                  <Text color={'white'}>:</Text>
                  <Box px={'4px'} mx={'1px'} bg={'blackAlpha.700'} color={'white'} borderRadius={'2px'} fontWeight={'600'}>{pad(timer?.minutes ?? 0)}</Box>
                  <Text color={'white'}>:</Text>
                  <Box px={'4px'} mx={'1px'} bg={'blackAlpha.700'} color={'white'} borderRadius={'2px'} fontWeight={'600'}>{pad(timer?.seconds ?? 0)}</Box>
                </Flex>
              </Flex>
              {
                products_event == 'flash_sale' && (
                  <Text fontSize={'16px'} px="8px" pb="4px" fontWeight={'600'} color={'white'}>
                    {promoData}
                  </Text>
                )
              }
            </Box>
          </>
        )
      }
      <PriceProducts price_product_data={price_product_data} />
      {/* <Box height={'5px'} /> */}
    </Box >
  );
};

const ShowDetailFreeShipping = ({ free_shipping_data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex alignItems="center" onClick={onOpen} style={{ cursor: 'pointer' }}>
        <Icon
          color="green.400"
          as={FaShippingFast}
          width="1.25em"
          height="1.25em"
        />
        <Text color="green.400" pl="0.5rem">
          Free Ongkir
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Free Ongkir</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              free_shipping_data.map((item) =>
                <Box shadow={'base'} border={'1px'} borderColor={'gray.200'} borderRadius={'base'} p={3} mb={4} >
                  <Text fontWeight={'600'}>{item.promos_desc}</Text>
                  <table style={{ 'fontSize': '14px', 'marginTop': '5px' }} className="info_free_shipping_table">
                    <tbody>
                      <tr>
                        <td style={{ whiteSpace: 'nowrap' }}>Minimum Pembelian&emsp;</td>
                        <td>:</td>
                        <td>{item.promos_qty} Qty</td>
                      </tr>
                      <tr>
                        <td style={{ whiteSpace: 'nowrap' }}>Minimum Total Pembelian&emsp;</td>
                        <td>:</td>
                        <td>{currencyFormat(item.promos_total)}</td>
                      </tr>
                      <tr>
                        <td>Diskon Ongkir&emsp;</td>
                        <td>:</td>
                        <td>{
                          item.promos_fulldisc == 1
                            ?
                            'Free'
                            :
                            currencyFormat(item.promos_amount)
                        }</td>
                      </tr>
                    </tbody>
                  </table>

                </Box>
              )
            }

          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

const PriceProducts = ({ price_product_data }) => {


  const { price, pricePromo, discountPromo, isPromo, event, customers_discount, products_event } = price_product_data;
  const auth = useAuthContext();

  if (auth.isLoggedIn && isPromo) {
    if (products_event == 'flash_sale') {
      if (discountPromo > 0 && price != pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (customers_discount + discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={price} isDiscount={false} size={18} />
            <PriceValue as={'del'} price={pricePromo} isDiscount={true} infoDiscount={'Flash Sale Price'} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Diskon ' + customers_discount + '% + ' + event} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      } else if (discountPromo > 0 && price == pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (customers_discount + discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={pricePromo} isDiscount={false} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Diskon ' + customers_discount + '% + ' + event} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      } else if (discountPromo <= 0 && price != pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (customers_discount + discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={price} isDiscount={false} size={18} />
            <PriceValue as={'del'} price={pricePromo} isDiscount={true} infoDiscount={'Flash Sale Price'} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Diskon ' + customers_discount + '%'} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      } else if (discountPromo <= 0 && price == pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (customers_discount + discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={pricePromo} isDiscount={false} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Diskon ' + customers_discount + '%'} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      }
    } else if (products_event == 'special') {
      const price_after_discount = pricePromo - (pricePromo * customers_discount / 100);
      return (
        <>
          <PriceValue as={'del'} price={price} isDiscount={false} size={18} />
          <PriceValue as={'del'} price={pricePromo} infoDiscount={event} isDiscount={true} size={24} />
          <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Diskon ' + customers_discount + '%'} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
        </>
      )
    }
  } else if (auth.isLoggedIn && !isPromo) {
    const price_after_discount = price - (price * customers_discount / 100);
    return (
      <>
        <PriceValue as={'del'} price={price} isDiscount={false} size={24} />
        {/* <PriceValue as={'del'} price={pricePromo} infoDiscount={event} isDiscount={true} size={24} /> */}
        <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Diskon ' + customers_discount + '%'} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
      </>
    )
  } else if (!auth.isLoggedIn && isPromo) {
    if (products_event == 'flash_sale') {
      if (discountPromo > 0 && price != pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={price} isDiscount={false} size={18} />
            <PriceValue as={'del'} price={pricePromo} isDiscount={true} infoDiscount={'Flash Sale Price'} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={event} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      } else if (discountPromo > 0 && price == pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={pricePromo} isDiscount={false} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={event} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      } else if (discountPromo <= 0 && price != pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={price} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Flash Sale Price'} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      } else if (discountPromo <= 0 && price == pricePromo) {
        const price_after_discount = pricePromo - (pricePromo * (discountPromo) / 100);
        return (
          <>
            <PriceValue as={'del'} price={pricePromo} isDiscount={false} size={24} />
            <PriceValue as={'text'} price={price_after_discount} infoDiscount={'Diskon ' + customers_discount + '%'} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
          </>
        )
      }
    } else if (products_event == 'special') {
      const price_after_discount = pricePromo;
      return (
        <>
          <PriceValue as={'del'} price={price} isDiscount={false} size={24} />
          {/* <PriceValue as={'del'} price={pricePromo} infoDiscount={event} isDiscount={true} size={24} /> */}
          <PriceValue as={'text'} price={price_after_discount} infoDiscount={event} isDiscount={true} size={32} bold={'bold'} isPrimary={true} />
        </>
      )
    }
  } else if (!auth.isLoggedIn && !isPromo) {
    const price_after_discount = price;
    return (
      <>
        {/* <PriceValue as={'del'} price={price} isDiscount={false} size={24} />   */}
        {/* <PriceValue as={'text'} price={pricePromo} infoDiscount={event} isDiscount={true} size={32} bold={'bold'} /> */}
        <PriceValue as={'text'} price={price_after_discount} isDiscount={false} size={32} bold={'bold'} isPrimary={true} />
      </>
    )
  }
}


const PriceValue = ({ as, price, isDiscount, infoDiscount, size, bold = 300, isPrimary }) => {
  return (
    <>
      <Stack direction={'row'} mb={'-5px'}>
        <Text
          as={as}
          color={as == 'del' ? 'gray.300' : 'red.500'}
          className={isPrimary ? 'primaryFont' : 'secondaryFont'}
          fontSize={size}
          fontWeight={bold}
        >
          {currencyFormat(price)}
        </Text>
        {
          isDiscount && (
            <Box alignSelf="center" textAlign={'center'}>
              <Text
                className="secondaryFont"
                color="white"
                bg="red.500"
                fontWeight="300"
                fontSize={size / 2.2}
                px="4px"
                py="2px"
                borderRadius="4px"
              >
                <span>{infoDiscount}</span>
              </Text>
            </Box>
          )
        }
      </Stack>
    </>
  )
}

export default ProductHeader;
