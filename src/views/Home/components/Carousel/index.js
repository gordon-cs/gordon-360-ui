import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import cms from '../../../../services/cms';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css';
import GordonLoader from '../../../../components/Loader';
import './carousel.css';

export default class GordonCarousel extends Component {
  constructor(props) {
    super(props);

    this.loadCarousel = this.loadCarousel.bind(this);
    this.handleClickSlide = this.handleClickSlide.bind(this);

    this.state = {
      error: null,
      loading: true,
      carouselContent: {},
    };

    this.linkArray = [];
  }
  componentWillMount() {
    this.loadCarousel();
  }
  async loadCarousel() {
    this.setState({ loading: true });
    try {
      const carouselContent = await cms.getSlides();
      this.setState({ loading: false, carouselContent });
      this.state.carouselContent.map(slide => this.linkArray.push(slide.ActionLink));
    } catch (error) {
      this.setState({ error });
    }
  }

  handleClickSlide(index) {
    window.location = this.linkArray[index];
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop
          transitionTime={1000}
          interval={5000}
          showStatus={false}
          useKeyboardArrows={true}
          onClickItem={this.handleClickSlide}
          className="carouselClickable"
        >
          {this.state.carouselContent.map(slide => (
            <div>
              <img src={slide.ImagePath} alt={slide.AltTag} />
            </div>
          ))}
        </Carousel>
      );
    }
    return <div>{content}</div>;
  }
}
