import React, { useEffect } from 'react'
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import Image from 'next/image';
import { HiStar } from 'react-icons/hi';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const reviews = [
  {
    avatr: '/assets/icons/1.jpg',
    name: 'Johen Doe',
    time: '2 day ago',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    rating: 4,
    dish: '/assets/images/dish-2.png'

  },
  {
    avatr: '/assets/icons/1.jpg',
    name: 'Johen Doe',
    time: '2 day ago',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    rating: 4,
    dish: '/assets/images/dish-2.png'

  },
  {
    avatr: '/assets/icons/1.jpg',
    name: 'Johen Doe',
    time: '2 day ago',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    rating: 4,
    dish: '/assets/images/dish-2.png'

  },
  {
    avatr: '/assets/icons/1.jpg',
    name: 'Johen Doe',
    time: '2 day ago',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    rating: 4,
    dish: '/assets/images/dish-2.png'

  },
  {
    avatr: '/assets/icons/1.jpg',
    name: 'Johen Doe',
    time: '2 day ago',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    rating: 4,
    dish: '/assets/images/dish-2.png'

  },
]

function handleJQuery() {
  const owl = $('.owl-carousel')
  owl.owlCarousel({
    loop: true,
    margin: 5,
    nav: false,
    items: 1,
    dots: true
  });

  // Custom Nav

  $('.owl-carousel__next').click(() => owl.trigger('next.owl.carousel'))

  $('.owl-carousel__prev').click(() => owl.trigger('prev.owl.carousel'))
}
const CustomerReview = () => {

  const option = {
    loop: true,
    margin: 30,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 1
      }
    }
  }
  const responsive = {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }

  useEffect(() => {
    import('jquery').then(($) => {
      window.jQuery = $;
      import('owl.carousel').then(() => {
        handleJQuery();
      });
    });
  }, []);
  return (
    <div >

      <div className='border-b dark:border-gray-500 flex items-center justify-between pb-3 mb-6'>
        <h3 className='font-semibold dark:text-white/[85%] text-gray-700 text-[20px]'>
          Customer Review
        </h3>
        <div className="owl-carousel__nav flex items-center gap-3">
          <div className="owl-carousel__prev dark:bg-[#0c1a32] bg-white rounded w-8 h-8 flex items-center justify-center cursor-pointer shadow-sm hover:bg-orange hover:text-white transition duration-200 text-orange"><FaArrowLeft /></div>
          <div className="owl-carousel__next dark:bg-[#0c1a32] bg-white rounded w-8 h-8 flex items-center justify-center cursor-pointer shadow-sm hover:bg-orange hover:text-white transition duration-200 text-orange"><FaArrowRight /></div>
        </div>
      </div>
      <div >

        <OwlCarousel className='owl-theme' loop margin={30} responsive={responsive} option={option}>
          {
            reviews.map((item, index) => {
              return (
                <div key={index} className='item '>
                  <div className='relative'>
                    <div className='bg-white dark:bg-[#0c1a32] rounded p-4 shadow-lg w-[83%]'>
                      <div className='flex gap-4 mb-2 items-center'>
                        <div>
                          <Image alt={item.avatr} width={50} height={50} className="w-[50px] h-[50px] rounded-full" src={item.avatr} />
                        </div>
                        <div>
                          <h4>{item.name}</h4>
                          <span className='text-xs dark:text-gray-400 text-gray-500'>{item.time}</span>
                        </div>
                      </div>
                      <p className='text-gray-700 dark:text-gray-400 pr-[70px] sm:pr-[50px] text-ellips-4line'>{item.detail}</p>
                      <div className="mt-4 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <HiStar
                            key={rating}
                            className={classNames(
                              item.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                        <span className='text-gray-700 text-[14px] ml-2'>({item.rating})</span>
                      </div>
                    </div>
                    <div>
                      <Image alt={item.dish} src={item.dish} height={140} width={140} className="absolute w-[140px_!important] h-[140px] right-[-1px] top-[50%] -translate-y-[50%]" />
                    </div>
                  </div>
                </div>
              )
            })
          }


        </OwlCarousel>

      </div>
    </div>
  )
}

export default CustomerReview
