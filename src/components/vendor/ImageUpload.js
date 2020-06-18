import React from 'react';
import { storage } from '../../firebase/firebase';
import placeholder from '../../images/placeholder.jpg'

class ImageUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            percentage: 0,
        }
    }

    onImageChange = (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref('images/' + file.name);
   
        const metadata = {
        contentType: 'image/jpeg',
        };
        const task = storageRef.put(file, metadata);
        
        task.on('state_changed', (snapshot) =>{
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            this.setState(() => ({percentage}));
            
        },
        (error) => {
            console.log(error);
        },
        () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.props.setUrl(url);
            });
        });
    }
    render(){
        const { url } = this.props;
        return(
            <div className="imageUploader">
                <div className="upload-btn-wrapper">
                    <button className="btn">Upload a Image</button>
                    <input
                        name="file" 
                        type="file"
                        accept="image/*"
                        onChange={this.onImageChange}
                    />
                    <progress className="imageUploader__progressbar" value={this.state.percentage} max="100"></progress>
                </div>
                <div className="img__container">
                    <img src={url? url: placeholder} alt="food"/>
                </div>
            </div>
        )
    }
}

export default ImageUpload;
