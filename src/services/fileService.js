const uploadSingleFile = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadPath = __dirname + fileObject.name;

    try {
        await fileObject.mv(uploadPath);
        return {
            starus: "success",
            path: 'link-image',
            error: null

        }
    } catch (error) {
        console.log("Check err: ", error);
        return {
            starus: "failed",
            path: 'link-image',
            error: JSON.stringify(err)
        }
    }
};
const uploadMultipleFiles = () => {

};

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
};