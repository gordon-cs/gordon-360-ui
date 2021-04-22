import React, { Component } from 'react';

import cms from 'services/cms';
import ImageGallery from 'react-image-gallery';
import GordonLoader from 'components/Loader';

export default class GordonCarousel extends Component {
  constructor(props) {
    super(props);

    this.loadCarousel = this.loadCarousel.bind(this);

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
      this.state.carouselContent.map((slide) => this.linkArray.push(slide.ActionLink));
    } catch (error) {
      this.setState({ error });
    }
  }

  handleClickSlide() {
    if (this.state.carouselContent[this._imageGallery.getCurrentIndex()].ActionLink !== '') {
      window.location = this.state.carouselContent[this._imageGallery.getCurrentIndex()].ActionLink;
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const images = [];
      this.state.carouselContent.map((slide) =>
        images.push({
          original: slide.ImagePath,
          originalAlt: slide.AltTag,
          originalTitle: slide.Title,
        }),
      );

      content = (
        <ImageGallery
          ref={(i) => (this._imageGallery = i)}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          autoPlay={true}
          showNav={false}
          slideInterval={5000}
          items={images}
          onClick={this.handleClickSlide.bind(this)}
        />
      );
    }
    return <div>{content}</div>;
  }
}
