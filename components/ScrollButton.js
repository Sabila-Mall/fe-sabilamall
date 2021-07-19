import { Button, Circle, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowUpIcon } from '@chakra-ui/icons'
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);
    {/* <Circle
                    pos="fixed"
                    right="1rem"
                    bottom="1rem"
                    size="48px"
                    bg="orange.500"
                    color="white"
                    onClick={scrollUp}>
                    <ArrowUpIcon />
                </Circle>  */}
    return (
        <IconButton
            colorScheme="orange"
            isRound={true}
            icon={<ArrowUpIcon />}
            pos="fixed"
            right="1rem"
            bottom="1rem"
            onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }}
        />


    );
}

export default ScrollButton;