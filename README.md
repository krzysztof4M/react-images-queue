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

## Installation

```bash
npm install react-images-queue --save
```

## Usage
### `imagesQueue(images, config)`
Higher Order Component that wraps other component, gets images and config object as arguments and return wrapped component with injected processed images and reorder method as props.

#### Arguments
* `images` \(*String* or *Array* or *Function*): Provides images to load

##### String
```javascript
export default imagesQueue('http://images.example/1', {size: 2})(Photo)
``` 

##### Array
```javascript
export default imagesQueue(['http://images.example/1', 'http://images.example/2', 'http://images.example/3'], {size: 2})(Photo)
``` 

##### Function
```javascript
export default imagesQueue(props => props.photos.map(photo => photo.url), {size: 2})(Photo)
``` 

* `config` \(*Object*): Currently allows you to define `size` property which specifies a number of images loading concurrently

 #### Returns
 `imagesQueue` returns wrapped component with extra props:
 * `processedImages` \(*Array*): It is an array of objects representing images that loading has been finished with success or error. Each object has following properties:
    ##### src \(*String*) - src of loaded image
    ##### status \(*String*) - loading image status `'error'` or `'success'`
    ##### time \(*Number*) - UNIX timestamp of finished loading

 * `reorder( reorderedImages )` \(*Function*): It is a method that change order of images waiting to be loaded (images queue). You can pass `string`, `array` or `function` as argument. If `string` or `array` is passed proper images (or images) are placed on the top of a queue. If `function` is passed it takes current queue as parameter and should return new queue. Queue is an array of objects with properties: `src` and `callback`.

 ## License
 MIT
