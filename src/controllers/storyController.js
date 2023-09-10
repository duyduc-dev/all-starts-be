import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

import storyModel from '@/models/storyModel';

cloudinary.config({
  cloud_name: 'djwvklgcn',
  api_key: '783165928642335',
  api_secret: 'Ft3m4JyMzh_4txzUrdwDvvVEi9s',
});

class StoryController {
  async index(req, res) {
    res.json({
      message: 'Test api [GET] /api/v1/story',
    });
  }

  async story(req, res) {
    try {
      // step 1: add file from client to server
      const file = req.file;

      const { id } = req.user;

      // step 2: upload file to cloudinary => url
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
        folder: 'Web_70_Social_App',
      });

      const storyUrl = result && result.secure_url;

      //create new story
      const newStory = new storyModel({
        user: id,
        url: storyUrl,
      });

      await newStory.save();
      //step 3: remove temp image
      fs.unlinkSync(file.path);

      return res.json({
        message: 'Upload story successfully',
        data: newStory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async getAllStory(req, res) {
    const story = await storyModel.find().populate('user');

    res.json({
      data: story,
    });
  }
}

const storyController = new StoryController();

export default storyController;
