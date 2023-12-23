function getImageFromBaseURL(imageURL) {
    const imageBaseURL = 'http://localhost:3001/';  // May be add in .env file
    return `${imageBaseURL}${imageURL}`;
}

export default getImageFromBaseURL;