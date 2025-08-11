import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

// API to Change Role
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: 'owner' });
        res.json({ succcess: true, message: "Now you can list car" })
    } catch (error) {
        console.error('Error changing in role:', error.message);
        return res.json({ success: false, message: error.message });
    }
}

// API to List Car
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // Upload Image to Imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars',
        })

        // optimization through imagekit URL trannsformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' }, // width resizing
                { quality: 'auto' }, //auto compression
                { format: 'webp' }  // conver to modern format
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({ ...car, owner: _id, image })

        res.json({ succcess: true, message: 'Car Added' })

    } catch (error) {
        console.error('Error adding in role:', error.message);
        return res.json({ success: false, message: error.message });
    }
}