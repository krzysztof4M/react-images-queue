class Manager {
  constructor(parralelRequests){
    this.processedImages = []
    this.queue = []
    this.processingImages = []
    this.parralelRequests = parralelRequests
  }
  
  getRequestBySrc(src, array){
    return array.filter(x => x.src === src)
  }
  
  addImageToLoad(src, callback){
    const request = {src, callback} 
    this.queue.push(request)
  }
  
  start(){
    while(this.processingImages.length < this.parralelRequests && this.queue.length > 0){
      let processedRequest = this.queue.shift()
      this.loadImage(processedRequest)
      this.processingImages.push(processedRequest)                    
    }
  }
  
  loadImage(request){
    request.img = new Image()

    request.img.onload = () => {
      request.callback(undefined, request.img)
      this.processedImages.push({...request, status: 'success', time: Date.now()})
      this.cancelLoadingImage(request.src)
      this.start()
      }

    request.img.onerror = (error)=> {
      request.callback(error, request.img)
      this.processedImages.push({...request, status: 'error', time: Date.now()})
      this.cancelLoadingImage(request.src)
      this.start()
    }

    request.img.src = request.src
  }
  
  stop(){
    [...this.processingImages, ...this.queue].map(request => request.onloaded = () => {})
  }
  
  cancelLoadingImage(src){

    if(getRequestBySrc(src, this.processingImages).length > 0){

      getRequestBySrc(src, this.processingImages).img.onload = () => {}
      getRequestBySrc(src, this.processingImages).img.onerror = () => {}
      getRequestBySrc(src, this.processingImages).img.src = "about:"
      getRequestBySrc(src, this.processingImages).img = null
      this.processingImages.filter(x => x.src !== src)

    }

    if(getRequestBySrc(src, this.queue).length > 0){
        this.queue.filter(x => x.src !== src)
    }
  }
  
  reorder(images){
    const srcs = (pattern instanceof Array) ? images : [images]
    const newArray = this.queue.filter(x => srcs.indexOf(x.src) > -1)
    this.queue = [...new Set([...newArray, ...this.queue])]
  }
}


