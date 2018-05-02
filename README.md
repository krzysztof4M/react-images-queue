# React Images Queue

This dead simple React HOC allows you to preload images with queueing, specifying number of concurrent images being loaded and reordering images queue

## Example

```javascript
import React from "react";
import { imagesQueue } from "react-images-queue";

class Photo extends React.Component {

  state = {
    activePhoto: 0
  }

  handleClick = () => {
    this.setState({activePhoto: this.props.photos.length - 1 })
    //reorder method is provided by React Images Queue
    //in this example it sets last photo on first position in loading queue
    this.props.reorder(this.props.photos[this.props.photos.length - 1].url)
  }

  render () {
    const photo = this.props.photos[this.state.activePhoto]
    //processedImages is provided by React Images Queue
    return (
      <div>
        <ActivePhoto
          photo={photo}
          isLoaded={this.props.processedImages.map(image=>image.src).indexOf(photo.url) > -1}
        />
        <button onClick={this.handleClick}>Last photo</button>
      </div>
    );
  }
};

export default imagesQueue(props => props.photos.map(photo => photo.url), {size: 2})(Photo)
``` 
