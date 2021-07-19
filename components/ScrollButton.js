import { IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowUpIcon } from '@chakra-ui/icons'

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