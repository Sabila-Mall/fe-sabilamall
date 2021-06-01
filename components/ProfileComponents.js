import {
  Box,
  Icon,
  Text,
  Avatar,
  VStack,
  Input,
  Button,
  StackDivider,
  FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoNotifications, IoChevronBack, IoHeart } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

export const NavbarProfile = ({ section, setSection }) => (
  <Box
    h="50px"
    boxShadow="0px 4px 10px 0px #00000040"
    w="100vw"
    position="fixed"
    top="0"
    display={{ base: "flex", md: "none" }}
    className="primaryFont"
    fontSize="18px"
    fontWeight="700"
    lineHeight="23px"
    color="gray.500"
    justifyContent="space-between"
    alignItems="center"
    pr="18px"
    pl="20px"
  >
    <Box display="flex" alignItems="center">
      <Icon
        as={IoChevronBack}
        onClick={() => setSection("Akun Saya")}
        display={section === "Akun Saya" ? "none" : "block"}
      />
      <Text ml="8px">{section}</Text>
    </Box>
    <Box>
      <Icon
        as={IoNotifications}
        display={section === "Akun Saya" ? "block" : "none"}
      />
    </Box>
  </Box>
);

export const AkunSaya = ({ setSection }) => {
  const sm = [
    { text: "SM Pay", value: "100.000.000" },
    { text: "SM Point", value: 5 },
  ];

  const wisPack = [
    { text: "Wishlist", icon: IoHeart, href: "/#" },
    { text: "Pesanan Saya", icon: VscPackage, href: "/#" },
  ];

  const profileMenu = [
    { text: "Ubah Kata Sandi" },
    { text: "Alamat Pengiriman" },
    { text: "Edit Profile" },
    { text: "Upgrade Akun" },
    { text: "Pusat Bantuan" },
    { text: "Keluar" },
  ];
  return (
    <Box mt="50px" px="16px" pt="18px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Avatar
          size="lg"
          name="Udin"
          src="https://akcdn.detik.net.id/community/media/visual/2021/05/17/lionel-messi.jpeg?w=700&q=90"
        />
        <Box fontSize="14px">
          <Text fontWeight="700" lineHeight="18.2px" className="primaryFont">
            Messi GOAT
          </Text>
          <Text
            fontWeight="500"
            fontSize="14px"
            lineHeight="21px"
            className="secondaryFont"
          >
            messigoat@biyac.com
          </Text>
        </Box>
        <Box
          w="80px"
          h="30px"
          borderRadius="30px"
          bg="gray.400"
          fontSize="14px"
          fontWeight="500"
          lineHeight="21px"
          className="secondaryFont"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Reguler
        </Box>
      </Box>
      <Box
        mt="20px"
        mx="auto"
        w="308px"
        h="50px"
        bg="gray.50"
        borderRadius="10px"
        p="10px"
        boxSizing="border-box"
        boxShadow=" 0px 0px 5px 0px #00000040"
        display="flex"
        justifyContent="start"
        alignItems="center"
      >
        {sm.map((item, index) => (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            alignItems="start"
            key={item.text}
            ml={index ? "50px" : "10px"}
          >
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="12px"
              color="red.600"
            >
              {item.text}
            </Text>
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="12px"
              lineHeight="18px"
            >
              {index ? item.value : `RP. ${item.value}`}
            </Text>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="space-evenly" mt="20px">
        {wisPack.map((item) => (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            key={item.text}
          >
            <Icon as={item.icon} color="orange.400" fontSize="30px" />
            <Text
              className="secondaryFont"
              fontSize="12px"
              fontWeight="500"
              lineHeight="18px"
            >
              {item.text}
            </Text>
          </Box>
        ))}
      </Box>
      <VStack
        mt="20px"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        align="stretch"
      >
        <StackDivider borderColor="gray.200" />
        {profileMenu.map((menu) => (
          <Box key={menu.text}>
            <Text
              className="secondaryFont"
              fontSize="16px"
              fontWeight="500"
              lineHeight="24px"
              onClick={() => setSection(menu.text)}
            >
              {menu.text}
            </Text>
          </Box>
        ))}
        <StackDivider borderColor="gray.200" />
      </VStack>
    </Box>
  );
};

export const InputBoxAndLabel = ({ register, text, name, mt }) => (
  <Box mt={mt} key={text}>
    <Text
      className="primaryFont"
      fontWeight="700"
      fontSize="16px"
      lineHeight="20.8px"
      mb="8px"
    >
      {text}{" "}
      <Box as="span" color="red.500">
        *
      </Box>
    </Text>
    <Input
      {...register(name, { required: true })}
      type="password"
      id={name}
      placeholder={text}
      _focus={{ outline: "none" }}
    />
  </Box>
);

export const UbahKataSandi = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => console.log(values);

  return (
    <Box mt="100px" px="16px" pt="18px">
      <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box px="12px">
          <InputBoxAndLabel
            register={register}
            text="Password Lama"
            name="oldPassword"
            mt="2px"
          />
          <InputBoxAndLabel
            register={register}
            text="Password Baru"
            name="newPassword"
            mt="50px"
          />
          <InputBoxAndLabel
            register={register}
            text="Konfirmasi Password Baru"
            name="newPasswordConfirm"
            mt="20px"
          />
        </Box>
        <Button
          className="primaryFont"
          fontWeight="700"
          fontSize="14px"
          lineHeight="18.2px"
          type="submit"
          mx="auto"
          borderRadius="20px"
          w="100%"
          bg="orange.400"
          color="white"
          colorScheme="orange.400"
          mt="150px"
          _active={{ bg: "orange.300" }}
          border="none"
        >
          Update Profile
        </Button>
      </FormControl>
    </Box>
  );
};
