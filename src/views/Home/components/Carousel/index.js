import Card, { CardContent, CardHeader } from 'material-ui/Card';
import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import cms from '../../../../services/cms';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css';
import GordonLoader from '../../../../components/Loader';
import './carousel.scss';

export default class GordonCarousel extends Component {
  constructor(props) {
    super(props);

    this.loadCarousel = this.loadCarousel.bind(this);

    this.state = {
      error: null,
      loading: true,
      carouselContent: {},
    };
  }
  componentWillMount() {
    this.loadCarousel();
  }
  async loadCarousel() {
    this.setState({ loading: true });
    try {
      const carouselContent = await cms.getSlides();
      this.setState({ loading: false, carouselContent });
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    let subheader;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop
          transitionTime={1000}
          interval={10000}
        >
          {this.state.carouselContent.map(slide => (
            <div>
              <img src={slide.ImagePath} alt={slide.AltTag} />
            </div>
          ))}
        </Carousel>
      );
    }
    return (
      <Card>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }
}
