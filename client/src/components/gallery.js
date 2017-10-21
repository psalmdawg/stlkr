import React, {Component} from 'react';
import axios from 'axios';

class Gallery extends Component{
  constructor(){
    super();
    this.state={
      images:null
    }

    this.getImages = this.getImages.bind(this)
    this.displayImages = this.displayImages.bind(this)
  }

  showState = (event) => {
    console.log(this.state)
  }

  getImages(){
    const _this = this

    axios.get('/memories')
    .then(function (response) {
      _this.setState({ images:response.data })
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  componentDidMount(){
    this.getImages()
  }


  displayImages(){

    if(this.state.images){
      return(
        this.state.images.map((image, i )=>{
          return(
            <div style={styles.galleryImage_ctr} key={i}>
               <img style={styles.galleryImage} src={image.image_url} alt={image.title} />
               <div style={styles.galleryImageText_wrp}>
                 <div style={styles.galleryImage_title}>{image.title}</div>
                  <div style={styles.galleryImage_desc}>{image.description}</div>
                  <div style={styles.galleryImage_location}>{image.lat} : {image.lng}</div>
               </div>
            </div>
          )
        })
      )
    }

  }



  render(){
    return(
      <div>
        <h3>Gallery</h3>
        <button onClick={this.showState}>state</button>
        <br/><br/>
        {this.displayImages()}

      </div>
    )
  }
}

const styles={
  galleryImage:{
    width: '200px',
    // margin: '5px',
    float: 'left'
  },
  galleryImage_ctr:{
    width: '90%',
    padding: '10px',
    border: "1px solid #DCDCDC",

    margin: "0 auto",
    marginBottom:'10px',
    overflow:'auto'
  },
  galleryImageText_wrp:{
    marginLeft:"5px",
    float: 'left',

  },
  galleryImage_title:{
    fontSize: '13px'
  },
  galleryImage_desc:{
    marginTop: '5px',
    color:'grey',
    fontSize:'12px'
  },
  galleryImage_location:{
    marginTop: '5px',
    color:'grey',
    fontSize:'12px'
  }
}


export default Gallery;