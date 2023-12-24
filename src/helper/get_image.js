function getImageFromBaseURL(imageURL) {
    const imageBaseURL = 'https://web-api-ekmv.onrender.com/';  // May be add in .env file
    return `${imageBaseURL}${imageURL}`;
}

export default getImageFromBaseURL;