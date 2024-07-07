import React from "react";
import './ImageCarousel.css'
import { Carousel } from "react-bootstrap";

export const ImageCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item className="w-100 h">
                <img
                    src='https://i1.wp.com/prexplore.ru/wp-content/uploads/2017/12/ed7f71f677010f77821d2230562d21fb-big.jpg?resize=660%2C371&ssl=1'
                    alt='First slide'
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src='https://obr.so/wp-content/uploads/2021/02/shutterstock_26845.jpg'
                    alt='First slide'
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src='https://60mais.educamidia.org.br/wp-content/uploads/2022/06/istockphoto-610450660-612x612-1.jpg'
                    alt='First slide'
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
