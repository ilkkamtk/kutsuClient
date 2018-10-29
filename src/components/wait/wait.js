import React, {Component} from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const items = [
  {
    src: 'http://placekitten.com/800/400',
    altText: 'Kissa 1',
    caption: 'There is no try.',
    captionSmall: 'Do. Or do not.',
  },
  {
    src: 'http://placekitten.com/800/401',
    altText: 'Kissa 2',
    caption: 'your lack of faith disturbing.',
    captionSmall: 'I find ',
  },
  {
    src: 'http://placekitten.com/800/402',
    altText: 'Kissa 3',
    caption: 'bad feeling about this.',
    captionSmall: 'I`ve got a',
  },
];

class Wait extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ?
        0 :
        this.state.activeIndex + 1;
    this.setState({activeIndex: nextIndex});
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ?
        items.length - 1 :
        this.state.activeIndex - 1;
    this.setState({activeIndex: nextIndex});
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({activeIndex: newIndex});
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
          <CarouselItem
              onExiting={this.onExiting}
              onExited={this.onExited}
              key={item.src}
          >
            <img src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.captionSmall} />
          </CarouselItem>
      );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex}
                              onClickHandler={this.goToIndex}/>
          {slides}
          <CarouselControl direction="prev" directionText="Previous"
                           onClickHandler={this.previous}/>
          <CarouselControl direction="next" directionText="Next"
                           onClickHandler={this.next}/>
        </Carousel>
    );
  }
}

export default Wait;
