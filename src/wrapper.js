import React from 'react'

//TO do
// 1. sorting function
// 2. options

export const imagesQueue = (images, options) => BaseComponent => {
  
  const Queue = props => {
    const imagesToPreload = typeof images === "function" ? images(props) : images

    class ImageManager extends React.Component {
      state = {
        processedImages: []
      }

      queue = new Manager(5)

      componentDidMount(){
        imagesToPreload.map(image => this.queue.addImageToLoad(image, (request)=>this.setState({processedImages: [...this.state.processedImages, request]})))
        this.queue.start()
      }

      componentWillUnmount(){
        this.queue.stop()
      }

      render(){
          return (
            <BaseComponent
              {...props}
              processedImages={this.state.processedImages}
              prioritize={this.queue.reorder.bind(this.queue)}
            />
          )
      }
    }
    
    return <ImageManager />
  }

  return Queue
}