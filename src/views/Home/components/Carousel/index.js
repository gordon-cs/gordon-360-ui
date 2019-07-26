import React, { Component } from 'react';
import Img from 'react-graceful-image'

import cms from '../../../../services/cms';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css';
import GordonLoader from '../../../../components/Loader';
import './carousel.css'

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
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
          <div >
            <Img className="imageDisplay" src={this.state.carouselContent[0].ImagePath} alt={this.state.carouselContent[0].AltTag}></Img>
          </div>
      );
    }
    return <section>{content}</section>;
  }
}
