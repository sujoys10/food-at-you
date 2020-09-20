import React from 'react';
import { Image, Placeholder } from 'cloudinary-react';
import { CLOUD_NAME } from '../config/config';

export const ImageSm = ({url}) => {
    return (
        <Image
            publicId={url}
            cloud_name={CLOUD_NAME}
            width="350"
            crop="fit"
            secure="true"
        >
        </Image>
    )
}

export const ImageMd = ({url}) => {
    return (
        <Image
            publicId={url}
            cloud_name={CLOUD_NAME}
            width="500"
            height="500"
            crop="fit"
            secure="true"
        >
        </Image>
    )
}

export const ImageLg = ({url}) => {
    return (
        <Image
            publicId={url}
            cloud_name={CLOUD_NAME}
            width="800"
            height="800"
            crop="fit"
            secure="true"
        >
           <Placeholder /> 
        </Image>
    )
}

