import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from '../components/ProductCard'
import { Box } from '@mui/material';


const Carrousel = ({products}) => {

  return (
    <Box sx={{
        width: "70%",
        margin: "auto"
    }}>
        <Carousel
        additionalTransfrom={0}
        arrows= {false}
        autoPlay
        autoPlaySpeed={4000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
            desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 4,
            partialVisibilityGutter: 40
            },
            mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
            },
            tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
            }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
        >
        <div><ProductCard product={products[2]}></ProductCard></div>
        <div><ProductCard product={products[3]}></ProductCard></div>
        <div><ProductCard product={products[9]}></ProductCard></div>
        <div><ProductCard product={products[20]}></ProductCard></div>
        <div><ProductCard product={products[6]}></ProductCard></div>
        <div><ProductCard product={products[9]}></ProductCard></div>
        <div><ProductCard product={products[29]}></ProductCard></div>
        <div><ProductCard product={products[11]}></ProductCard></div>
        </Carousel>
    </Box>
  )
}


export default Carrousel
