const path = require('path');
const fs = require('fs');
const uploadSingleFile = async (fileObject) => {

    // Lấy đường dẫn tới thư mục cha của "service"
    let parentDir = path.join(__dirname, '..');
    // Tạo đường dẫn tới thư mục "public/image,upload"
    let uploadDir = path.join(parentDir, 'public', 'images', 'upload');

    /*const getCurrentTimestamp = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng từ 0-11 nên cần +1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${day}${month}${year}-${hours}${minutes}${seconds}`;
    };*/

    // Kiểm tra và tạo thư mục nếu nó không tồn tại
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    let originalName = path.parse(fileObject.name).name;
    let ext = path.extname(fileObject.name);
    //let timestamp = getCurrentTimestamp();
    let timestamp = Date.now();
    let newFileName = `${originalName}-${timestamp}${ext}`;

    let uploadPath = path.join(uploadDir, newFileName);

    try {
        await fileObject.mv(uploadPath);
        return {
            starus: "success",
            path: newFileName,
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
const uploadMultipleFiles = async (fileArr) => {
    try {
        let countSuccess = 0;
        let resultArr = [];
        console.log("Check fileArr: ", fileArr);
        let uploadDir = path.resolve(__dirname, "../public/images/upload");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        for (let i = 0; i < fileArr.length; i++) {
            let originalName = path.parse(fileArr[i].name).name;
            let ext = path.extname(fileArr[i].name);
            let timestamp = Date.now();
            let newFileName = `${originalName}-${timestamp}${ext}`;
            let uploadPath = path.join(uploadDir, newFileName);
            try {
                await fileArr[i].mv(uploadPath);
                countSuccess++;
                resultArr.push({
                    starus: "success",
                    path: newFileName,
                    error: null,
                });
            } catch (error) {
                console.log("Check err: ", error);
                resultArr.push({
                    starus: "failed",
                    path: 'link-image',
                    error: JSON.stringify(err)
                });
            }
        }
        return {
            countSuccess: countSuccess,
            data: resultArr
        }
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
};
