import { ResponsiveType } from "react-multi-carousel";

export const responsiveOneItemCarousel: ResponsiveType = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 0
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 0
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 200
        },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 0
    }
};
