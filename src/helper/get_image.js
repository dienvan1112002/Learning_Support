function getImageFromBaseURL(imageURL) {
    if (imageURL?.includes('http')) {
        return imageURL;
    }
    const imageBaseURL = 'http://localhost:3001/';
    return `${imageBaseURL}${imageURL}`;
}

export default getImageFromBaseURL;