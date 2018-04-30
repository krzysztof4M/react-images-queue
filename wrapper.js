import React from 'react'

export const imagesQueue = (images, options) => BaseComponent => {
  
  const Queue = props => {
    const imagesToPreload = typeof images === "function" ? images(props) : images

    class ImageManager extends React.Component {
      state = {
        loadedImages: []
      }

      queue = new Manager(5)

      componentDidMount(){
        imagesToPreload.map(image => this.queue.addImageToLoad(image, ()=>this.setState({loadedImages: [...this.state.loadedImages, image]})))
        this.queue.start()
      }

      componentWillUnmount(){
        this.queue.stop()
      }

      render(){
          return (
            <BaseComponent
              {...props}
              loadedSlides={this.state.loadedImages}
              prioritize={this.queue.reorder.bind(this.queue)}
            />
          )
      }
    }
    
    return <ImageManager />
  }

  return Queue
}